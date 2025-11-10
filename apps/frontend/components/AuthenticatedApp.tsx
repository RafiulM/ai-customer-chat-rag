/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { AppStatus, ChatMessage } from '../types';
import * as geminiService from '../services/geminiService';
import { useApiService } from '../services/apiService';
import Spinner from './Spinner';
import WelcomeScreen from './WelcomeScreen';
import ProgressBar from './ProgressBar';
import ChatInterface from './ChatInterface';

const AuthenticatedApp: React.FC = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const apiService = useApiService();
    const [status, setStatus] = useState<AppStatus>(AppStatus.Initializing);
    const [apiKeyError, setApiKeyError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<{ current: number, total: number, message?: string, fileName?: string } | null>(null);
    const [activeRagStoreName, setActiveRagStoreName] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isQueryLoading, setIsQueryLoading] = useState(false);
    const [exampleQuestions, setExampleQuestions] = useState<string[]>([]);
    const [documentName, setDocumentName] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);
    const ragStoreNameRef = useRef(activeRagStoreName);

    useEffect(() => {
        ragStoreNameRef.current = activeRagStoreName;
    }, [activeRagStoreName]);

    useEffect(() => {
        // Initialize Gemini service with API key from .env.local
        const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            setApiKeyError("GEMINI_API_KEY is not set in .env.local. Please add your Gemini API key to .env.local file.");
            setStatus(AppStatus.Welcome);
            return;
        }

        try {
            geminiService.initialize();
            setStatus(AppStatus.Welcome);
        } catch (err) {
            setApiKeyError("Failed to initialize Gemini service. Please check your GEMINI_API_KEY in .env.local.");
            setStatus(AppStatus.Welcome);
        }
    }, []);

    useEffect(() => {
        const handleUnload = () => {
            if (ragStoreNameRef.current) {
                geminiService.deleteRagStore(ragStoreNameRef.current)
                    .catch(err => console.error("Error deleting RAG store on unload:", err));
            }
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    const handleError = (message: string, err: any) => {
        console.error(message, err);
        setError(`${message}${err ? `: ${err instanceof Error ? err.message : String(err)}` : ''}`);
        setStatus(AppStatus.Error);
    };

    const clearError = () => {
        setError(null);
        setStatus(AppStatus.Welcome);
    }

    const handleUploadAndStartChat = async () => {
        const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            setApiKeyError("GEMINI_API_KEY is not set in .env.local. Please add your Gemini API key to .env.local file.");
            throw new Error("API Key is required.");
        }
        if (files.length === 0) return;

        setApiKeyError(null);

        try {
            geminiService.initialize();
        } catch (err) {
            handleError("Initialization failed. Please check your GEMINI_API_KEY in .env.local.", err);
            throw err;
        }

        setStatus(AppStatus.Uploading);
        const totalSteps = files.length + 2;
        setUploadProgress({ current: 0, total: totalSteps, message: "Creating document index..." });

        try {
            const storeName = `chat-session-${Date.now()}`;
            const ragStoreName = await geminiService.createRagStore(storeName);

            setUploadProgress({ current: 1, total: totalSteps, message: "Generating embeddings..." });

            for (let i = 0; i < files.length; i++) {
                setUploadProgress(prev => ({
                    ...(prev!),
                    current: i + 1,
                    message: "Generating embeddings...",
                    fileName: `(${i + 1}/${files.length}) ${files[i].name}`
                }));
                await geminiService.uploadToRagStore(ragStoreName, files[i]);
            }

            setUploadProgress({ current: files.length + 1, total: totalSteps, message: "Generating suggestions...", fileName: "" });
            const questions = await geminiService.generateExampleQuestions(ragStoreName);
            setExampleQuestions(questions);

            // Save RAG store metadata to database
            let docName = '';
            if (files.length === 1) {
                docName = files[0].name;
            } else if (files.length === 2) {
                docName = `${files[0].name} & ${files[1].name}`;
            } else {
                docName = `${files.length} documents`;
            }

            try {
                await apiService.createRagStore({
                    name: ragStoreName,
                    displayName: docName,
                    metadata: {
                        fileNames: files.map(f => f.name),
                        totalFiles: files.length,
                        exampleQuestions: questions
                    }
                });
            } catch (dbError) {
                console.warn('Failed to save RAG store to database:', dbError);
                // Continue even if database save fails
            }

            setUploadProgress({ current: totalSteps, total: totalSteps, message: "All set!", fileName: "" });

            await new Promise(resolve => setTimeout(resolve, 500)); // Short delay to show "All set!"

            setDocumentName(docName);

            setActiveRagStoreName(ragStoreName);
            setChatHistory([]);
            setStatus(AppStatus.Chatting);
            setFiles([]); // Clear files on success
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
            if (errorMessage.includes('api key not valid') || errorMessage.includes('requested entity was not found')) {
                setApiKeyError("The API key in .env.local is invalid. Please check your GEMINI_API_KEY and try again.");
                setStatus(AppStatus.Welcome);
            } else {
                handleError("Failed to start chat session", err);
            }
            throw err;
        } finally {
            setUploadProgress(null);
        }
    };

    const handleEndChat = () => {
        if (activeRagStoreName) {
            geminiService.deleteRagStore(activeRagStoreName).catch(err => {
                console.error("Failed to delete RAG store in background", err);
            });
        }
        setActiveRagStoreName(null);
        setChatHistory([]);
        setExampleQuestions([]);
        setDocumentName('');
        setFiles([]);
        setStatus(AppStatus.Welcome);
    };

    const handleSendMessage = async (message: string) => {
        if (!activeRagStoreName) return;

        const userMessage: ChatMessage = { role: 'user', parts: [{ text: message }] };
        setChatHistory(prev => [...prev, userMessage]);
        setIsQueryLoading(true);

        try {
            const result = await geminiService.fileSearch(activeRagStoreName, message);
            const modelMessage: ChatMessage = {
                role: 'model',
                parts: [{ text: result.text }],
                groundingChunks: result.groundingChunks
            };
            setChatHistory(prev => [...prev, modelMessage]);

            // Save chat message to database
            try {
                await apiService.saveChat({
                    message: message,
                    response: result.text,
                    ragStoreName: activeRagStoreName,
                    metadata: {
                        groundingChunks: result.groundingChunks,
                        timestamp: new Date().toISOString()
                    }
                });
            } catch (dbError) {
                console.warn('Failed to save chat to database:', dbError);
                // Continue even if database save fails
            }
        } catch (err) {
            const errorMessage: ChatMessage = {
                role: 'model',
                parts: [{ text: "Sorry, I encountered an error. Please try again." }]
            };
            setChatHistory(prev => [...prev, errorMessage]);
            handleError("Failed to get response", err);
        } finally {
            setIsQueryLoading(false);
        }
    };

    const renderContent = () => {
        switch(status) {
            case AppStatus.Initializing:
                return (
                    <div className="flex items-center justify-center h-screen">
                        <Spinner /> <span className="ml-4 text-xl">Initializing...</span>
                    </div>
                );
            case AppStatus.Welcome:
                 return <WelcomeScreen onUpload={handleUploadAndStartChat} apiKeyError={apiKeyError} files={files} setFiles={setFiles} />;
            case AppStatus.Uploading:
                let icon = null;
                if (uploadProgress?.message === "Creating document index...") {
                    icon = <img src="https://services.google.com/fh/files/misc/applet-upload.png" alt="Uploading files icon" className="h-80 w-80 rounded-lg object-cover" />;
                } else if (uploadProgress?.message === "Generating embeddings...") {
                    icon = <img src="https://services.google.com/fh/files/misc/applet-creating-embeddings_2.png" alt="Creating embeddings icon" className="h-240 w-240 rounded-lg object-cover" />;
                } else if (uploadProgress?.message === "Generating suggestions...") {
                    icon = <img src="https://services.google.com/fh/files/misc/applet-suggestions_2.png" alt="Generating suggestions icon" className="h-240 w-240 rounded-lg object-cover" />;
                } else if (uploadProgress?.message === "All set!") {
                    icon = <img src="https://services.google.com/fh/files/misc/applet-completion_2.png" alt="Completion icon" className="h-240 w-240 rounded-lg object-cover" />;
                }

                return <ProgressBar
                    progress={uploadProgress?.current || 0}
                    total={uploadProgress?.total || 1}
                    message={uploadProgress?.message || "Preparing your chat..."}
                    fileName={uploadProgress?.fileName}
                    icon={icon}
                />;
            case AppStatus.Chatting:
                return <ChatInterface
                    documentName={documentName}
                    history={chatHistory}
                    isQueryLoading={isQueryLoading}
                    onSendMessage={handleSendMessage}
                    onNewChat={handleEndChat}
                    exampleQuestions={exampleQuestions}
                />;
            case AppStatus.Error:
                 return (
                    <div className="flex flex-col items-center justify-center h-screen bg-red-900/20 text-red-300">
                        <h1 className="text-3xl font-bold mb-4">Application Error</h1>
                        <p className="max-w-md text-center mb-4">{error}</p>
                        <button onClick={clearError} className="px-4 py-2 rounded-md bg-gem-mist hover:bg-gem-mist/70 transition-colors" title="Return to the welcome screen">
                           Try Again
                        </button>
                    </div>
                );
            default:
                 return <WelcomeScreen onUpload={handleUploadAndStartChat} apiKeyError={apiKeyError} files={files} setFiles={setFiles} />;
        }
    }

    // Show loading while Clerk is loading
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen bg-gem-onyx text-gem-offwhite">
                <Spinner /> <span className="ml-4 text-xl">Loading...</span>
            </div>
        );
    }

    // Show sign in if not authenticated
    if (!isSignedIn) {
        return (
            <div className="flex items-center justify-center h-screen bg-gem-onyx text-gem-offwhite">
                <div className="w-full max-w-md p-6 bg-gem-slate rounded-lg shadow-xl">
                    <h1 className="text-2xl font-bold text-center mb-6">Sign In Required</h1>
                    <p className="text-center mb-6 text-gem-offwhite/80">
                        Please sign in to access the AI Customer Chat RAG application.
                    </p>
                    <SignIn
                        redirectUrl="/"
                        appearance={{
                            elements: {
                                rootBox: "mx-auto",
                                card: "bg-gem-slate border-gem-mist"
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

    return (
        <main className="h-screen bg-gem-onyx text-gem-offwhite">
            <header className="absolute top-0 left-0 right-0 p-4 bg-gem-onyx/80 backdrop-blur-sm z-10 flex justify-between items-center">
                <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
                    <h1 className="text-xl font-semibold">AI Customer Chat RAG</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gem-offwhite/70">
                            Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                        </span>
                    </div>
                </div>
            </header>
            <div className="pt-16">
                {renderContent()}
            </div>
        </main>
    );
};

export default AuthenticatedApp;
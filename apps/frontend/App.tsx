/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import AuthenticatedApp from './components/AuthenticatedApp';

const App: React.FC = () => {
    return (
        <>
            <SignedIn>
                <AuthenticatedApp />
            </SignedIn>
            <SignedOut>
                <div className="flex items-center justify-center h-screen bg-gem-onyx text-gem-offwhite">
                    <div className="w-full max-w-md p-6 bg-gem-slate rounded-lg shadow-xl">
                        <h1 className="text-2xl font-bold text-center mb-6">Welcome to AI Customer Chat RAG</h1>
                        <p className="text-center mb-6 text-gem-offwhite/80">
                            Please sign in to access the application.
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
            </SignedOut>
        </>
    );
};

export default App;

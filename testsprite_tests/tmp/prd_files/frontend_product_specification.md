# Frontend Product Specification

## Overview
React-based single-page application for document-based RAG chat using Google Gemini File Search API, with chat history persistence and session management.

## Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Authentication**: Clerk React SDK
- **AI Integration**: Google Gemini API (@google/genai)
- **Styling**: Tailwind CSS (custom Gemini-themed colors)
- **State Management**: React hooks (useState, useEffect)

## Core Features

### 1. Authentication & User Management
- Clerk integration for sign-in/sign-out
- User profile button in header
- Optional email-based access control (`VITE_ALLOWED_EMAIL`)
- Graceful handling of unauthenticated users (uses backend admin fallback)

### 2. Application States
- **Initializing**: Loading Clerk and checking API key
- **Welcome**: Main entry screen with upload/resume options
- **Uploading**: File processing with progress indicators
- **Chatting**: Active chat interface
- **Error**: Error display with retry option

### 3. Document Upload & RAG Store Creation
- **File Upload**:
  - Drag-and-drop interface
  - File browser selection
  - Supports PDF, TXT, MD files
  - Multiple file selection
  - File preview with size display
  - Remove individual files
  
- **RAG Store Creation**:
  - Creates Gemini File Search store
  - Uploads files with progress tracking
  - Generates embeddings automatically
  - Creates example questions from document content
  - Saves metadata to backend (file names, questions, document count)
  - Auto-generates display name from file names

### 4. Chat Interface
- **Message Display**:
  - User messages (right-aligned, blue background)
  - Model responses (left-aligned, slate background)
  - Markdown rendering (bold, italic, code, lists)
  - Source citations with clickable grounding chunks
  - Source modal for viewing retrieved document text
  
- **Message Input**:
  - Text input with send button
  - Rotating example question suggestions (5-second intervals)
  - Click-to-use suggestion feature
  - Loading state during query processing
  
- **Chat Features**:
  - Auto-scroll to latest message
  - Loading spinner during AI response
  - Error handling with user-friendly messages
  - Chat history persistence to backend

### 5. Session Management
- **Previous Sessions**:
  - Lists all user's RAG stores from backend
  - Shows display name, chat count, last updated date
  - Resume session functionality
  - Loading states during resume
  
- **Default Store**:
  - Auto-connects non-allowed users to default RAG store
  - Configurable via `VITE_DEFAULT_RAG_STORE_NAME`
  - Loads chat history automatically
  
- **Session Lifecycle**:
  - Creates temporary RAG stores in Gemini
  - Cleans up stores on page unload
  - "New Chat" button to end current session

### 6. Welcome Screen
- **Upload Section**:
  - Drag-and-drop zone
  - File browser button
  - Selected files list with remove option
  - "Upload and Chat" button
  
- **Previous Sessions Section**:
  - List of saved RAG stores
  - Resume buttons with loading states
  - Chat count and date display
  
- **Sample Documents**:
  - Pre-configured example documents (Hyundai i10 Manual, LG Washer Manual)
  - One-click download and upload
  - Loading states during fetch

### 7. API Integration
- **ApiService Class**:
  - Centralized API client
  - Clerk token injection for authenticated requests
  - Error handling and response parsing
  - Methods for chats and RAG stores CRUD operations
  
- **Endpoints Used**:
  - `POST /api/chats` - Save chat messages
  - `GET /api/chats` - Load chat history
  - `POST /api/ragstores` - Create RAG store metadata
  - `GET /api/ragstores` - List user's RAG stores
  - `GET /api/ragstores/:name` - Get store details
  - `DELETE /api/ragstores/:name` - Delete store

### 8. Gemini Service Integration
- **File Search Operations**:
  - `createRagStore()` - Creates new store
  - `uploadToRagStore()` - Uploads files with polling
  - `fileSearch()` - Queries store with grounding
  - `generateExampleQuestions()` - AI-generated suggestions
  - `deleteRagStore()` - Cleanup on session end
  
- **Model Configuration**:
  - Uses `gemini-2.5-flash` model
  - File Search tool integration
  - Grounding chunks extraction

### 9. UI Components
- **Spinner**: Loading indicator
- **ProgressBar**: Upload progress with icons and messages
- **ChatInterface**: Main chat UI with message display
- **WelcomeScreen**: Entry point with upload/resume options
- **Icons**: Custom SVG icons (Send, Refresh, Upload, Trash, etc.)

### 10. Error Handling
- API key validation on initialization
- Network error handling
- Graceful degradation (continues if backend save fails)
- User-friendly error messages
- Error state with retry option

## Environment Variables
- `GEMINI_API_KEY` or `API_KEY`: Google Gemini API key (required)
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)
- `VITE_ALLOWED_EMAIL`: Optional email restriction
- `VITE_DEFAULT_RAG_STORE_NAME`: Default store for non-allowed users

## User Flow
1. User signs in (optional)
2. Welcome screen shows upload/resume options
3. User uploads files or resumes previous session
4. Files processed, RAG store created, embeddings generated
5. Chat interface loads with example questions
6. User chats with documents, responses include source citations
7. Chat history saved to backend automatically
8. User can start new chat or resume previous sessions

## Styling
- Custom color palette (gem-onyx, gem-slate, gem-blue, gem-teal, gem-mist, gem-offwhite)
- Responsive design (mobile-friendly)
- Dark theme throughout
- Smooth transitions and hover effects


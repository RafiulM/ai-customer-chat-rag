# Project Requirements Document for `ai-customer-chat-rag`

---

## 1. Project Overview

This project delivers an AI-powered customer chat application that lets users upload their own documents—PDFs, text files, or Markdown—and then ask natural-language questions about their content. It builds a Retrieval-Augmented Generation (RAG) store behind the scenes, so the AI can quickly find and quote the right passages. Users get clear, citation-backed answers thanks to Google’s Gemini API.

We’re building this to make large documents instantly searchable through simple chat. Instead of manually skimming PDFs or scattered notes, people can type a question and receive concise, context-rich replies with source references. Success means: users can upload files without friction, see real-time indexing progress, and chat confidently with accurate, traceable AI answers.

---

## 2. In-Scope vs. Out-of-Scope

**In-Scope (v1):**
- Document upload UI (PDF, TXT, Markdown) and server-side processing
- Text extraction and indexing into a RAG store using Google Gemini API
- Chat interface for question input and real-time answers
- AI responses with highlighted source citations
- Automatic example question suggestions based on uploaded content
- Monorepo structure using Turbo and pnpm
- Frontend: React 19 + Vite + TypeScript
- Backend: Express.js 4 + TypeScript
- Configuration via `.env.local` for API keys

**Out-of-Scope (v1):**
- User accounts, authentication, or multi-user management
- Persistent database storage of RAG stores beyond the current session
- Advanced UI theming or a design system (e.g., Material UI)
- Automated testing framework or test suites
- Analytics dashboards or usage tracking
- Exporting or sharing chat transcripts

---

## 3. User Flow

A new user lands on the welcome screen and sees options to upload their own documents or try a sample. They click “Upload,” pick one or more files (PDF, TXT, Markdown), and hit “Submit.” A modal appears, showing a progress bar as the system extracts text and builds a RAG store via the Google Gemini API. If an error happens—like an invalid file type—the user sees a clear message with retry instructions.

Once the store is ready, the app switches to the chat interface. The user types a question in the input box (e.g., “What are the key findings in section 2?”). The frontend calls the Gemini service through an API endpoint, retrieves the AI-generated answer plus text snippets from the original docs, and displays them in a conversational view. Below the chat, example questions appear to help guide the next query.

---

## 4. Core Features

- **Document Upload & Indexing**: Drag-and-drop or file-picker UI; server processes files, extracts text, indexes into RAG store.
- **RAG Store Management**: Create, list, and delete in-memory stores for each upload session.
- **Chat Interface**: Input box for questions, scrollable chat history, answer bubbles with citations.
- **AI-Powered Responses**: Google Gemini API integration for retrieval-augmented generation, returning text snippets with source references.
- **Example Question Generator**: Automatically suggest 3–5 sample queries based on indexed content.
- **Progress & Feedback**: Visual spinner and progress bar during upload/indexing phases; error messages on failure.
- **Service Layer (`geminiService.ts`)**: Encapsulates all Gemini API calls (store creation, file upload, query, sample questions).
- **Monorepo Orchestration**: Turbo for build pipelines, pnpm for consistent package management.

---

## 5. Tech Stack & Tools

- **Frontend:**
  - React 19 (component-based UI)
  - Vite (fast bundler/dev server)
  - TypeScript (static typing)
  - Optional IDE plugins: VSCode with Windsurf (AI code completion)

- **Backend:**
  - Express.js 4 (REST API server)
  - TypeScript
  - Nodemon (hot reload in development)

- **AI / LLM:**
  - Google Gemini API (RAG capabilities for indexing and question answering)

- **Monorepo Management:**
  - Turbo (task runner and caching)
  - pnpm (fast, disk-efficient package manager)

- **Configuration Management:**
  - `.env.local` files for sensitive keys (API keys, endpoints)

---

## 6. Non-Functional Requirements

- **Performance:**
  - Chat response time under 2 seconds for typical queries (assuming moderate RAG store size).
  - Document indexing completes within 10 seconds per 10 MB file.
- **Security & Privacy:**
  - All API keys stored in environment variables, not in source control.
  - CORS configured to allow only the app’s own origin.
- **Usability:**
  - Responsive layout for desktop and tablet screens.
  - Clear progress indicators and error messages.
- **Reliability:**
  - Retry logic for transient network or API failures (up to 2 retries).

---

## 7. Constraints & Assumptions

- **Gemini API Availability:** Assumes continuous access with sufficient rate limits and latency SLAs.
- **File Size Limits:** Max 50 MB per document to avoid excessive memory use.
- **In-Memory Stores:** RAG stores are session-based and cleared on page reload.
- **Browser Compatibility:** Modern evergreen browsers (Chrome, Firefox, Edge, Safari).

---

## 8. Known Issues & Potential Pitfalls

- **API Rate Limits:** Hitting Gemini’s rate cap could delay indexing or chat responses—add backoff or queue logic.
- **Large Documents:** Indexing very large files may cause timeouts—consider chunked processing or client-side splitting.
- **Ephemeral Storage:** Users lose RAG stores on refresh—future work: add persistent storage (e.g., PostgreSQL).
- **Error Granularity:** Currently generic errors—improve to display distinct messages ("Invalid file type," "Gemini API error").
- **Lack of Tests:** No automated tests exist—plan to integrate Jest and React Testing Library in the next phase.

---

*This document serves as the single source of truth for building the AI-powered customer chat application with RAG functionality. All subsequent technical specs should reference these requirements exactly as written.*
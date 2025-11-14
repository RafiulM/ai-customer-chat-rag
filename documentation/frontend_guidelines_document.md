# Frontend Guideline Document

This document outlines how the frontend of **ai-customer-chat-rag** is built, styled, and maintained. It’s written in plain language so that anyone—technical or not—can understand our setup.

## 1. Frontend Architecture

### What We Use
- **React 19**: For building interactive UI components.
- **Vite**: For super-fast development server and bundling.
- **TypeScript**: Strong typing to catch errors early and improve code clarity.
- **Monorepo with Turbo & pnpm**: One repository for both frontend and backend. Turbo manages builds and caching, pnpm handles packages efficiently.

### How It’s Organized
- **apps/frontend/**: Houses the React app. Inside, you’ll find:
  - `App.tsx`: The main component that tracks app state (upload progress, chat history, errors).
  - `components/`: Reusable UI pieces (buttons, modals, chat bubbles, progress bars).
  - `services/geminiService.ts`: All calls to Google Gemini API live here.
  - `hooks/`, `types/`: Custom hooks and TypeScript types for clarity.
- **apps/backend/**: An Express.js server (also TypeScript) with basic health-check routes.

### Why This Works
- **Scalable**: New features fit into the same structure without chaos. Turbo ensures fast builds even as the codebase grows.
- **Maintainable**: Clear separation—UI, services, and types each have their own folders.
- **Performant**: Vite’s bundling and React’s lightweight rendering give quick page loads and smooth interactions.

## 2. Design Principles

1. **Usability**: Every button, form, or message is clear and intuitive. Upload flows use step-by-step feedback (e.g., progress bars). Chat messages look like familiar chat apps.
2. **Accessibility**: We follow WCAG basics—high-contrast text, clear focus indicators, keyboard navigation, and ARIA labels on interactive elements.
3. **Responsiveness**: The UI adapts from phone screens to large monitors. Layouts stack vertically on narrow viewports and spread out on wider ones.
4. **Consistency**: Components reuse the same spacing, colors, and typography. Users learn one pattern and see it everywhere.

## 3. Styling and Theming

### Styling Approach
- **Utility-First with Tailwind CSS**: Fast styling without writing long CSS files.
- **CSS Modules for Complex Components**: When we need scoped styles (e.g., animations), we use CSS Modules alongside Tailwind.

### Theme & Look
- **Style**: Modern flat design—clean edges, subtle shadows, and a focus on content.
- **Color Palette**:
  - Primary: #4F46E5 (indigo)
  - Secondary: #10B981 (emerald)
  - Background: #FFFFFF (white)
  - Surface: #F3F4F6 (light gray)
  - Text Primary: #111827 (dark gray)
  - Text Secondary: #6B7280 (medium gray)
  - Accent: #F59E0B (amber)

- **Typography**:
  - **Font Family**: Inter (sans-serif) for readability and modern feel.
  - **Sizes**: `base` 16px, `sm` 14px, `lg` 18px, `xl` 24px for clear hierarchy.

## 4. Component Structure

- **Folder by Feature**: Each major feature (chat, upload, store list) lives in its own folder under `components/`.
- **File Naming**: PascalCase (`ChatInterface.tsx`, `UploadModal.tsx`). Styles, if module-based, named `ChatInterface.module.css`.
- **Reusable Pieces**: Buttons, inputs, loaders (Spinner, ProgressBar) live in a shared `components/ui/` folder.
- **Why It Matters**: Small, focused components are easy to test, update, and reuse. If you need a chat bubble elsewhere, just import `ChatBubble`.

## 5. State Management

- **Centralized in App.tsx**: For now, main state (current view, upload progress, chat history) lives here via React’s `useState` and `useEffect`.
- **Passing Props Down**: Children components receive only what they need—no global variables flying around.
- **Future-Proofing**: If state grows too complex, we can introduce React Context with `useReducer` or a lightweight library like Zustand.

## 6. Routing and Navigation

- **Current Approach**: The app uses conditional rendering inside `App.tsx` to switch between screens (upload vs. chat).
- **Recommended for Growth**: If we add more pages (settings, history), we’ll install **React Router v6**. Routes would live in `routes/` and map URLs to components.

## 7. Performance Optimization

1. **Lazy Loading**: Use `React.lazy` and `Suspense` for big components (e.g., chart or complex list).
2. **Code Splitting**: Let Vite split bundles so the initial load is small.
3. **Asset Optimization**: Compress images/icons, and use SVGs where possible.
4. **Caching**: Leverage Vite’s built-in caching and browser caching for static assets.

Together, these keep page loads fast and interactions snappy.

## 8. Testing and Quality Assurance

1. **Unit Tests**: Jest + React Testing Library for components and `geminiService`. Test that uploads trigger API calls, chat renders messages, errors display.
2. **Integration Tests**: Simulate full flows (upload → index → chat) using React Testing Library or a headless browser.
3. **End-to-End (E2E)**: Cypress for real-browser testing: user uploads a PDF, asks a question, sees an answer.
4. **Linting & Formatting**:
   - ESLint with TypeScript rules
   - Prettier for consistent code style
   - Husky + lint-staged to run checks before each commit

This ensures bugs get caught early and code stays clean.

## 9. Conclusion and Overall Frontend Summary

Our frontend for **ai-customer-chat-rag** is built to be:
- **Clear**: Organized folders, named components, and a dedicated service layer.
- **Fast**: Vite development, lazy loading, and smart caching.
- **Friendly**: Accessible, responsive, and easy to navigate.
- **Future-Ready**: Monorepo scale, TypeScript safety, and room to introduce routing or advanced state management when needed.

By following these guidelines, any developer can jump in, update UI pieces, add features, or fix bugs without confusion. Our focus on modularity, consistent styling, and solid testing makes this frontend reliable and enjoyable to work with—just like we want our chat experience to be for users.
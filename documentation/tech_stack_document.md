# Tech Stack Document for ai-customer-chat-rag

This document explains, in simple terms, the technology choices behind the **ai-customer-chat-rag** project. It outlines what we use on the frontend, backend, infrastructure, and more—so you can see why each piece was chosen and how it helps the application work smoothly.

## 1. Frontend Technologies

These are the tools and libraries that run in your browser to give you a fast, interactive chat experience.

- **React 19**
  - A popular library for building web interfaces with reusable components.
  - Lets us break the UI into small pieces (like chat windows, buttons, and upload forms) that are easy to maintain.
- **TypeScript**
  - A version of JavaScript with type checking.
  - Helps catch errors early and makes the code easier to understand and refactor.
- **Vite**
  - A modern build tool that starts up and reloads the app almost instantly during development.
  - Bundles the final code so users download fewer files and pages load faster.
- **Component Library** (custom)
  - We built reusable components (buttons, spinners, progress bars) to keep the look consistent.
- **CSS / Styling**
  - Simple, modular styles scoped to each component.
  - Ensures styles don’t accidentally affect other parts of the page.

**How these choices enhance the user experience:**
- Instant feedback while typing or uploading (thanks to Vite’s hot-reloading).
- Smooth, interactive chat interface built from reliable, well-tested components.
- Fewer runtime errors because of TypeScript’s checks.

## 2. Backend Technologies

This is the server side that processes uploads, talks to Google’s AI, and sends back answers.

- **Node.js & Express.js 4**
  - A lightweight web server that handles HTTP requests (uploading files, receiving chat queries).
  - Easy to extend if we need more API routes in the future.
- **TypeScript**
  - Keeps server code clear and catches mistakes before code runs in production.
- **Nodemon** (development only)
  - Automatically restarts the server when we change code locally, speeding up development.
- **geminiService module**
  - A dedicated layer that hides all details of talking to Google Gemini API.
  - Keeps our routes clean—each part only does one thing (uploading, querying, generating examples).
- **Environment Variables (.env.local)**
  - Stores sensitive settings like the Gemini API key outside of code.
  - Ensures secrets aren’t committed to the repository.

**How these parts work together:**
1. Frontend uploads files or sends chat questions to Express.js routes.
2. Express.js calls geminiService to interact with Google’s AI.
3. The AI processes or answers, and Express.js forwards results back to the browser.

## 3. Infrastructure and Deployment

How we host, build, and publish the app so it’s reliable and easy to update.

- **Monorepo with Turbo & pnpm**
  - **Turbo** orchestrates builds and tests across frontend and backend, sharing work and caching results.
  - **pnpm** is our fast, disk-space–efficient package manager, making installs quick and consistent.
- **Version Control: Git & GitHub**
  - All code lives in a Git repository on GitHub for collaboration and history tracking.
- **CI/CD Pipeline (GitHub Actions)**
  - Automatically runs builds and checks on every code push.
  - Deploys successful changes to staging or production without manual steps.
- **Hosting**
  - **Frontend**: Deployed as a static site on Vercel (or Netlify) for fast global delivery.
  - **Backend**: Deployed to a serverless platform or container service (e.g., Google Cloud Run) to auto-scale with traffic.
- **turbo.json**
  - Defines how projects in the monorepo depend on each other and what outputs to cache.

**Benefits of these choices:**
- Unified development workflow for frontend and backend.
- Faster builds and tests because of shared caching.
- Automatic deployments reduce human error and speed up releases.
- Easy to scale and roll back if needed.

## 4. Third-Party Integrations

Services we rely on to add powerful features without building everything from scratch.

- **Google Gemini API**
  - Provides the AI “brain” for understanding documents and generating answers.
  - Handles indexing, retrieval, and natural language responses.
- **Sample Documents** (optional)
  - Preloaded example files to help new users try the chat without uploading their own.

**Why these integrations matter:**
- We don’t reinvent a large language model—Gemini gives us high-quality AI features immediately.
- Citations come straight from Gemini, ensuring transparency and trust.

## 5. Security and Performance Considerations

Steps we take to keep data safe and the app snappy.

Security measures:
- **Environment Variables**: Keep API keys and secrets out of code.
- **HTTPS**: All communications happen over secure connections.
- **Input Validation**: Ensure uploads and user queries are checked before processing.
- **Error Handling**: Friendly messages for users, and detailed logs for developers (no sensitive data in logs).

Performance optimizations:
- **Vite HMR** speeds up developer workflows.
- **Turbo Caching** reuses build artifacts to avoid redundant work.
- **Code Splitting** (via Vite) ensures users only download the JavaScript they need.
- **Lazy Loading** components in React so the initial page loads faster.

## 6. Conclusion and Overall Tech Stack Summary

We chose this mix of technologies to meet our goals:

- **Fast development**: Vite, Turbo, and pnpm keep iteration quick.
- **Reliable AI features**: Google Gemini API powers accurate, context-aware answers.
- **Scalability and maintainability**: Monorepo structure with clear frontend/backend separation and TypeScript everywhere.
- **Secure and consistent deployments**: GitHub Actions and environment variables ensure safe, reproducible builds.

This stack balances cutting-edge AI, modern web development tools, and best practices in infrastructure to give users a smooth, reliable way to chat with their own documents.
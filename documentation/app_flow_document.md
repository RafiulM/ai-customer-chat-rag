# Application Flow Document

## Onboarding and Sign-In/Sign-Up

When a new user arrives at the application URL, they land on a welcome screen that introduces the AI Customer Chat with RAG capabilities. There is no traditional sign-up or login process. Instead, the system prompts the user to provide their Google Gemini API key if it is not already stored in the application’s configuration. This initial step ensures the AI can connect to the Gemini service and securely process documents. Users simply enter their key into the provided input field and save it to local storage, after which the app transitions to the main dashboard.

The app does not require user accounts or passwords. All data and settings exist in the user’s current browser session. If the API key is lost or invalid, the user will be prompted again to enter a valid key. There is no password recovery or social login method because the application is designed as a lightweight, session-based tool.

## Main Dashboard or Home Page

Once the API key is accepted, the user sees the primary workspace where document management and chat interactions take place. The page features a header that displays the application title and an icon to reset the session. Below the header, the main area is divided into two panels. On the left, there is a section showing existing RAG stores and their associated documents. On the right, a large content area displays either the document upload interface or the chat interface, depending on the app’s current state. A persistent button or link in the header allows the user to return to the welcome/upload screen from any part of the application.

The navigation between RAG stores and documents is accomplished by clicking on the store names in the left panel. Selecting a store reveals its indexed documents, while a clear call to action in the header takes the user straight back to the file upload screen if they wish to add more content. The layout is straightforward: you always know how to switch between browsing stores, uploading new files, and chatting with the AI.

## Detailed Feature Flows and Page Transitions

The core feature begins when the user chooses to upload documents. They click the upload button on the welcome screen or at the top of the RAG store list. This opens a modal dialog where they can drag and drop PDF, TXT, or Markdown files or select them through the file picker. Once files are chosen, the user confirms their selection. The application displays a progress bar that tracks upload and indexing. Behind the scenes, the app calls the Gemini service to process each document and build the RAG store. When processing completes successfully, the modal closes and the left panel refreshes to show the new store and its documents.

After the RAG store is ready, the central content area automatically transitions to the chat interface. Here, the user types questions into a text input at the bottom of the screen. Upon sending, the interface shows a spinner while the app sends the query to Gemini along with the relevant document context. Once Gemini returns an answer, the chat bubble appears with the AI’s response and clear citations pointing to the source document and line numbers. The user can scroll through the conversation, and the chat history persists for the duration of the session.

In addition to manual questions, the user can generate example queries. A button labeled “Generate Sample Questions” appears above the chat input when a RAG store is selected. Clicking it triggers a call to the Gemini service, which analyzes the indexed content and returns a list of suggested questions. The interface then displays these suggestions in the chat area, inviting the user to click on any example to send it automatically.

The application also provides a simple RAG store management flow. From the list of stores on the left, the user can click a store name to view its documents. If they wish to remove a document or an entire store, they click a trash icon next to the item name. A confirmation dialog appears before deletion. After removal, the list updates to reflect the change.

## Settings and Account Management

This application does not implement user account profiles or persistent settings beyond the API key. All preferences are reset when the browser session ends or when the user clears the app data. The one configurable item is the Gemini API key, which can be re-entered at any time by clicking the key icon in the header. There are no email notifications or billing options in this version of the app.

Once the user updates the API key, the application reloads the dashboard automatically. If there were any existing RAG stores in the local session, they remain accessible. Navigating away from the settings area simply returns the user to the document upload or chat interface as before.

## Error States and Alternate Paths

If the user enters an invalid or missing API key, the app displays a prominent error message at the top of the welcome screen and prevents any document uploads or chat queries. The message explains the problem and invites the user to correct their key. During file upload or indexing, if an unsupported file type is selected, the system shows an inline error in the modal and blocks that file from processing.

During chat, network failures or API errors trigger a fallback message in the chat window stating that the query could not be processed. The user can retry the same question by clicking a retry icon next to the error bubble. If the Gemini API returns no useful context or citations, the application responds with a polite note saying that no matching information was found and suggests refining the query or uploading more documents.

## Conclusion and Overall App Journey

In summary, a user starts by visiting the app URL and providing their Gemini API key on the welcome screen. They then upload documents of various formats to build a searchable RAG store. Once indexing completes, the interface seamlessly shifts to a chat view where the user asks questions and receives AI-powered answers with clear citations. Sample questions can be generated to help users get started. Simple management controls allow users to delete documents or stores, and a basic error handling system guides them through any issues. Throughout the session, navigation remains intuitive with the left panel for stores and the main area for uploading or chatting. This completes the straightforward flow from initial setup through everyday use of the AI-enhanced customer chat application.
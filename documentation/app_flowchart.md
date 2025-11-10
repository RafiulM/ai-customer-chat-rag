flowchart TD

  A[User Uploads Documents] --> B[Process and Index Documents]
  B --> C[RAG Store Created]
  C --> D[Display Chat Interface]
  C --> E[Generate Example Questions]
  E --> D
  D --> F[User Enters Question]
  F --> G[geminiService Search Query]
  G --> H[Google Gemini API]
  H --> I[Retrieve Relevant Context]
  I --> J[Generate Answer and Citations]
  J --> K[Display AI Response with Citations]
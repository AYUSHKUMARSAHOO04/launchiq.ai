# LaunchIQ.ai System Architecture

## Full Stack Architecture

```mermaid
graph TD

A[User Input] --> B[React Frontend]
B --> C[Simulation Engine]
C --> D[Groq AI Model]
D --> E[Structured JSON Response]
E --> F[Supabase Database]
F --> G[Results UI]
```

---

## System Components

### Frontend Layer

- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Intelligence Layer

- Groq API
- Llama 3.3 70B
- JSON Response Handling

### Persistence Layer

- Supabase Auth
- PostgreSQL Database

---

## Request Flow

```mermaid
sequenceDiagram

User->>Frontend: Enter Product Data
Frontend->>Groq: Send Prompt
Groq-->>Frontend: Strategic JSON
Frontend->>Supabase: Save Results
Supabase-->>Frontend: Response
Frontend-->>User: Display Dashboard
```

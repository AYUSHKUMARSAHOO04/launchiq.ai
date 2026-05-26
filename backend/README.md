# LaunchIQ.ai Backend Architecture

> AI-powered backend intelligence powered by **Groq LLM + Supabase**

---

## Core Backend Components

| Component | Technology | Purpose |
|------------|-------------|----------|
| Authentication | Supabase Auth | User login & sessions |
| Database | PostgreSQL | Simulation persistence |
| AI Intelligence | Groq LLM | Strategic consulting outputs |
| API Layer | TypeScript Services | AI orchestration |
| Storage | Supabase | Simulation records |

---

## AI Intelligence Pipeline

```mermaid
flowchart TD
    A[User Simulation Input] --> B[Simulation Engine]
    B --> C[Groq LLM API]
    C --> D[AI Strategic Analysis]
    D --> E[JSON Parsing Layer]
    E --> F[Supabase Storage]
    F --> G[Results Dashboard]

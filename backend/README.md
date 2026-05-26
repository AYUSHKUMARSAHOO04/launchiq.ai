# Backend Architecture

LaunchIQ.ai uses a Backend-as-a-Service architecture powered by Supabase and Groq AI.

## Components

### 1. Supabase
- Authentication
- PostgreSQL Database
- User Session Management
- Simulation Storage

### 2. Groq AI
- LLM-powered launch intelligence
- Strategic product analysis
- Market risk prediction
- Executive summaries
- Pricing strategy generation
- Go-to-market recommendations

## Database Tables

### simulations
Stores:
- user_id
- product_name
- purchase_intent
- market_sentiment
- risk_score
- launch_score
- simulation_data
- simulation_results

### auth.users
Handles:
- Signup
- Login
- Session Persistence

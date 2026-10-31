# LeadFlow AI - AI Lead Recovery & Appointment Automation

LeadFlow AI is a B2B SaaS designed for high-value Tunisian businesses (Real Estate, Automotive, Hotels) to automate lead qualification and appointment booking using AI.

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- Ollama (installed and running locally)
- A PostgreSQL database (or the system will use SQLite for local dev)

### 2. Installation
\`\`\`bash
cd leadflow-ai
npm install
\`\`\`

### 3. AI Setup (Ollama)
Ensure Ollama is running and you have the requested model (e.g., llama3):
\`\`\`bash
ollama run llama3
\`\`\`

### 4. Database Setup
\`\`\`bash
npx prisma db push
npm run seed
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

## 🛠 Architecture

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Backend**: Next.js Server Actions & API Routes.
- **Database**: PostgreSQL/SQLite via Prisma ORM.
- **AI Engine**: Ollama (Local LLM) with a provider-agnostic abstraction.
- **Auth**: NextAuth.js.

## 🌟 Demoing the Product

1. **The Customer Experience**:
   - Go to `/demo-widget`.
   - Send a message like: "Bonjour, je cherche une villa à Hammamet, budget 800k DT."
   - Watch the AI qualify the lead and respond instantly.

2. **The Business Experience**:
   - Go to `/dashboard`.
   - Check **Leads** to see the new lead with its AI-calculated score.
   - Go to **Demo Flow** to see the step-by-step internal logic (Qualification -> Scoring -> Matching -> Response).
   - Use the **Inbox** to manage conversations.

## 📈 Roadmap
- [ ] Meta API Integration (Facebook/Instagram/WhatsApp).
- [ ] Real-time notifications for "Hot Leads".
- [ ] Calendar integration for Appointments.
- [ ] Multi-tenant billing system.

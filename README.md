# FORMShift — Source → Structure → Verify

> **Primary Tagline:** “Turn information into impact — with facts, not fiction.”  
> **Secondary Tagline:** “Same source. Better structure. Verified facts.”  
> **Product Message:** “From raw information to professional documents you can trace and trust.”

FORMShift is an enterprise-grade AI platform that transforms unstructured raw content (news articles, technical reports, policy documents, pasted text, CNN/DailyMail samples) into verified professional formats (Press Advisory, Technical Brief, Executive Summary, Custom Format) with rigorous NLI fact-verification and 100% claim traceability.

---

## 🌟 Core Architecture & Pipeline

```
SOURCE ARTICLE / REPORT
        ↓
    INGESTION
        ↓
STRUCTURED FACT EXTRACTION (Fact Set: F1, F2...)
        ↓
    FACT LEDGER
        ↓
FORMAT SCHEMA REGISTRY (Press Advisory, Tech Brief, Exec Summary, Custom)
        ↓
FACT-CONSTRAINED DOCUMENT GENERATION
        ↓
PYDANTIC SCHEMA VALIDATION (Auto-Repair Loop)
        ↓
CLAIM EXTRACTION (Atomic Claims: C1, C2...)
        ↓
SOURCE EVIDENCE MATCHING
        ↓
NLI FACT VERIFICATION (roberta-large-mnli)
        ↓
REACT FLOW CLAIM TRACEABILITY GRAPH
        ↓
UNSUPPORTED CLAIM HANDLING & REPARATION
        ↓
HUMAN REVIEW & VERIFICATION STATE MANAGEMENT
        ↓
QUALITY REPORT & trust score (0-100)
        ↓
VERIFIED OUTPUT & SQLITE3 PERSISTENCE
        ↓
PDF / MARKDOWN / TXT EXPORT
```

---

## 🚀 Quick Start

### 1. Backend Setup (Node.js + Express)
```bash
cd backend
npm install
npm run db:setup # Initializes SQLite3 database
npm start
```
Runs on `http://localhost:5000`.

### 2. AI Microservice Setup (Python FastAPI)
```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Runs on `http://localhost:8000`.

### 3. Frontend Setup (React + Vite + Tailwind CSS)
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000` (or `http://localhost:5173`).

---

## 🛠 Required Technologies

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts, React Flow, Axios, React Router.
- **Node Backend**: Node.js, Express.js, SQLite3, Prisma ORM, JWT, bcryptjs, PDFKit.
- **AI/ML Service**: Python 3.11+, FastAPI, Pydantic v2, Hugging Face Transformers (`roberta-large-mnli`), PyTorch, Datasets, Streamlit.

---

## 🔒 Security & Admin Rules

- **Zero Hallucinations**: Missing fields in source text are rendered as `"Not provided in source."`
- **User Login Demo**: Public demo accessible without authentication at `/demo-center` via `[ TRY DEMO WITHOUT LOGIN ]` on `/login`.
- **Admin Portal**: Restricted route `/admin/login` contains **no demo options**, requiring real admin JWT authentication.

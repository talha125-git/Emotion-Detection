# Emotion Detection Web

Frontend: React + Vite  
Backend: FastAPI + scikit-learn

## Run Locally

### 1) Start backend (Terminal 1)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 2) Start frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

Notes:
- Frontend calls `"/api/predict"`.
- In local dev, Vite proxies `/api` to `http://localhost:8000` (already configured in `frontend/vite.config.js`).

## Deploy to Vercel

This repo is already configured with `vercel.json`:
- Frontend build output: `frontend/dist`
- Python serverless function: `api/index.py`
- API rewrites: `/api/*` -> FastAPI app

### Option A: Vercel Dashboard

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click `Add New Project` and import this repo.
3. Keep root directory as repository root.
4. Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel          # preview deployment
vercel --prod   # production deployment
```
# -Emotion_Detection

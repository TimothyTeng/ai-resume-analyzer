# ResuBench

**AI-powered resume analysis, ATS scoring, and career tools — built for job seekers who want real feedback, not fluff.**

---

## What it does

ResuBench reads your resume and gives you an honest, detailed breakdown of what's working and what isn't — scored against the specific job you're applying for.

- **ATS Score** — see how your resume performs against Applicant Tracking Systems before a recruiter ever sees it
- **Category Feedback** — detailed scoring across Tone & Style, Content, Structure, and Skills
- **Suggested Rewrites** — exact sentences from your resume with concrete improved alternatives
- **Cover Letter Generator** — tailored cover letter based on your resume and the job description
- **Recruiter Email Generator** — a concise, no-fluff cold outreach email ready to send

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + React Router v7 |
| Styling | Tailwind CSS |
| Auth & Storage | [Puter.js](https://puter.com) |
| AI | Claude Sonnet (via Puter AI) |
| PDF Processing | PDF.js |
| State Management | Zustand |
| Build Tool | Vite |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/TimothyTeng/ai-resume-analyzer.git
cd ResumeReview
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run start
```

---

## How it works

1. **Sign in** with your Puter account (free)
2. **Upload your resume** as a PDF
3. **Enter the job details** — company name, job title, and job description
4. **Get your analysis** — full AI feedback usually takes 30–60 seconds
5. **Generate** a tailored cover letter or recruiter email from the same page

All files are stored securely in your personal Puter cloud storage. No data is stored on any third-party server.

---

## Project Structure

```
src/
├── components/
│   ├── ATS.tsx              # ATS score card
│   ├── Details.tsx          # Accordion feedback by category
│   ├── FileUploader.tsx     # PDF drag-and-drop uploader
│   ├── GenCoverLetter.tsx   # Cover letter generator
│   ├── GenEmail.tsx         # Recruiter email generator
│   ├── Navbar.tsx           # Top navigation
│   ├── ResumeCard.tsx       # Resume card with delete
│   ├── ScoreCircle.tsx      # Circular score indicator
│   ├── ScoreGauge.tsx       # Semicircle gauge for overall score
│   └── Summary.tsx          # Score summary card
├── lib/
│   ├── pdf2img.ts           # PDF to image conversion
│   ├── puter.ts             # Zustand store for Puter.js
│   └── utils.ts             # Utility functions
├── routes/
│   ├── home.tsx             # Dashboard / landing page
│   ├── upload.tsx           # Resume upload flow
│   ├── resume.tsx           # Resume review page
│   └── auth.tsx             # Authentication page
└── constants.ts             # AI prompt instructions
```

---

## Environment

No environment variables required. ResuBench uses [Puter.js](https://puter.com) for auth, file storage, and AI — everything runs client-side through your Puter account.

---

## Design

ResuBench uses the **Midnight Luxe** design system — a dark editorial aesthetic built around:

- **Obsidian** `#0D0D12` — base background
- **Champagne** `#C9A84C` — primary accent
- **Ivory** `#FAF8F5` — text
- **Outfit** — headings and UI
- **Playfair Display** — italic accent type
- **JetBrains Mono** — labels, scores, and data

---
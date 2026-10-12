# AlgoPilot: Adaptive AI for Personalized DSA & Technical Interview Preparation

**Phase 1 Frontend Prototype**  
A modern, responsive, research-oriented frontend application engineered to help students overcome recurring algorithmic mistakes, build consistent practice habits, and excel in technical coding interviews.

---

## 1. Project Overview & Vision

Students preparing for coding interviews frequently solve hundreds of problems without understanding their recurring error patterns or which specific cognitive gaps need attention. 

**AlgoPilot** shifts preparation from mindless grinding to **adaptive calibration**:

$$\text{Practice} \longrightarrow \text{Error Diagnostics} \longrightarrow \text{Cognitive Calibration} \longrightarrow \text{Targeted Recommendations} \longrightarrow \text{Mock Interviews} \longrightarrow \text{Mastery}$$

The platform incorporates an academic research foundation designed to evaluate whether performance-aware problem sequences yield faster problem-solving retention compared to uniform random sampling or static syllabus progression.

---

## 2. Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (custom dark theme, subtle borders, glassmorphic surfaces)
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** Lucide React
- **Analytics Charts:** Recharts (Radar, Bar, Pie/Doughnut charts)
- **Code Editor:** Monaco Editor (`@monaco-editor/react`) with responsive fallback
- **State Persistence:** Safe `localStorage` service for demo user state, bookmarks, and submissions

---

## 3. Project Structure

```
AlgoPilot/
├── index.html                     # Application entry point with fonts & metadata
├── package.json                   # Dependencies and npm scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind theme tokens & color palettes
├── tsconfig.json                  # Root TypeScript configuration
├── tsconfig.app.json              # App compiler options
├── src/
│   ├── main.tsx                   # React root entry point
│   ├── App.tsx                    # Routes and context providers
│   ├── index.css                  # Global styles, scrollbar tokens, Tailwind directives
│   ├── types/
│   │   └── index.ts               # Core TypeScript models (Problem, User, Submission, etc.)
│   ├── data/
│   │   ├── problemsData.ts        # 12 core DSA problems spanning all required topics
│   │   ├── topicsData.ts          # Proficiencies, confidence scores & error categories
│   │   ├── mockUserData.ts        # Student profile, activity heatmaps & submissions
│   │   ├── missionsData.ts        # Daily coding missions & consistency streak calendar
│   │   ├── companyPrepData.ts     # Company tracks (Google, Amazon, Microsoft, Meta, Uber)
│   │   └── interviewData.ts       # Interview templates, dialogue cues & evaluation rubrics
│   ├── services/
│   │   ├── storageService.ts      # LocalStorage persistence layer
│   │   ├── mockJudgeService.ts    # Honest simulated test execution & judging
│   │   ├── aiMentorService.ts     # Socratic conversational guidance & progressive hints
│   │   └── researchService.ts     # Experimental recommendation strategy switcher
│   ├── context/
│   │   └── AuthContext.tsx        # Simulated authentication & global user preferences
│   ├── hooks/
│   │   └── useTheme.ts            # Light/Dark theme switching hook
│   ├── components/
│   │   ├── common/                # Navbar, Sidebar, Card, StatCard, Badge, Button, Modal, ResearchBadge
│   │   ├── charts/                # ProficiencyRadar, WeeklyActivityChart, DifficultyDistribution, ErrorDistribution
│   │   ├── workspace/             # CodeEditor (Monaco), ProblemDetails, TestcaseConsole
│   │   └── interview/             # InterviewTimer, InterviewerChat, FeedbackReportModal
│   ├── layouts/
│   │   └── MainLayout.tsx         # Responsive application layout with persistent sidebar
│   └── pages/
│       ├── LandingPage.tsx        # Public marketing & educational overview
│       ├── AuthPage.tsx           # Simulated Sign In and Sign Up
│       ├── OnboardingPage.tsx     # 3-step personalization wizard
│       ├── DashboardPage.tsx      # Central learner command center
│       ├── ProblemsPage.tsx       # DSA Explorer with multi-filtering and search
│       ├── WorkspacePage.tsx      # Split-pane IDE with Monaco editor & console
│       ├── AiMentorPage.tsx       # Socratic conversational DSA tutor
│       ├── AnalyticsPage.tsx      # Multi-dimensional skill profiling & charts
│       ├── CompanyPrepPage.tsx    # Company tracks with hiring stage breakdowns
│       ├── MockInterviewPage.tsx  # Timed interview simulator with dialogue & report
│       ├── MissionsPage.tsx       # Daily coding missions & habit streak calendar
│       ├── SettingsPage.tsx       # Profile, preferences, and platform placeholders
│       └── NotFoundPage.tsx       # 404 handler
```

---

## 4. Application Pages & Capabilities

| Page | Route | Description |
|---|---|---|
| **Landing Page** | `/` | Explains adaptive learning, features overview, workflow timeline, and CTAs. |
| **Authentication** | `/auth` | Simulated login/signup with instant demo student autofill (`Alex Chen`). |
| **Onboarding** | `/onboarding` | 3-step configuration for language, DSA level, target arena, and daily goal. |
| **Dashboard** | `/dashboard` | Metrics, radar proficiency overview, weekly activity chart, weak topics, and adaptive recommendations. |
| **DSA Explorer** | `/problems` | Search and filter 12 DSA topics (Arrays, Trees, Graphs, DP, etc.), bookmarking, preview modal. |
| **Coding Workspace** | `/workspace/:id` | Monaco code editor (Python, C++, Java), sample testcases, Run & Submit simulation. |
| **AI Mentor** | `/ai-mentor` | Socratic hints, error breakdown, and time/space complexity analysis chips. |
| **Skill Analytics** | `/analytics` | Algorithmic domain radar, error categorization (off-by-one, TLE), and 12-topic skill table. |
| **Company Prep** | `/company-prep` | Tracks for Google, Amazon, Microsoft, Meta, and Uber with stage breakdowns. |
| **Mock Interview** | `/mock-interview` | Timed live simulation with countdown timer, interviewer dialogue, and 4-rubric report. |
| **Coding Missions** | `/missions` | Daily calibration tasks, topic sprints, XP rewards, and streak calendar. |
| **Settings** | `/settings` | Profile management, language preferences, theme toggle, and integration placeholders. |

---

## 5. Research-Oriented Foundation

AlgoPilot is structured to support a future empirical study evaluating three distinct problem selection paradigms:

1. **Strategy A (Random Baseline):** Uniform random distribution across topics without considering user weaknesses (experimental control group).
2. **Strategy B (Topic Syllabus):** Static linear curriculum progressing strictly from Arrays $\to$ Strings $\to$ Trees $\to$ DP.
3. **Strategy C (Performance-Aware Adaptive AI):** Continuously computes accuracy gaps and error categories to recommend targeted calibration problems.

*Users can dynamically switch strategies in the navigation bar using the **Research Mode** badge to observe how recommendations adjust.*

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup & Run Commands

```powershell
# 1. Clone or navigate to the repository
cd AlgoPilot

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in your browser
# Navigate to http://localhost:5173
```

### Production Build Validation

```powershell
# Run TypeScript compilation and Vite production bundle
npm run build
```

---

## 7. Phase 1 Disclosures & Limitations

- **Honest Simulated Execution:** In Phase 1, code execution, test judging, and AI responses are simulated in the frontend. No external code execution container or paid OpenAI/Gemini credentials are required.
- **Client-Side Demonstration Auth:** Simulated credentials are stored locally. No passwords or API tokens are transmitted over networks.
- **Third-Party Integrations:** LeetCode, Codeforces, and GitHub connectors in Settings are clearly labeled as Phase 2 placeholders.

---

## 8. Recommended Next Steps for Phase 2

1. **Secure Execution Sandbox:** Integrate an isolated container execution microservice (e.g. Judge0 or custom Docker worker) to compile user C++, Python, and Java code against hidden test suites.
2. **Real AI Mentor Backend:** Connect LangChain or Gemini SDK with structured Socratic system prompts and conversation history persistence.
3. **User Authentication & Database:** Implement PostgreSQL/Prisma or Firebase Auth to store real user accounts and multi-device telemetry.
4. **Empirical Research Logging:** Record anonymized pre-test and post-test velocity to statistically evaluate Strategy A vs Strategy B vs Strategy C.

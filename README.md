# 🚓 Karnataka State Police (KSP) - Crime Intelligence & Analysis Platform

> **Next-Generation AI-Powered Law Enforcement, Geospatial Crime Mapping & Investigative Analytics Suite**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Localization](https://img.shields.io/badge/i18n-English%20%7C%20%E0%B2%95%E0%B2%AE%E0%B3%8D%E0%B2%A8%E0%B2%A1-orange)](frontend/src/locales)

---

## 📌 Overview

The **Karnataka State Police (KSP) Crime Intelligence & Analysis Platform** is an enterprise-grade, intelligent web application designed to empower law enforcement officers, criminal investigators, crime analysts, and policy makers across Karnataka. 

By integrating **Conversational AI**, **Geospatial Crime Mapping**, **Graph-based Criminal Network Analysis**, and **Predictive Analytics**, the platform transforms raw crime data into actionable intelligence for proactive policing and rapid case resolution.

---

## ✨ Key Features & Modules

### 🛡️ 1. Public Citizen Portal & Services
- **Citizen Services Access**: Direct submission and tracking for e-FIRs, character verification, missing persons, lost properties, and traffic advisories.
- **24/7 Emergency Helplines**: Quick access to critical emergency numbers including **112** (Police Emergency), **1091** (Women Helpline), **1930** (Cyber Crime), **1098** (Child Helpline), and **1064** (Anti-Corruption).
- **Public Notifications & News**: Official state police advisories and news updates.

### 📊 2. Real-Time Command Dashboard
- **Operational KPIs**: Instant metrics on active cases, solved cases, response times, and station activity.
- **Live Alert Ticker**: Dynamic notification feed tracking ongoing incidents across districts.
- **District Incident Matrix**: Spatial and status breakdowns of police stations across Karnataka.

### 🤖 3. AI Conversational Assistant (KSP Copilot)
- **Natural Language Intelligence**: Query crime databases using conversational prompts in English or Kannada.
- **Legal & IPC/BNS Reference**: Instant retrieval of Indian Penal Code (IPC) and Bharatiya Nyaya Sanhita (BNS) section breakdowns.
- **Drafting Support**: Automated generation of investigation summaries, charge sheets, and intelligence memos.

### 🕸️ 4. Criminal Network Analysis
- **Interactive Graph Visualizer**: Built with `@xyflow/react` to map relationships between suspects, gangs, financial transactions, and illegal operations.
- **Node Centrality & Clusters**: Identify key kingpins, facilitators, and hidden connections within criminal syndicates.

### 🗺️ 5. Geospatial Crime Mapping
- **Spatial Intelligence**: Interactive Leaflet maps (`react-leaflet`, `leaflet.heat`, `leaflet.markercluster`) displaying district-level crime hotspots.
- **Heatmaps & Clustering**: Filter by crime category, date range, police station jurisdiction, and risk severity.

### 📈 6. Crime Analytics & Predictive Forecasting
- **Trend Visualization**: Interactive charts powered by Recharts showing temporal, seasonal, and demographic crime statistics.
- **AI Forecasting Engine**: Predictive models highlighting potential future hotspots and emerging crime patterns for optimized patrol allocation.

### 📁 7. Case & Investigation Management
- **Full Lifecycle Tracking**: Comprehensive FIR management, case timelines, evidence logging, witness statements, and suspect profiles.
- **Export & Report Generation**: One-click generation of official PDF reports and intelligence briefs using `jspdf` and `html2canvas`.

### 🌐 8. Bilingual Support (English / ಕನ್ನಡ)
- Full internationalization (`i18next`) allowing seamless toggle between **English** and **Kannada (ಕನ್ನಡ)**.

---

## 🔐 Role-Based Access Control (RBAC)

The application enforces strict security and role-based permissions across various operational levels:

| Role | Command Dashboard | Cases & Investigation | AI Assistant | Crime Map | Network Analysis | Analytics & Forecast | Reports | Settings |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Administrator** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Supervisor** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Investigator** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Police Officer** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Analyst** | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Policy Maker** | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/), [TypeScript 6](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/) |
| **Styling & Motion** | [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/) |
| **State Management** | [Zustand v5](https://zustand-demo.pmnd.rs/) |
| **Data Fetching & Forms** | [TanStack React Query v5](https://tanstack.com/query), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Geospatial & Mapping** | [Leaflet](https://leafletjs.com/), [React-Leaflet](https://react-leaflet.js.org/), Leaflet Heatmap & MarkerCluster |
| **Network Visualization**| [React Flow / @xyflow/react](https://reactflow.dev/) |
| **Charts & Visuals** | [Recharts](https://recharts.org/) |
| **Internationalization** | [i18next](https://www.i18next.com/), `react-i18next` |
| **Document Export** | [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/) |
| **UI Components** | [Sonner](https://sonner.emilkowal.ski/) (Notifications), Custom Radix-style UI primitives |

---

## 📁 Repository Structure

```
KSP/
├── README.md                      # Primary project documentation
├── LICENSE                        # MIT License
└── frontend/                      # Web Application Root
    ├── public/                    # Static public assets
    ├── src/
    │   ├── assets/                # Logos, emblems, and static media
    │   ├── components/            # UI components (Layouts, Shared, Controls)
    │   ├── features/              # Modular feature domains
    │   │   ├── ai-assistant/      # Conversational AI & copilot interface
    │   │   ├── analytics/         # Crime analytics & metrics breakdown
    │   │   ├── auth/              # Login, Registration, OTP, Forgot Password
    │   │   ├── cases/             # Case management & digital case files
    │   │   ├── dashboard/         # Command center dashboard
    │   │   ├── forecast/          # AI predictive crime forecasting
    │   │   ├── landing/           # Citizen public portal landing page
    │   │   ├── map/               # Leaflet geospatial crime map
    │   │   ├── network-analysis/  # Criminal network relationship graph
    │   │   ├── reports/           # Automated intelligence report builder
    │   │   └── settings/          # System configuration & RBAC management
    │   ├── hooks/                 # Custom React utility hooks
    │   ├── locales/               # Bilingual localization (en.json, kn.json)
    │   ├── providers/             # React context providers (Theme, etc.)
    │   ├── routes/                # Application routes & RBAC route guards
    │   ├── store/                 # Global Zustand state stores (useAuthStore)
    │   ├── styles/                # Global CSS & Tailwind setup
    │   └── types/                 # Shared TypeScript interfaces & types
    ├── package.json               # Project dependencies and npm scripts
    ├── tsconfig.json              # TypeScript compiler configuration
    └── vite.config.ts             # Vite build & bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm`)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ravitejam2007-code/karnataka-state-police.git
   cd karnataka-state-police
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

### Available Scripts

In the `frontend/` directory, you can run:

- `npm run dev`: Launches the local Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Type-checks the TypeScript code (`tsc -b`) and builds the optimized production assets into `dist/`.
- `npm run preview`: Previews the local production build.
- `npm run lint`: Runs `oxlint` for fast code linting.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 **RaviTeja M**. All rights reserved.
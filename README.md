# FreelanceHub

<p align="center">
  A modern freelance marketplace frontend prototype built with React, Vite, Tailwind CSS, React Router, and Framer Motion.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
</p>

<p align="center">
  <a href="README_TR.md">Türkçe README</a>
</p>

## Overview

**FreelanceHub** is a two-sided freelance marketplace prototype designed around realistic client and freelancer workflows. It demonstrates project discovery, proposal management, role-based navigation, messaging, project management, earnings and payment history, profile management, and responsive UI behavior.

> **Scope:** This is a frontend/client-side prototype. Authentication, marketplace data, messages, earnings, and payments are simulated in the browser with `localStorage`. No production backend, database, payment gateway, or secure authentication service is connected.

## Core Features

- Role-based signup for clients and freelancers
- Client-side login and protected routes
- Project creation and project management
- Job discovery with search and category filtering
- Saved jobs and proposal submission
- Duplicate-application protection
- Proposal status tracking
- Client review, approval, and rejection flows
- Prototype messaging between project participants
- Simulated payment approval flow
- Freelancer earnings history and client payment history
- Notifications, profile, and account management
- Freelancer service creation and service browsing
- Responsive UI with Tailwind CSS
- Framer Motion animations and transitions

## User Flows

**Client**  
`Sign Up / Login → Create Project → Receive Applications → Review Proposal → Message Freelancer → Approve / Reject → Simulated Payment → Payment History`

**Freelancer**  
`Sign Up / Login → Find Work → Save / Open Project → Submit Proposal → Track Proposal → Message Client → Approval → Earnings History`

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Routing | React Router |
| Animation | Framer Motion |
| State / Persistence | React state + browser `localStorage` |
| Linting | ESLint |

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` / `/home` | Marketplace landing page |
| `/login` | Login |
| `/signup` | Role-based registration |
| `/find-work` | Browse and search projects |
| `/saved-jobs` | Saved opportunities |
| `/create-project` | Client project creation |
| `/my-projects` | Client project and application management |
| `/my-proposals` | Freelancer proposal tracking |
| `/my-service` | Freelancer service management |
| `/profile` | Freelancer profile |
| `/my-account` | Account settings |
| `/earnings` | Freelancer earnings history |
| `/payments` | Client payment history |

## Local Data Model

The prototype uses browser storage to simulate backend entities including `users`, `currentUser`, `token`, `projects`, `applications`, `savedJobs`, `earnings`, and `payments`. A custom `storageUpdated` browser event is used in selected flows to refresh UI state after local changes.

## Project Structure

```text
freelancehub/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── JobDetailsPopup.jsx
│   │   ├── Messages.jsx
│   │   ├── Navbar.jsx
│   │   ├── PaymentSidebar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ServiceDetailsPopup.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── CreateProject.jsx
│   │   ├── Earnings.jsx
│   │   ├── FindWork.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyAccount.jsx
│   │   ├── MyProjects.jsx
│   │   ├── MyProposals.jsx
│   │   ├── MyService.jsx
│   │   ├── Payments.jsx
│   │   ├── Profile.jsx
│   │   ├── SavedJobs.jsx
│   │   └── Signup.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Run Locally

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/safialajati2-creator/freelancehub.git
cd freelancehub
npm install
npm run dev
```

Vite will print the local development URL, typically `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## Current Limitations

This project focuses on frontend architecture and product workflows rather than production infrastructure. Authentication is simulated, passwords in browser storage are not secure, data is device-local, messages are not realtime, and payments do not transfer real money. A production implementation would require a backend API, database, secure authentication and authorization, server-side validation, file storage, realtime messaging, and a real payment provider.

## What This Project Demonstrates

FreelanceHub demonstrates practical frontend development across **routing, reusable components, role-based UX, form handling, browser persistence, project and application workflows, search and filtering, responsive UI design, and state-driven interface behavior**.

## Developer

**Mustafa Alajati**  
Software Engineering Student — Beykoz University, Istanbul, Türkiye  
[GitHub](https://github.com/safialajati2-creator) · [LinkedIn](https://www.linkedin.com/in/mustafa-alajati-920241251)

# FreelanceHub

<p align="center">
  A modern two-sided freelance marketplace frontend prototype built with React, Vite, Tailwind CSS, React Router, and Framer Motion.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router" />
</p>

<p align="center"><a href="README_TR.md">Türkçe README</a></p>

## Overview

**FreelanceHub** is a two-sided freelance marketplace prototype designed around two distinct role-based experiences: **Client / Job Poster** and **Freelancer**. Each role has its own navigation, workflows, management tools, and marketplace capabilities.

Clients can publish and manage projects, review freelancer applications, communicate with candidates, approve or reject proposals, and manage simulated payments. Freelancers can discover opportunities, save jobs, submit proposals, track application status, manage their professional profile and services, and review earnings.

> **Scope:** This is a frontend/client-side prototype. Authentication, marketplace data, messages, earnings, and payments are simulated in the browser with `localStorage`. No production backend, database, payment gateway, or secure authentication service is connected.

## Product Showcase

### Shared Marketplace Experience

The landing experience introduces the marketplace and provides access to job discovery, search, account navigation, and role-specific tools.

<p align="center"><img src="docs/images/home-dashboard.png" width="900" alt="FreelanceHub home dashboard" /></p>

## Two Role-Based Experiences

### Client / Job Poster

The **Client** side is designed for users who want to hire freelancers. Clients can create projects, manage their posted work, review incoming proposals, communicate with applicants, approve or reject candidates, and complete a simulated payment workflow.

**Client flow**  
`Sign Up / Login → Create Project → Receive Applications → Review Proposal → Message Freelancer → Approve / Reject → Simulated Payment → Payment History`

### Freelancer

The **Freelancer** side focuses on discovering and managing work opportunities. Freelancers can browse projects, search and filter listings, save jobs, open project details, submit applications, track proposal status, manage services and profile information, and review earnings.

**Freelancer flow**  
`Sign Up / Login → Find Work → Save / Open Project → Submit Proposal → Track Proposal → Message Client → Approval → Earnings History`

### Discover & Apply

<table>
<tr>
<td width="50%"><img src="docs/images/find-work.png" alt="Find Work" /></td>
<td width="50%"><img src="docs/images/job-application-modal.png" alt="Job application modal" /></td>
</tr>
<tr>
<td align="center"><b>Find Work</b><br/>Search and filter available projects.</td>
<td align="center"><b>Project Application</b><br/>Review project details and submit a proposal.</td>
</tr>
</table>

### Save & Track Opportunities

<table>
<tr>
<td width="50%"><img src="docs/images/saved-jobs.png" alt="Saved Jobs" /></td>
<td width="50%"><img src="docs/images/my-proposals.png" alt="My Proposals" /></td>
</tr>
<tr>
<td align="center"><b>Saved Jobs</b><br/>Keep interesting opportunities for later.</td>
<td align="center"><b>My Proposals</b><br/>Track pending, approved, and rejected applications.</td>
</tr>
</table>

### Freelancer Business Tools

<table>
<tr>
<td width="50%"><img src="docs/images/freelancer-services.png" alt="Freelancer Services" /></td>
<td width="50%"><img src="docs/images/freelancer-profile.png" alt="Freelancer Profile" /></td>
</tr>
<tr>
<td align="center"><b>Services</b><br/>Create and manage freelance service offerings.</td>
<td align="center"><b>Professional Profile</b><br/>Manage availability, skills, education, rate, and experience.</td>
</tr>
</table>

### Earnings

<p align="center"><img src="docs/images/earnings.png" width="900" alt="Freelancer earnings history" /></p>

The earnings view provides a client-side record of approved and paid freelance work in the prototype.

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
├── docs/
│   └── images/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── utils/
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

FreelanceHub demonstrates practical frontend development across **routing, reusable components, role-based UX, form handling, browser persistence, project and application workflows, search and filtering, responsive UI design, and state-driven interface behavior**. It also demonstrates how a two-sided marketplace can provide separate product experiences for clients and freelancers within one application.

## Developer

**Mustafa Alajati**  
Software Engineering Student — Beykoz University, Istanbul, Türkiye  
[GitHub](https://github.com/safialajati2-creator) · [LinkedIn](https://www.linkedin.com/in/mustafa-alajati-920241251)

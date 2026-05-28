# Implementation Plan: CleanCalabar Application

## Project Overview
CleanCalabar is a community-driven waste management and categorization application. It aims to empower citizens to report waste, categorize it using AI, and coordinate with recyclers and government bodies for efficient disposal.

**Note:** As per session constraints, this implementation will be a frontend-only prototype. Persistence will be handled via `localStorage`, and backend/Supabase integrations will be mocked.

## Scope & Non-Goals
- **Scope:**
  - Citizen reporting interface (Mobile-responsive).
  - Admin/Recycler dashboard.
  - AI waste categorization (mocked or client-side TensorFlow.js).
  - Interactive map for waste reporting (using mock data or public maps).
  - Gamification/Reward system (Client-side logic).
- **Non-Goals:**
  - Real-world Supabase/Postgres backend.
  - Live API integration with government systems.
  - Native Mobile builds (Android/iOS).

## Assumptions & Open Questions
- **Assumption:** TensorFlow.js can be used for basic waste categorization if a pre-trained model is accessible, otherwise, we will provide a robust mock categorization experience.
- **Assumption:** "Google Maps" integration might be substituted with Leaflet/OpenStreetMap if API keys are unavailable, but the UI will remain map-centric.

## Affected Areas
- **Frontend:** React application with Tailwind CSS and Shadcn UI.
- **Data Layer:** `localStorage` for persisting reports and user profiles.
- **AI Layer:** TensorFlow.js for in-browser waste classification.
- **State Management:** React Context or localized state for app flow.

---

## Phase 1: Foundation & Design System (Frontend)
- **Deliverables:** Basic layout, routing, and theme setup.
- **Tasks:**
  - Initialize React router with Citizen and Admin routes.
  - Set up brand colors (CleanCalabar greens/browns) in `index.css`.
  - Create reusable UI components (Button, Card, Input) from existing Shadcn library.
- **Owner:** `frontend_engineer`

## Phase 2: Citizen Application - Reporting Flow
- **Deliverables:** Waste reporting form and interactive map.
- **Tasks:**
  - Implement "Report Waste" wizard (Location -> Photo -> Category -> Submit).
  - Integrate a map component for selecting/viewing waste locations.
  - Implement client-side persistence for reports using `localStorage`.
- **Owner:** `frontend_engineer`

## Phase 3: AI Categorization & Feedback Loop
- **Deliverables:** Waste categorization UI using TensorFlow.js or high-fidelity mock.
- **Tasks:**
  - Scaffold AI categorization component.
  - If feasible, integrate a lightweight TensorFlow.js model for image classification.
  - Implement the "Feedback Loop" (User corrects AI prediction).
- **Owner:** `frontend_engineer`

## Phase 4: Admin & Recycler Dashboard
- **Deliverables:** Management view for waste reports and collection.
- **Tasks:**
  - Build dashboard to list all reported waste.
  - Add filtering by status (Pending, Collected, Recycled).
  - Create simple analytics charts (Waste volume, most reported areas).
- **Owner:** `frontend_engineer`

## Phase 5: Gamification & Polish
- **Deliverables:** User rewards and final UI refinements.
- **Tasks:**
  - Implement a "Points" or "Rewards" system based on reports.
  - Final CSS polish and responsive testing.
  - Fix any minor bugs found during dev.
- **Owner:** `quick_fix_engineer`

---

## Sequencing Constraints
- Phase 1 must be completed before any functional features.
- Phase 2 (Data entry) should precede Phase 4 (Data management).
- Phase 5 can run in parallel with the end of Phase 4.

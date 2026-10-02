# My Agency for English Language

My Agency for English Language is a student-focused English-practice companion for daily life. It helps learners practice with guided activities that simulate a friendly speaking partner.

## MVP Features

- Welcoming dashboard with clear purpose and a quick "start practice" action
- Daily conversation prompts by category:
  - greetings
  - school
  - travel
  - shopping
  - work
  - hobbies
- Vocabulary flashcards with:
  - reveal meaning
  - know it
  - need practice
- Text-based role-play speaking practice with scenarios, partner persona, and suggested phrases
- Local progress tracking in browser `localStorage`:
  - selected level (beginner/intermediate/advanced)
  - streak
  - practiced items
  - completed activities
  - daily goal progress
- Responsive and keyboard-accessible interface for mobile and desktop
- Basic loading, empty, and error states

## Tech Stack

- React + Vite
- Plain CSS
- No backend, no authentication, no external paid services

## Local Setup

From the repository root:

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Optional Preview

```bash
npm run preview
```

## Data Persistence

This app stores practice progress only in your browser using `localStorage` (key: `english-practice-mvp-progress`).
No server-side storage is used.

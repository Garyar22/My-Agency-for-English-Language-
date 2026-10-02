# My Agency for English Language

A professional EdTech platform blueprint for **daily English speaking practice** from **CEFR A1 to C2**, with IELTS-inspired speaking methodology for placement and progress.

> **Disclaimer**
> This assessment is an English-learning placement assessment inspired by IELTS Speaking methodology. It is **not** an official IELTS examination and does **not** provide an official IELTS score.

---

## 1) Product Goal

Help learners build real-life speaking confidence through:
- AI speaking partner practice
- Human speaking partner practice
- Daily speaking challenges
- Structured feedback (fluency, vocabulary, grammar, pronunciation)
- CEFR progression (A1 → C2)
- Practice-based IELTS speaking estimate (reference only)

Core loop: **Assess → Personalize → Practice → Correct → Repeat → Improve**.

---

## 2) Phase-Based Delivery Plan

### Phase 1 (Foundation)
- Authentication + role-based access (Student/Teacher/Admin)
- Student profile + goals
- Speaking placement test (IELTS-inspired Part 1/2/3)
- CEFR estimation engine + estimated IELTS range
- Student dashboard (initial progress metrics)

### Phase 2 (Learning Engine)
- AI speaking partner with level-adaptive prompts
- Daily speaking challenge engine
- Conversation feedback report
- Vocabulary extraction + spaced review list
- Prioritized grammar feedback

### Phase 3 (Partner + Teaching)
- Human partner matching (level, goals, timezone, availability)
- Voice/text practice room + session timer
- Safety controls (report/block)
- Teacher dashboard (assignments, history, error trends)

### Phase 4 (Scale + Monetization)
- Advanced analytics (retention, fluency trend, activity)
- Gamification (XP, streaks, badges)
- Subscription plans + billing hooks
- Admin operations and moderation
- Mobile UX optimization

---

## 3) Learning and Assessment Model

### Speaking Placement Test Structure (IELTS-inspired)
1. **Part 1: Introduction & Interview** (familiar topics)
2. **Part 2: Long Turn** (1 minute prep + up to 2 minutes speaking)
3. **Part 3: Discussion** (abstract/deeper follow-up)

### Scoring Dimensions
- Fluency & Coherence
- Lexical Resource
- Grammatical Range & Accuracy
- Pronunciation

### Placement Output
- CEFR estimate: A1 / A2 / B1 / B2 / C1 / C2
- Estimated IELTS Speaking range (reference only)
- Strengths + priority improvements
- Personalized next-step practice plan

---

## 4) CEFR Learning Environments

- **A1**: basic introductions, daily routine, simple present, survival communication
- **A2**: routines, past/future basics, simple comparisons, follow-up questions
- **B1**: opinions, storytelling, pros/cons, longer conversations
- **B2**: arguments, counterarguments, hypotheticals, abstract topics
- **C1**: nuanced explanations, advanced vocabulary, complex discourse
- **C2**: precise and flexible communication across complex real-world themes

---

## 5) Feature Map

### Student Experience
- Onboarding goal selection
- Placement test before course path
- AI practice sessions
- Human partner sessions
- Daily challenge
- Vocabulary and grammar improvement feed
- Progress dashboard + weekly report
- Level-up test when ready

### Teacher Experience
- Student tracking by CEFR and skill dimensions
- Speaking history + common mistakes
- Task/topic assignment
- Level progression controls

### Admin Experience
- User, course, level, topic, moderation, and subscription controls
- AI settings governance
- Reporting and operational analytics

---

## 6) Minimal Scalable Data Model

The platform should include at least:

- Users
- Profiles
- CEFRLevels
- IELTSAssessments
- AssessmentQuestions
- AssessmentResults
- SpeakingSessions
- ConversationTopics
- ConversationMessages
- Partners
- PartnerMatches
- Vocabulary
- StudentVocabulary
- GrammarTopics
- StudentMistakes
- PronunciationResults
- DailyChallenges
- ProgressRecords
- Achievements
- Subscriptions
- Teachers
- TeacherAssignments
- Notifications

---

## 7) Suggested Service Architecture

- **Auth Service**: login, registration, RBAC
- **Assessment Service**: placement test orchestration + scoring
- **Conversation Service**: AI/human sessions + message timeline
- **Feedback Service**: vocabulary extraction, grammar correction, pronunciation insights
- **Progress Service**: CEFR progression, weekly reports, streaks, achievements
- **Matching Service**: partner recommendations and room creation
- **Admin/Teacher Service**: management dashboards and controls

---

## 8) Safety, Privacy, and Security Baseline

- Secure authentication
- Role-based data access
- Recording consent controls
- Private audio/session storage (no public exposure)
- Report/block workflows for partner interactions
- Audit-ready moderation actions

---

## 9) UX Principles

- Mobile-first speaking flow
- One-tap speaking start (large microphone CTA)
- Beginner-friendly wording
- Fast session transitions
- Encouraging, non-judgmental feedback tone

---

## 10) Initial Build Priority (Next Implementation Milestone)

1. Create backend + DB migrations for the core entities above.
2. Implement onboarding + placement test + CEFR estimation API.
3. Deliver Student Dashboard v1 with progress widgets.
4. Add AI speaking session flow with post-session feedback summary.


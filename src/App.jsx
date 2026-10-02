import { useEffect, useMemo, useState } from 'react'
import './App.css'

const LEVELS = ['beginner', 'intermediate', 'advanced']

const PROMPTS_BY_CATEGORY = {
  greetings: [
    'How do you usually greet a classmate in the morning?',
    'Introduce yourself to a new English-speaking friend.',
    'How would you politely end a short conversation?' 
  ],
  school: [
    'Describe your favorite subject and why you enjoy it.',
    'Ask your teacher for help with homework in English.',
    'Talk about one goal for this school week.'
  ],
  travel: [
    'Ask for directions to the train station.',
    'Explain what you pack for a weekend trip.',
    'Describe your dream city to visit.'
  ],
  shopping: [
    'Ask about the price of a jacket and available sizes.',
    'Return an item politely and explain the problem.',
    'Compare two products and choose one.'
  ],
  work: [
    'Introduce yourself on your first day at a new job.',
    'Ask a coworker to clarify a task.',
    'Explain how you organize your daily work plan.'
  ],
  hobbies: [
    'Describe a hobby you do every week.',
    'Invite a friend to join your hobby this weekend.',
    'Explain what a beginner needs to start your hobby.'
  ]
}

const FLASHCARDS = [
  { word: 'commute', meaning: 'to travel regularly between home and school/work' },
  { word: 'affordable', meaning: 'not too expensive; reasonably priced' },
  { word: 'recommend', meaning: 'to suggest something as a good choice' },
  { word: 'confident', meaning: 'feeling sure about your ability' },
  { word: 'schedule', meaning: 'a plan of activities and times' }
]

const ROLEPLAY_SCENARIOS = [
  {
    title: 'Coffee Shop Order',
    situation: 'You are ordering a drink and snack after class.',
    partnerPersona: 'Friendly barista who speaks clearly and asks follow-up questions.',
    phrases: ['Could I have...', 'What do you recommend?', 'That sounds great, thank you.'],
    partnerLines: [
      'Hi! Welcome. What would you like today?',
      'Great choice. Would you like it hot or iced?',
      'Anything else before I prepare your order?'
    ]
  },
  {
    title: 'School Project Partner',
    situation: 'You and a classmate are planning a short presentation.',
    partnerPersona: 'Supportive classmate who likes clear teamwork.',
    phrases: ['Let\'s divide the tasks.', 'I can handle the introduction.', 'Can we practice once more?'],
    partnerLines: [
      'When should we start working on the project?',
      'Which part do you want to present?',
      'Can we review the final version together tomorrow?'
    ]
  }
]

const STORAGE_KEY = 'english-practice-mvp-progress'

const getToday = () => new Date().toISOString().slice(0, 10)

const getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

const defaultProgress = {
  level: 'beginner',
  streak: 0,
  practicedItems: 0,
  todayCount: 0,
  dailyGoal: 5,
  completedActivities: [],
  lastPracticeDate: null
}

const readStoredProgress = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return { progress: defaultProgress, error: '' }
    }

    return {
      progress: { ...defaultProgress, ...JSON.parse(saved) },
      error: ''
    }
  } catch {
    return {
      progress: defaultProgress,
      error: 'We could not load your saved progress. You can continue with fresh progress.'
    }
  }
}

function App() {
  const [initialStorageState] = useState(() => readStoredProgress())
  const [progress, setProgress] = useState(initialStorageState.progress)
  const [category, setCategory] = useState('greetings')
  const [promptIndex, setPromptIndex] = useState(0)
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flashcardRevealed, setFlashcardRevealed] = useState(false)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [partnerLineIndex, setPartnerLineIndex] = useState(0)
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true)
  const [storageError, setStorageError] = useState(initialStorageState.error)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoadingPrompt(false), 350)
    return () => window.clearTimeout(timer)
  }, [category])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const currentPrompts = PROMPTS_BY_CATEGORY[category] ?? []
  const currentPrompt = currentPrompts[promptIndex % (currentPrompts.length || 1)]
  const currentCard = FLASHCARDS[flashcardIndex]
  const currentScenario = ROLEPLAY_SCENARIOS[scenarioIndex]
  const currentPartnerLine = currentScenario?.partnerLines?.[partnerLineIndex]

  const goalPercent = Math.min(100, Math.round((progress.todayCount / progress.dailyGoal) * 100))

  const totalActivities = 3
  const completedCount = useMemo(
    () => new Set(progress.completedActivities).size,
    [progress.completedActivities]
  )

  const registerPractice = (activityKey) => {
    const today = getToday()
    const yesterday = getYesterday()

    setProgress((previous) => {
      const sameDay = previous.lastPracticeDate === today
      const continuedStreak = previous.lastPracticeDate === yesterday

      return {
        ...previous,
        practicedItems: previous.practicedItems + 1,
        todayCount: sameDay ? previous.todayCount + 1 : 1,
        streak: sameDay ? previous.streak : continuedStreak ? previous.streak + 1 : 1,
        completedActivities: previous.completedActivities.includes(activityKey)
          ? previous.completedActivities
          : [...previous.completedActivities, activityKey],
        lastPracticeDate: today
      }
    })
  }

  const handleLevelChange = (event) => {
    const nextLevel = event.target.value
    if (!LEVELS.includes(nextLevel)) {
      return
    }
    setProgress((previous) => ({ ...previous, level: nextLevel }))
  }

  const handleNextPrompt = () => {
    if (!currentPrompts.length) return
    setPromptIndex((index) => (index + 1) % currentPrompts.length)
    registerPractice('conversation')
  }

  const handleRevealCard = () => {
    setFlashcardRevealed(true)
    registerPractice('flashcards')
  }

  const moveToNextCard = () => {
    setFlashcardRevealed(false)
    setFlashcardIndex((index) => (index + 1) % FLASHCARDS.length)
  }

  const handleNeedPractice = () => {
    registerPractice('flashcards')
    moveToNextCard()
  }

  const handleKnow = () => {
    registerPractice('flashcards')
    moveToNextCard()
  }

  const handleNextRoleplayStep = () => {
    if (!currentScenario) return
    setPartnerLineIndex((index) =>
      index + 1 >= currentScenario.partnerLines.length ? 0 : index + 1
    )
    registerPractice('roleplay')
  }

  const resetProgress = () => {
    setStorageError('')
    setProgress(defaultProgress)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">My Agency for English Language</p>
        <h1>Your everyday English practice partner</h1>
        <p className="hero-copy">
          Practice real-life English with guided conversations, quick vocabulary review, and role-play.
          Everything saves in your browser so you can continue anytime.
        </p>
        <button type="button" className="cta" onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })}>
          Start today&apos;s practice
        </button>
      </header>

      <section className="dashboard" aria-label="Progress dashboard">
        <div className="dashboard-card">
          <h2>Daily goal</h2>
          <p>
            {progress.todayCount} / {progress.dailyGoal} practice steps
          </p>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${goalPercent}%` }}></div>
          </div>
          <p className="microcopy" aria-live="polite">
            {goalPercent >= 100 ? 'Great work! Goal complete.' : `${goalPercent}% complete`}
          </p>
        </div>

        <div className="dashboard-card">
          <h2>Learning profile</h2>
          <label htmlFor="level" className="microcopy">Selected level</label>
          <select id="level" value={progress.level} onChange={handleLevelChange}>
            {LEVELS.map((item) => (
              <option key={item} value={item}>
                {item[0].toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
          <p className="microcopy">Streak: {progress.streak} day(s)</p>
          <p className="microcopy">Total practiced items: {progress.practicedItems}</p>
          <p className="microcopy">Activities completed: {completedCount}/{totalActivities}</p>
        </div>
      </section>

      {storageError ? (
        <section className="state-panel" role="alert">
          <h2>Progress load issue</h2>
          <p>{storageError}</p>
          <button type="button" onClick={resetProgress}>Reset local progress</button>
        </section>
      ) : null}

      <section id="activities" className="activities" aria-label="Practice activities">
        <article className="panel">
          <h2>1) Daily conversation prompts</h2>
          <p className="microcopy">Choose a category and practice speaking naturally.</p>
          <div className="chip-row" role="group" aria-label="Prompt categories">
            {Object.keys(PROMPTS_BY_CATEGORY).map((item) => (
              <button
                type="button"
                key={item}
                className={item === category ? 'chip active' : 'chip'}
                onClick={() => {
                  setCategory(item)
                  setPromptIndex(0)
                  setIsLoadingPrompt(true)
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {isLoadingPrompt ? (
            <div className="state-panel"><p>Loading prompt...</p></div>
          ) : currentPrompt ? (
            <>
              <p className="prompt-text">{currentPrompt}</p>
              <button type="button" onClick={handleNextPrompt}>Next prompt</button>
            </>
          ) : (
            <div className="state-panel" role="status">
              <p>No prompts in this category yet.</p>
            </div>
          )}
        </article>

        <article className="panel">
          <h2>2) Vocabulary flashcards</h2>
          <p className="microcopy">Reveal meaning, then choose what you need next.</p>
          {currentCard ? (
            <>
              <p className="flash-word">{currentCard.word}</p>
              <p className="flash-meaning">{flashcardRevealed ? currentCard.meaning : 'Tap reveal to check the meaning.'}</p>
              <div className="row-actions">
                <button type="button" onClick={handleRevealCard}>Reveal</button>
                <button type="button" onClick={handleKnow}>Know it</button>
                <button type="button" onClick={handleNeedPractice}>Need practice</button>
              </div>
            </>
          ) : (
            <div className="state-panel" role="status">
              <p>No flashcards available yet.</p>
            </div>
          )}
        </article>

        <article className="panel">
          <h2>3) Speaking role-play</h2>
          {currentScenario ? (
            <>
              <label htmlFor="scenario" className="microcopy">Scenario</label>
              <select
                id="scenario"
                value={scenarioIndex}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setScenarioIndex(next)
                  setPartnerLineIndex(0)
                }}
              >
                {ROLEPLAY_SCENARIOS.map((item, index) => (
                  <option key={item.title} value={index}>{item.title}</option>
                ))}
              </select>

              <p className="microcopy"><strong>Situation:</strong> {currentScenario.situation}</p>
              <p className="microcopy"><strong>Partner persona:</strong> {currentScenario.partnerPersona}</p>
              <p className="microcopy"><strong>Suggested phrases:</strong> {currentScenario.phrases.join(' · ')}</p>
              <p className="prompt-text">Partner: “{currentPartnerLine}”</p>
              <button type="button" onClick={handleNextRoleplayStep}>Continue dialogue</button>
            </>
          ) : (
            <div className="state-panel" role="status">
              <p>No role-play scenarios available yet.</p>
            </div>
          )}
        </article>
      </section>
    </main>
  )
}

export default App

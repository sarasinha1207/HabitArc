# HabitArc: Advanced Neural Gamification Tracker

HabitArc is a professional-grade, gamified productivity tracker built to transform daily routines into an engaging, data-driven RPG experience. Using a high-end sci-fi "Neural Command Center" aesthetic, the platform tracks habits, visualizes long-term consistency via heatmaps, and utilizes smart data insights to optimize user performance.

### 🎯 Product Communication (What, Why, How)
* **What**: A premium habit-tracking web application that gamifies consistency through experience points, infinite leveling, and visual data analytics.
* **Why**: Traditional habit trackers lack long-term engagement. HabitArc solves this using behavioral psychology (gamification) and the "Mercy System" to prevent burnout, ensuring users stay motivated even when they falter.
* **How**: Built strictly on the client-side with React, TailwindCSS, and `localStorage` to ensure zero latency, offline capabilities, and maximum data privacy.

### Deployment Link: https://habitarc-psi.vercel.app/
---

<table>
  <tr>
    <td align="center">
      <img width="1000" height="750" alt="Main Habit Dashboard" src="https://github.com/user-attachments/assets/cfa717b4-45a3-490f-add3-aa2b487cafad" />
    </td>
    <td align="center">
      <img width="1000" height="750" alt="Simplified Habit Views" src="https://github.com/user-attachments/assets/c60825b3-5fbc-48a6-b24d-f3090df0be6d" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="1000" height="750" alt="UI Structure and Sidebar" src="https://github.com/user-attachments/assets/b9b2e231-a750-4f16-8153-2b81462ddec6" />
    </td>
    <td align="center">
      <img width="1000" height="750" alt="Habit List (Inactive State)" src="https://github.com/user-attachments/assets/e641422f-a508-4579-9014-4f635d85e764" />
    </td>
  </tr>
</table>

---

## 🚀 Features & Architecture

* **Dynamic Quest Engine**: Create, edit, and track both Daily and Weekly habits (Neural Pathways).
* **Infinite Progression System**: An uncapped leveling system driven by an exponential XP curve. 
* **Global Ranking & Badges**: Unlock rich achievements (7-Day Streak, Perfect Day) and track your standing against 50+ dummy leaderboard archetypes.
* **Smart Insights Dashboard**: Data visualization using Recharts to display Weekly Completion Rates, Peak Performance Days, and Success Velocity.
* **Persistent Heatmap**: A GitHub-style contribution graph providing a visual archive of your daily momentum.
* **Secure Data Backup System**: 100% local operation with integrated JSON export/import for cross-device persistence without a backend.

---

## ⚙️ How It Was Made

HabitArc is built strictly as a client-side application using cutting-edge frontend technologies. **No backend or paid APIs are utilized, ensuring maximum privacy and zero operational costs.**

### Tech Stack
* **Core**: React 18, React Router v6
* **Styling**: TailwindCSS (with native arbitrary values and custom color scales like Emerald/Cyan/Orange)
* **Icons & UI**: Lucide React, React Circular Progressbar
* **Data Visualization**: Recharts, React Calendar Heatmap
* **State Management**: React `useOutletContext` combined with pure browser `localStorage`.

---

## 📂 File Structure

```text
HabitArc-Antigravity/
├── src/
│   ├── components/
│   │   └── Layout.jsx         # Central Global State Provider & Sidebar Navigation
│   ├── pages/
│   │   ├── Home.jsx           # Daily/Weekly Tasks & Historical Archive
│   │   ├── Dashboard.jsx      # Smart Insights & Performance Archetype Charts
│   │   ├── Profile.jsx        # Progression, Recent Badges, & Mercy Skip Log
│   │   ├── Heatmap.jsx        # Visual Contribution Graph
│   │   ├── Ranks.jsx          # Dummy Global Leaderboard
│   │   └── Help.jsx           # System Documentation & FAQs
│   ├── App.jsx                # Router Configuration
│   ├── index.css              # Global Tailwind Styles & Custom Glassmorphism
│   └── main.jsx               # React Entry Point
```

---

## 📊 Category & Experience Distribution System

HabitArc utilizes a fixed, difficulty-based XP distribution model. Completing tasks grants experience points that drive the infinite leveling engine. 

### Categories
Every habit must fall into one of three pillars of personal development:
* **Physical** (e.g., Hydration, Conditioning)
* **Cognitive** (e.g., Meditation, Deep Work, Reading)
* **Metabolic** (e.g., Nutrition, Sleep Protocol)

### XP Yields
* **Beginner**: +15 XP
* **Intermediate**: +30 XP
* **Advanced**: +50 XP
* **Streak Bonus**: +50 XP bonus for every 7 consecutive days maintaining a specific habit.

<table>
  <tr>
    <td align="center">
      <img width="1000" height="750" alt="Main Habit Dashboard" src="https://github.com/user-attachments/assets/e58d9beb-3757-47bc-a07e-8b615e57b09e" />
    </td>
    <td align="center">
      <img width="1000" height="750" alt="Simplified Habit Views" src="https://github.com/user-attachments/assets/a6c57eee-14c2-44f5-ac77-ad04fed5832a" />
    </td>
  </tr>
</table>
---


## 🛡️ The Mercy System

Consistency is critical, but burnout is real. HabitArc features a "Mercy System" to protect your psychological momentum.

* **What it is**: A tactical "Skip Day" that protects your streak multipliers when you are unable to complete your daily pathways.
* **How to use it**: Navigate to your **Profile** and access **Recovery Mode**. Activating a Mercy Skip will freeze your streak for the day without breaking it.
* **Skip Log**: Every deployment of a Mercy Shield is permanently documented in the **Mercy Skip Log** at the bottom of your Profile, ensuring you remain accountable for your tactical rests.

---

## ⚠️ Dummy Data Notice

Because this is a local-first application designed to showcase high-end UI/UX, the system relies on carefully curated **Dummy Data** for certain features:
* **Global Ranks**: The leaderboard is populated with 60+ generated players to simulate a competitive environment. Your rank is fixed at #1,204.
* **Dashboard Charts**: The Line Chart data for Physical, Cognitive, and Metabolic progression utilizes dummy data arrays to render the complex visual layout.
* **Historical Skip Log**: Pre-populated with dummy emergency dates upon initial boot to demonstrate UI functionality.
* **Badges**: To display the UI elements accurately, the initial state is hydrated with 64 hidden achievements and a few explicit dummy recent badges.

---

## 🌐 Future Launch Plans

A dedicated promotional landing website for **HabitArc** is currently in the planning phase. This marketing site will serve as the official launchpad for the Habit Tracker product, featuring interactive demos of the Dashboard, detailed feature breakdowns, and a direct portal to initialize the web application. Stay tuned for the deployment sequence!

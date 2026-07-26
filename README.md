# 🚀 KanbanPulse — Type-Safe Task Management Board

**TypeFlow** is a responsive, modern Kanban-style task management application built with **React**, **TypeScript**, and **Tailwind CSS**. It provides a sleek user interface to organize tasks into columns, manage priorities, and automatically persist state locally using custom React hooks.

**Live Demo:** [https://kanban-pulse.vercel.app]
---

##  Features

-  **TypeFlow Workflow:** Drag/move tasks seamlessly across `To Do`, `In Progress`, and `Completed` status columns.
-  **Priority Management:** Assign and filter tasks by priority levels (`Low`, `Medium`, `High`).
-  **Real-Time Search & Filtering:** Instantly search through task titles and descriptions.
-  **State Persistence:** Custom generic hook syncs tasks with browser `localStorage` so data isn't lost on refresh.
-  **Fully Responsive UI:** Optimized layout tailored for both desktop and mobile screens.

---

## Tech Stack & Architecture

- **Frontend:** React 18, Vite
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Icons & Theme:** Custom SVG & Clean UI Design

---

##  Key TypeScript Concepts Demonstrated

This project was built to showcase clean, scalable TypeScript practices:

1. **Strict Unions & Type Schemas (`src/types/task.ts`):** 
   - Utilized strict union types (`Priority`, `Status`) to avoid arbitrary string bugs.
   - Distinct interfaces (`Task`, `CreateTaskInput`) to cleanly handle payload creations vs stored data.

2. **Generic Custom Hook (`src/hooks/useLocalStorage.ts`):**
   - Implemented a reusable `<T>` generic hook for type-safe state synchronization with `localStorage`.

3. **Event & Type-Only Imports (`verbatimModuleSyntax`):**
   - Adhered to modern TS module resolution using `import type` syntax.
   - Enforced type assertions and strict event handling for forms (`React.FormEvent`, `React.ChangeEvent`).

---

##  Project Structure

```text
Typeflow/
├── src/
│   ├── types/               # TypeScript Interfaces and Union Types
│   │   └── task.ts
│   ├── hooks/               # Generic Custom React Hooks
│   │   └── useLocalStorage.ts
│   ├── components/          # Modular React Components
│   │   ├── TaskCard.tsx
│   │   ├── Column.tsx
│   │   └── TaskModal.tsx
│   ├── App.tsx              # Main State Assembly & Layout
│   ├── main.tsx
│   └── index.css            # Tailwind Directives & Custom Resets
├── package.json
├── tsconfig.json
└── README.md
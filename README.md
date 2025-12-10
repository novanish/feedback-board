# Feedback Board

A modern, full-stack feedback management system built with **Next.js**, **TypeScript**, and **Prisma**. Users can create, view, edit, and upvote feedback items. The project leverages **Tailwind CSS**, **Shadcn UI**, and **React Query** for a responsive and interactive experience.

---

## Features

- Create, view, edit, and upvote feedback items
- Responsive and accessible UI using **Shadcn UI** components
- Infinite loading of feedback items with **React Query**
- Form validation with **React Hook Form** and **Zod**
- Optimistic updates for smooth user experience
- Persistent database using **Prisma** + SQLite
- TailwindCSS for styling

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** SQLite (via Prisma)
- **State Management & Data Fetching:** React Query (supports infinite loading)
- **Form Handling & Validation:** React Hook Form, Zod
- **UI Components:** Shadcn UI

---

## Getting Started

### Prerequisites

- Node.js v20+
- bun or npm

### Setup

1. **Clone the repository and install dependencies**
```bash
git clone https://github.com/novanish/feedback-board.git
cd feedback-board
bun install # or npm install

```

2. **Create a `.env` file**
```bash
cp .env.example .env
```

3. **Set up the database**
```bash
bun db:generate # or npm run db:generate
bun db:migrate:dev  # or npm run db:migrate:dev
bun db:seed # or npm run db:seed
```

4. **Run the development server**
```bash
bun dev # or npm run dev
```

### Known Issues

- **Optimistic upvotes do not sync across filters**

  On the Feedback List page, when a user upvotes a feedback item, the optimistic update only applies to the currently active filter (e.g., `Open`). However, other cached filters such as `All` do not get updated.

  **Example:**  
  If a user is on the **Open** filter and upvotes a feedback item, the optimistic cache updates correctly for **Open**, but the **All** filter still shows the old upvote count. This results in inconsistent UI between different filtered views.


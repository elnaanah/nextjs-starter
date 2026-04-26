# Aura AI — Chat Interface

A complete, professional AI chat UI built with **Next.js 15**, TypeScript, and Tailwind CSS v4.

## Features

- 🌙 **Dark / Light mode** toggle
- 💬 **Collapsible sidebar** with chat history
- ⚡ **Typing indicator** with animation
- 🎨 **Fully styled** with CSS variables design system
- 📱 **Responsive** — works on mobile and desktop
- 🔢 **Token counter** in the top bar
- 🤖 **Model switcher** (Aura 3.5 Ultra, Sonnet, Flash, Vision)
- ✨ **Empty state** with quick suggestion prompts

## Tech Stack

| Tool | Version |
|---|---|
| Next.js | 15.3.1 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| lucide-react | latest |

## Getting Started

```bash
git clone https://github.com/elnaanah/nextjs-starter.git
cd nextjs-starter
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + fonts
│   ├── page.tsx          # Entry point
│   └── globals.css       # Design tokens + base styles
├── components/
│   ├── ChatLayout.tsx    # Main orchestrator
│   ├── Sidebar.tsx       # Chat history sidebar
│   ├── TopBar.tsx        # Header with model selector
│   ├── Messages.tsx      # Message list + empty state
│   └── InputArea.tsx     # Textarea + send button
├── types/
│   └── chat.ts           # TypeScript interfaces
└── lib/
    └── responses.ts      # Demo AI responses
```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/elnaanah/nextjs-starter)

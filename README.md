# Next.js Starter

A modern **Next.js 15** starter project with:

- ⚡ **Next.js 15** – App Router
- 🦾 **TypeScript** – Type-safe code
- 🎨 **Tailwind CSS v4** – Utility-first styling
- 🔍 **ESLint** – Code linting
- 📦 **React 19** – Latest React

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/elnaanah/nextjs-starter.git
cd nextjs-starter
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
nextjs-starter/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout with fonts & metadata
│       ├── page.tsx        # Home page
│       └── globals.css     # Global styles + Tailwind
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs      # PostCSS configuration
└── package.json
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

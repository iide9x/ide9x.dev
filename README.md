# ide9x.dev

Personal security-research blog for **ide9x (DestroyerX / Ahmed)**.
Next.js (static export) + Tailwind CSS, terminal/green theme, deployed free on GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Write a new post

Drop a markdown file in `content/posts/`, e.g. `content/posts/my-ssrf.md`:

```md
---
title: "My SSRF writeup"
date: "2026-06-15"
tags: ["ssrf", "writeup"]
excerpt: "Short summary shown on the homepage."
---

Your markdown content here...
```

It appears on the homepage automatically (newest first). Filename = URL slug
(`/blog/my-ssrf/`).

## Edit your details

All name/handle/social links live in **`src/lib/config.ts`** — edit that one file.

## Build (static export)

```bash
npm run build    # outputs static site to ./out
```

## Deploy

Pushing to the `main` branch triggers `.github/workflows/deploy.yml`, which
builds and deploys to GitHub Pages. The custom domain `ide9x.dev` is set via
`public/CNAME`.

### One-time GitHub setup

1. Create a public repo and push this folder.
2. Repo → **Settings → Pages → Source → GitHub Actions**.
3. Add DNS records at name.com (see below).
4. Repo → Settings → Pages → set custom domain to `ide9x.dev`, enable **Enforce HTTPS**.

### DNS records (name.com)

| Type  | Host | Value                    |
|-------|------|--------------------------|
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
| CNAME | www  | YOURUSERNAME.github.io   |

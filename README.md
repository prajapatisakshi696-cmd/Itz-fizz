# ITZ FIZZ – Scroll-driven Headphone Landing Page

A cinematic, dark, premium hero section where a headphone (pure SVG) reacts directly to scroll position, built with **React + Tailwind CSS + GSAP ScrollTrigger**.

## Features
- Load animation: navbar fade, headline rise, tagline, staggered stats, product scale-in
- Pinned hero with `scrub` ScrollTrigger in 3 stages (reverses naturally on scroll up)
- "MORE THAN JUST SOUND" section with scroll-triggered reveals
- Responsive (desktop → mobile) with shorter scroll distance on phones, no horizontal overflow

## Tech stack
React 18 · Vite · Tailwind CSS v4 · GSAP 3 + ScrollTrigger

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## How the scroll animation works
1. `Hero.jsx` creates one GSAP timeline with a ScrollTrigger: `pin: true`, `scrub: 1`, `end: "+=300%"`.
2. The timeline is split into three 1-unit stages. Because `ease: "none"`, scroll position maps directly to timeline progress:
   - **Stage 1** – product drifts horizontally, tilts slightly, glow shifts
   - **Stage 2** – product grows and rotates more, headline/stats fade out, feature callouts appear
   - **Stage 3** – product moves to centre at largest scale, rotation settles
3. Only `x`, `y`, `scale`, `rotate` and `opacity` are animated (GPU friendly, no layout work).
4. Load animation and scroll animation use **different wrapper elements** (`.intro-*` vs `.scroll-*`) so they never fight over the same transform.
5. `gsap.matchMedia()` swaps the values for mobile; `gsap.context().revert()` cleans everything up on unmount.

## Change the product image
The product is an inline SVG in `src/components/Headphone.jsx`. To use your own image:
1. Put a transparent PNG at `public/headphone.png`.
2. In `Hero.jsx` replace `<Headphone ... />` with:
   ```jsx
   <img src="./headphone.png" alt="ITZ FIZZ headphones" className="w-full drop-shadow-[0_30px_60px_rgba(124,92,255,0.35)]" />
   ```
Nothing else changes.

## Deploy
**Vercel:** push to GitHub → vercel.com → *Add New Project* → import repo → Framework preset *Vite* (build `npm run build`, output `dist`) → Deploy.

**GitHub Pages:** `base: "./"` is already set. Build, then publish `dist`:
```bash
npm run build
npx gh-pages -d dist
```
Then in repo *Settings → Pages* choose the `gh-pages` branch.

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: ITZ FIZZ scroll hero"
git branch -M main
git remote add origin https://github.com/<your-username>/itz-fizz.git
git push -u origin main
```

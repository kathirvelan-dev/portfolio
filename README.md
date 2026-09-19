# Kathir Velan — Portfolio

A one-page, cinematic dark-glassmorphism portfolio with a Three.js 3D hero scene, 3D-tilt project cards, a certificate gallery with lightbox, and a light/dark theme toggle. Pure HTML/CSS/JS — no build step, deploy anywhere.

## Structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── profile.jpg
    ├── Kathir_Velan_Resume.pdf   ← placeholder, replace with your real resume
    └── certs/
        ├── cert-google-genai.jpg
        ├── cert-ibm-python.jpg
        ├── cert-rinex-internship.jpg
        ├── cert-rinex-course.jpg
        ├── cert-saylor-ai.jpg
        └── cert-saylor-swe.jpg
```

## Before you deploy — edit these

1. **Resume** — `assets/Kathir_Velan_Resume.pdf` is a placeholder. Drop your real resume in with the same file name (or change the `href` in the hero's "Download Resume" button in `index.html`).
2. **Contact details** — in `index.html`'s Contact section, replace the placeholder email, phone number, LinkedIn and Instagram links with your real ones.
3. **Project links** — `TitlePro` and `ThinkToTech` currently point at your GitHub profile; update each `<a href>` to the real repo/live link once you have them handy, and tighten up the description text to match what each project actually does.
4. **Contact form** — the form currently just shows a confirmation locally. To make it actually send email, sign up at [emailjs.com](https://www.emailjs.com), then in `js/main.js` uncomment/fill in the `emailjs.sendForm(...)` call with your service ID, template ID and public key, and add the EmailJS CDN script tag to `index.html`.

## Run it locally

No build tools needed — just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/kathirvelan-dev/YOUR-REPO-NAME.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Deploy from branch → main → / (root)**. Your site will be live at `https://kathirvelan-dev.github.io/YOUR-REPO-NAME/`.

## What's built in

- Three.js particle-network hero scene with a rotating wireframe icosahedron, parallax on mouse move
- **Scroll-driven animation (GSAP ScrollTrigger)** — hero text/canvas drift on scroll, about photo scales in and keeps a slow parallax, skill panels and project cards slide into place, and the certificates section pins and scrubs its filmstrip horizontally as you scroll down (on screens ≥860px; falls back to normal horizontal drag-scroll on smaller screens and when `prefers-reduced-motion` is on)
- 3D tilt on project cards (mouse-tracked, CSS transforms) with a cursor-following glow
- Typing effect cycling through your roles
- Scroll progress bar + floating navbar with active-section highlighting
- Loading screen
- Certificate filmstrip gallery with a click-to-expand lightbox
- Project filter (All / Web / AI)
- Light/dark theme toggle (persisted via localStorage)
- Fully responsive, keyboard-focusable, respects `prefers-reduced-motion`

## Tech

Vanilla HTML/CSS/JS + [Three.js](https://threejs.org/) (r128, via CDN). No React/Vite build step — if you'd rather work in React later, the sections in `index.html` map directly onto components (`Hero`, `About`, `Skills`, `Projects`, `Certificates`, `Contact`).

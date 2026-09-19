# Kathir Velan — 3D Interactive Portfolio

A cutting-edge, 3D interactive portfolio inspired by award-winning Wix Studio neo-brutalist and glassmorphic designs. Features real-time Three.js WebGL rendering, eye-tracking dynamic character physics, floating 3D elements, interactive bento accordions, and GSAP scroll-driven animations. Pure HTML/CSS/JS — zero build dependencies, deploy anywhere instantly.

## 🚀 Key Features

- **Interactive 3D Hero Character (Three.js)**:
  - Cursor Gaze Tracking: Eyes with realistic pupils actively follow mouse cursor coordinates in real-time.
  - Smooth Head Motion: Smooth yaw, pitch, and roll rotation responding dynamically to pointer movement.
  - Periodic Eyelid Blinking loop and click reactivity.
  - Stylized 3D hair spikes, ears, and silver hoop earrings matching the reference video.
  - Studio three-point lighting with cyber rim lights (magenta/cyan) for depth and contrast.
  - Idle physics bobbing and GSAP scroll-scrubbed exit.
- **Top Brand & Tech Logo Marquee Strip**:
  - Seamless infinite loop showing Google GenAI, Python, React, Three.js, IBM, Firebase, Node, Express, Tailwind CSS.
- **Visual Bento Showcase**:
  - 3D artworks, generative pipelines, and UI systems in rounded interactive cards.
- **About Me Section with 4 Floating 3D Elements**:
  - 4 WebGL objects with continuous 3D rotation, float physics, and cursor parallax:
    1. Liquid Chrome Inflated Star / Cross
    2. Glossy Red Inflated Heart
    3. Glossy Cobalt Blue Crystal
    4. Glossy Purple Daisy Flower with Golden Center
- **Services Section (High-Contrast White Theme)**:
  - Clean light background matching frames 9-11 of the reference video.
  - Numbered cards (`01` to `05`) with expandable details and interactive hover arrow transitions.
- **Projects Section (Interactive Bento Accordion)**:
  - Dark rounded cards (`01`, `02`, `03`) with chrome outline rings.
  - Expandable accordion on click revealing rich multi-panel Bento layouts and `LIVE PROJECT` buttons.
- **Verified Certifications Gallery**:
  - Interactive showcase of Kathir's real accredited certificates (Google GenAI, IBM Python, Rinex, Saylor) with full-screen modal lightbox.
- **Testimonials Section**:
  - Bento grid of client reviews with floating 3D emoji stickers (`😮`, `✦`, `●`).
- **Contact Section ("LET'S GET IN TOUCH")**:
  - Clean light card container matching frame 19 with direct contact info and functional contact form with status feedback.
- **Footer with Geometric Iconography Ticker**:
  - Massive bold display typography `KATHIR VELAN`.
  - Exact replica of the video's colorful animated geometric shape marquee.

## 📂 Project Structure

```
portfolio/
├── index.html                           ← Main portfolio page
├── css/
│   └── style.css                        ← Complete neo-brutalist & glassmorphic styling
├── js/
│   └── main.js                          ← Three.js 3D scenes, eye tracking, accordions & motion
└── assets/
    ├── profile.jpg                      ← Profile photo
    ├── Kathir_Velan_Resume.pdf          ← Resume file
    └── certs/                           ← Accredited certificates
        ├── cert-google-genai.jpg
        ├── cert-ibm-python.jpg
        ├── cert-rinex-internship.jpg
        ├── cert-rinex-course.jpg
        ├── cert-saylor-ai.jpg
        └── cert-saylor-swe.jpg
```

## 💻 Run Locally

No npm or build tools needed. Simply run:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000/portfolio/](http://localhost:8000/portfolio/) in your browser.

## 🌐 Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "3D portfolio launch matching Wix Studio design"
git branch -M main
git remote add origin https://github.com/kathirvelan-dev/YOUR-REPO-NAME.git
git push -u origin main
```

Then in your repository: **Settings → Pages → Deploy from branch → main → / (root)**.

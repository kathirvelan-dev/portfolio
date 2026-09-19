/* =========================================================
   Kathir Velan — Portfolio interactions
   ========================================================= */

document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Loader ---------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 500);
});

/* ---------- Scroll progress ---------- */
const progressBar = document.getElementById("scroll-progress");
function updateProgress() {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + "%";
}
document.addEventListener("scroll", updateProgress, { passive: true });

/* ---------- Navbar: active link + mobile toggle ---------- */
const navLinks = document.querySelectorAll("#nav-links a");
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}
document.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-links");
navToggle.addEventListener("click", () => navList.classList.toggle("open"));
navLinks.forEach((a) => a.addEventListener("click", () => navList.classList.remove("open")));

/* ---------- Theme toggle ---------- */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("kv-theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  if (next === "dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  localStorage.setItem("kv-theme", next);
});

/* ---------- Typing effect ---------- */
const roles = [
  "Full Stack Developer",
  "AI Enthusiast",
  "UI/UX Designer",
  "CSE Student",
];
const typedEl = document.getElementById("typed");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const word = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
typeLoop();

/* ---------- Reveal on scroll (skill panels, sections) ---------- */
const revealTargets = document.querySelectorAll(".skill-panel, .project-card, .cert-card");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
revealTargets.forEach((el) => revealObserver.observe(el));

/* ---------- Project 3D tilt ---------- */
document.querySelectorAll(".project-card").forEach((card) => {
  const inner = card.querySelector(".project-card-inner");
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;
    inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    inner.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    inner.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  });
  card.addEventListener("mouseleave", () => {
    inner.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

/* ---------- Project filtering ---------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      const show = filter === "all" || tags.includes(filter);
      card.classList.toggle("hidden-card", !show);
    });
  });
});

/* ---------- Certificate lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
document.querySelectorAll(".cert-card").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImg.src = card.dataset.full;
    lightbox.classList.add("open");
  });
});
document.getElementById("lightbox-close").addEventListener("click", () => {
  lightbox.classList.remove("open");
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("open");
});

/* ---------- Contact form (EmailJS-ready stub) ---------- */
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Wire up EmailJS here, e.g.:
  // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
  const btn = e.target.querySelector("button");
  const original = btn.textContent;
  btn.textContent = "Message noted ✓";
  setTimeout(() => (btn.textContent = original), 2200);
  e.target.reset();
});

/* =========================================================
   Scroll-driven animation — GSAP ScrollTrigger
   Images and sections move/scrub as you scroll, like frames
   of a video advancing, instead of just fading in once.
   ========================================================= */
(function scrollCinema() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  gsap.registerPlugin(ScrollTrigger);

  /* Hero: text drifts up and fades as you leave it — parallax, not a hard cut */
  gsap.to(".hero-inner", {
    y: -100,
    opacity: 0.15,
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  gsap.to("#hero-canvas", {
    y: 80,
    ease: "none",
    scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
  });

  /* About: photo scales up into place, badge and copy slide in, then the
     photo keeps a slow continuous parallax drift while the section is in view */
  gsap.from(".about-photo-frame", {
    scale: 0.82, opacity: 0, y: 70, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: "#about", start: "top 78%" },
  });
  gsap.to(".about-photo-frame img", {
    y: -40, ease: "none",
    scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
  });
  gsap.from(".about-badge", {
    x: -40, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out",
    scrollTrigger: { trigger: "#about", start: "top 72%" },
  });
  gsap.from(".about-copy > *", {
    y: 26, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
    scrollTrigger: { trigger: "#about", start: "top 72%" },
  });

  /* Skills: panels rise into place with a slight stagger by column */
  gsap.utils.toArray(".skill-panel").forEach((panel, i) => {
    gsap.from(panel, {
      y: 46, opacity: 0, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.06,
      scrollTrigger: { trigger: panel, start: "top 88%" },
    });
  });

  /* Projects: cards slide in from alternating sides with a slight scale-up,
     so the grid feels like it's assembling as you scroll past it */
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      x: i % 2 === 0 ? -70 : 70,
      opacity: 0,
      scale: 0.94,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: card, start: "top 90%" },
    });
  });

  /* Certificates: pin the section and scrub the filmstrip horizontally as the
     user scrolls down — the certificates "play" past like video frames.
     Falls back to native touch/scroll drag on small screens. */
  function setupCertScrub() {
    const wrap = document.querySelector(".cert-track-wrap");
    const track = document.querySelector(".cert-track");
    const section = document.getElementById("certificates");
    if (!wrap || !track || !section || window.innerWidth < 860) {
      track && track.classList.remove("gsap-driven");
      return;
    }
    track.classList.add("gsap-driven");
    gsap.set(track, { x: 0 });

    const distance = () => Math.max(track.scrollWidth - wrap.clientWidth, 0);

    ScrollTrigger.create({
      id: "cert-scrub",
      trigger: section,
      start: "top top",
      end: () => "+=" + (distance() + window.innerHeight * 0.4),
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.set(track, { x: -self.progress * distance() });
      },
    });
  }
  setupCertScrub();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.getById("cert-scrub") && ScrollTrigger.getById("cert-scrub").kill();
      document.querySelector(".cert-track")?.classList.remove("gsap-driven");
      setupCertScrub();
      ScrollTrigger.refresh();
    }, 250);
  });
})();

/* =========================================================
   3D Hero — Three.js particle network
   ========================================================= */
(function heroScene() {
  const canvas = document.getElementById("hero-canvas");
  if (!window.THREE || !canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const isMobile = window.innerWidth < 700;
  const count = isMobile ? 90 : 220;
  const range = 120;

  const positions = new Float32Array(count * 3);
  const velocities = [];
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * range;
    positions[i * 3 + 1] = (Math.random() - 0.5) * range * 0.6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * range * 0.5;
    velocities.push({
      x: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 0.03,
      z: (Math.random() - 0.5) * 0.03,
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x5ee6d0,
    size: 1.1,
    transparent: true,
    opacity: 0.85,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Connecting lines between nearby points
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7c6cff, transparent: true, opacity: 0.12 });
  const lineGeometry = new THREE.BufferGeometry();
  const maxLines = count * 3;
  const linePositions = new Float32Array(maxLines * 6);
  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSegments);

  // Center icosahedron wireframe — the single orchestrated 3D moment
  const icoGeo = new THREE.IcosahedronGeometry(14, 1);
  const icoMat = new THREE.MeshBasicMaterial({ color: 0x5ee6d0, wireframe: true, transparent: true, opacity: 0.18 });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  scene.add(ico);

  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function updateLines() {
    let idx = 0;
    const linkDist = isMobile ? 16 : 20;
    for (let i = 0; i < count && idx < maxLines; i++) {
      for (let j = i + 1; j < count && idx < maxLines; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < linkDist) {
          linePositions[idx * 6] = positions[i * 3];
          linePositions[idx * 6 + 1] = positions[i * 3 + 1];
          linePositions[idx * 6 + 2] = positions[i * 3 + 2];
          linePositions[idx * 6 + 3] = positions[j * 3];
          linePositions[idx * 6 + 4] = positions[j * 3 + 1];
          linePositions[idx * 6 + 5] = positions[j * 3 + 2];
          idx++;
        }
      }
    }
    lineGeometry.setDrawRange(0, idx * 2);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.attributes.position.needsUpdate = true;
  }

  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i].x;
      positions[i * 3 + 1] += velocities[i].y;
      positions[i * 3 + 2] += velocities[i].z;
      if (Math.abs(positions[i * 3]) > range / 2) velocities[i].x *= -1;
      if (Math.abs(positions[i * 3 + 1]) > range * 0.3) velocities[i].y *= -1;
      if (Math.abs(positions[i * 3 + 2]) > range * 0.25) velocities[i].z *= -1;
    }
    geometry.attributes.position.needsUpdate = true;

    if (frame % 3 === 0) updateLines();

    ico.rotation.y += 0.0018;
    ico.rotation.x += 0.0009;

    targetRotX += (mouseY * 0.15 - targetRotX) * 0.03;
    targetRotY += (mouseX * 0.2 - targetRotY) * 0.03;
    scene.rotation.x = targetRotX;
    scene.rotation.y = targetRotY;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

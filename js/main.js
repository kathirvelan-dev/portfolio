/* =========================================================
   Kathir Velan — 3D Portfolio Interactive Engine
   Three.js 3D Head + Floating 3D Elements + GSAP Motion
   ========================================================= */

(function initPortfolio() {
  'use strict';

  // Update Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     1. PRELOADER & SCROLL PROGRESS
     --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('loaded');
    }, 450);
  });

  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  /* ---------------------------------------------------------
     2. CURSOR GLOW
     --------------------------------------------------------- */
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursorGlow() {
    if (cursorGlow) {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(renderCursorGlow);
  }
  renderCursorGlow();

  /* ---------------------------------------------------------
     3. THREE.JS: HERO 3D CHARACTER HEAD (Exact Video Replica)
     Features:
     - Real-time Cursor Gaze Tracking (Eyes & Pupils follow mouse)
     - Smooth Head Rotation (Yaw / Pitch)
     - Animated Eyelid Blinking
     - Stylized 3D Hair, Ears & Silver Earrings
     - Studio Three-Point Lighting + Cyber Rim Lights
     - Floating Physics Bobbing
     --------------------------------------------------------- */
  (function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !window.THREE) return;

    const container = document.getElementById('hero-3d-wrapper');
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key front light
    const keyLight = new THREE.DirectionalLight(0xfff1e6, 1.2);
    keyLight.position.set(4, 6, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Warm fill light
    const fillLight = new THREE.DirectionalLight(0xffd1ba, 0.6);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    // Neon Rim Lights (Pink/Purple and Cyan) for cinematic Wix Studio glow
    const rimLightPink = new THREE.PointLight(0xec4899, 2.5, 20);
    rimLightPink.position.set(-5, 4, -4);
    scene.add(rimLightPink);

    const rimLightCyan = new THREE.PointLight(0x38bdf8, 2.0, 20);
    rimLightCyan.position.set(5, -2, -4);
    scene.add(rimLightCyan);

    // Character Hierarchical Model
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    const headGroup = new THREE.Group();
    characterGroup.add(headGroup);

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf5cfb8,
      roughness: 0.45,
      metalness: 0.05
    });

    const darkHairMat = new THREE.MeshStandardMaterial({
      color: 0x1f1916,
      roughness: 0.65,
      metalness: 0.1
    });

    const chromeEarringMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1
    });

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const irisMat = new THREE.MeshStandardMaterial({ color: 0x2b1d14, roughness: 0.2 });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lipMat = new THREE.MeshStandardMaterial({ color: 0xc9756b, roughness: 0.4 });

    // 1. Head Base
    const headGeo = new THREE.SphereGeometry(1.9, 32, 32);
    headGeo.scale(1.0, 1.18, 0.96);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    headGroup.add(headMesh);

    // 2. Neck
    const neckGeo = new THREE.CylinderGeometry(0.72, 0.88, 1.6, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMat);
    neckMesh.position.set(0, -2.1, -0.15);
    neckMesh.castShadow = true;
    headGroup.add(neckMesh);

    // 3. Stylized Hair (Multi-spike anime/modern style)
    const hairCapGeo = new THREE.SphereGeometry(2.02, 28, 28);
    hairCapGeo.scale(1.02, 1.15, 0.95);
    const hairCap = new THREE.Mesh(hairCapGeo, darkHairMat);
    hairCap.position.set(0, 0.22, -0.22);
    headGroup.add(hairCap);

    // Spikes/Tufts array
    const hairTufts = [
      { pos: [0, 2.3, 0.2], scale: [0.75, 1.4, 0.65], rot: [-0.3, 0, 0] },
      { pos: [-0.65, 2.1, 0.35], scale: [0.65, 1.3, 0.55], rot: [-0.25, 0.3, 0.35] },
      { pos: [0.65, 2.1, 0.35], scale: [0.65, 1.3, 0.55], rot: [-0.25, -0.3, -0.35] },
      { pos: [-1.2, 1.7, 0.4], scale: [0.55, 1.1, 0.5], rot: [0, 0.4, 0.6] },
      { pos: [1.2, 1.7, 0.4], scale: [0.55, 1.1, 0.5], rot: [0, -0.4, -0.6] },
      { pos: [0, 1.9, 1.2], scale: [0.6, 0.9, 0.5], rot: [0.5, 0, 0] },
      { pos: [-0.5, 1.8, 1.1], scale: [0.5, 0.8, 0.45], rot: [0.5, 0.2, 0.2] },
      { pos: [0.5, 1.8, 1.1], scale: [0.5, 0.8, 0.45], rot: [0.5, -0.2, -0.2] },
      { pos: [-1.4, 0.5, 0.2], scale: [0.45, 1.0, 0.4], rot: [0, 0, 0.7] },
      { pos: [1.4, 0.5, 0.2], scale: [0.45, 1.0, 0.4], rot: [0, 0, -0.7] }
    ];

    hairTufts.forEach(tuft => {
      const coneGeo = new THREE.ConeGeometry(0.7, 1.6, 7);
      const mesh = new THREE.Mesh(coneGeo, darkHairMat);
      mesh.position.set(tuft.pos[0], tuft.pos[1], tuft.pos[2]);
      mesh.scale.set(tuft.scale[0], tuft.scale[1], tuft.scale[2]);
      mesh.rotation.set(tuft.rot[0], tuft.rot[1], tuft.rot[2]);
      mesh.castShadow = true;
      headGroup.add(mesh);
    });

    // 4. Ears & Silver Hoops (Exact match to video frames)
    const earGeo = new THREE.SphereGeometry(0.48, 16, 16);
    earGeo.scale(0.4, 0.9, 0.5);

    const leftEar = new THREE.Mesh(earGeo, skinMat);
    leftEar.position.set(-1.95, -0.05, -0.1);
    leftEar.rotation.set(0, 0.2, -0.15);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, skinMat);
    rightEar.position.set(1.95, -0.05, -0.1);
    rightEar.rotation.set(0, -0.2, 0.15);
    headGroup.add(rightEar);

    // Silver Hoop Earrings
    const hoopGeo = new THREE.TorusGeometry(0.24, 0.045, 16, 32);
    const leftHoop = new THREE.Mesh(hoopGeo, chromeEarringMat);
    leftHoop.position.set(-2.02, -0.42, -0.08);
    leftHoop.rotation.set(0, 1.57, 0);
    headGroup.add(leftHoop);

    const rightHoop = new THREE.Mesh(hoopGeo, chromeEarringMat);
    rightHoop.position.set(2.02, -0.42, -0.08);
    rightHoop.rotation.set(0, 1.57, 0);
    headGroup.add(rightHoop);

    // 5. Stylized 3D Eyes with Gaze Tracking
    const eyeGroup = new THREE.Group();
    headGroup.add(eyeGroup);

    function createEye(isLeft) {
      const eyeContainer = new THREE.Group();
      const xOffset = isLeft ? -0.68 : 0.68;
      eyeContainer.position.set(xOffset, 0.28, 1.56);

      // Sclera
      const scleraGeo = new THREE.SphereGeometry(0.52, 24, 24);
      scleraGeo.scale(1.0, 0.82, 0.65);
      const sclera = new THREE.Mesh(scleraGeo, eyeWhiteMat);
      eyeContainer.add(sclera);

      // Tracking Iris + Pupil Group
      const pupilGroup = new THREE.Group();
      pupilGroup.position.set(0, 0, 0.32);

      const irisGeo = new THREE.CircleGeometry(0.25, 24);
      const iris = new THREE.Mesh(irisGeo, irisMat);
      pupilGroup.add(iris);

      const pupilGeo = new THREE.CircleGeometry(0.14, 24);
      const pupil = new THREE.Mesh(pupilGeo, pupilMat);
      pupil.position.z = 0.01;
      pupilGroup.add(pupil);

      // Specular Reflection Dot
      const lightDotGeo = new THREE.CircleGeometry(0.065, 16);
      const lightDot = new THREE.Mesh(lightDotGeo, highlightMat);
      lightDot.position.set(0.08, 0.08, 0.02);
      pupilGroup.add(lightDot);

      eyeContainer.add(pupilGroup);

      // Eyelid for Blinking
      const eyelidGeo = new THREE.SphereGeometry(0.56, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      eyelidGeo.scale(1.02, 0.86, 0.7);
      const eyelid = new THREE.Mesh(eyelidGeo, skinMat);
      eyelid.position.set(0, 0.08, 0);
      eyelid.rotation.x = -Math.PI * 0.5; // open initially
      eyeContainer.add(eyelid);

      return { container: eyeContainer, pupilGroup, eyelid };
    }

    const leftEyeObj = createEye(true);
    const rightEyeObj = createEye(false);
    eyeGroup.add(leftEyeObj.container);
    eyeGroup.add(rightEyeObj.container);

    // 6. Eyebrows
    const browGeo = new THREE.BoxGeometry(0.72, 0.16, 0.2);
    const leftBrow = new THREE.Mesh(browGeo, darkHairMat);
    leftBrow.position.set(-0.72, 0.95, 1.62);
    leftBrow.rotation.set(-0.1, 0, 0.12);
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, darkHairMat);
    rightBrow.position.set(0.72, 0.95, 1.62);
    rightBrow.rotation.set(-0.1, 0, -0.12);
    headGroup.add(rightBrow);

    // 7. Stylized Nose
    const noseGeo = new THREE.ConeGeometry(0.24, 0.55, 16);
    const nose = new THREE.Mesh(noseGeo, skinMat);
    nose.position.set(0, -0.22, 1.88);
    nose.rotation.x = -0.3;
    headGroup.add(nose);

    // 8. Expressive Smirking Mouth
    const mouthGeo = new THREE.TorusGeometry(0.42, 0.065, 14, 24, Math.PI * 0.75);
    const mouth = new THREE.Mesh(mouthGeo, lipMat);
    mouth.position.set(0.04, -0.85, 1.68);
    mouth.rotation.set(0, 0, -Math.PI * 0.88);
    headGroup.add(mouth);

    // Normalized Mouse Coordinates (-1 to 1)
    let normMouseX = 0;
    let normMouseY = 0;
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;

    window.addEventListener('mousemove', (e) => {
      normMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      normMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Blinking State Machine
    let isBlinking = false;
    let blinkProgress = 0;

    function triggerBlink() {
      if (isBlinking) return;
      isBlinking = true;
      blinkProgress = 0;
    }
    setInterval(triggerBlink, 3800);

    // Click Reactivity
    canvas.addEventListener('click', () => {
      triggerBlink();
      characterGroup.position.y += 0.3;
    });

    // Clock
    const clock = new THREE.Clock();

    function animateHero() {
      requestAnimationFrame(animateHero);
      const elapsed = clock.getElapsedTime();

      // Smooth Head Yaw & Pitch Follow Pointer
      targetHeadRotY = normMouseX * 0.52;
      targetHeadRotX = -normMouseY * 0.38;

      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * 0.08;
      headGroup.rotation.z = -normMouseX * 0.08;

      // Dynamic Eye Pupils Tracking (Looks directly at the cursor)
      const maxPupilOffset = 0.16;
      const targetPupilX = THREE.MathUtils.clamp(normMouseX * 0.22, -maxPupilOffset, maxPupilOffset);
      const targetPupilY = THREE.MathUtils.clamp(normMouseY * 0.18, -maxPupilOffset, maxPupilOffset);

      leftEyeObj.pupilGroup.position.x += (targetPupilX - leftEyeObj.pupilGroup.position.x) * 0.15;
      leftEyeObj.pupilGroup.position.y += (targetPupilY - leftEyeObj.pupilGroup.position.y) * 0.15;
      rightEyeObj.pupilGroup.position.x += (targetPupilX - rightEyeObj.pupilGroup.position.x) * 0.15;
      rightEyeObj.pupilGroup.position.y += (targetPupilY - rightEyeObj.pupilGroup.position.y) * 0.15;

      // Blinking
      if (isBlinking) {
        blinkProgress += 0.15;
        const eyelidRot = Math.sin(blinkProgress) * (Math.PI * 0.55);
        leftEyeObj.eyelid.rotation.x = -Math.PI * 0.5 + eyelidRot;
        rightEyeObj.eyelid.rotation.x = -Math.PI * 0.5 + eyelidRot;

        if (blinkProgress >= Math.PI) {
          isBlinking = false;
          leftEyeObj.eyelid.rotation.x = -Math.PI * 0.5;
          rightEyeObj.eyelid.rotation.x = -Math.PI * 0.5;
        }
      }

      // Idle Floating Bobbing
      characterGroup.position.y = Math.sin(elapsed * 2.2) * 0.14;

      renderer.render(scene, camera);
    }
    animateHero();

    // Responsive Canvas Resize
    window.addEventListener('resize', () => {
      const newWidth = container.clientWidth || 800;
      const newHeight = container.clientHeight || 520;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // Scroll Scrubbing with GSAP: As user scrolls down, character lifts and moves back
    if (window.gsap && window.ScrollTrigger) {
      gsap.to(characterGroup.position, {
        y: 4.5,
        z: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
      gsap.to(characterGroup.scale, {
        x: 0.7,
        y: 0.7,
        z: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }
  })();

  /* ---------------------------------------------------------
     4. THREE.JS: ABOUT SECTION 4 FLOATING 3D ELEMENTS (Video Frame 7)
     1. Chrome / Liquid metallic inflated cross/star (top-left)
     2. Inflated glossy red heart (bottom-left)
     3. Glossy cobalt blue crystal (top-right)
     4. Glossy purple daisy flower (bottom-right)
     --------------------------------------------------------- */
  (function initAbout3D() {
    const canvas = document.getElementById('about-canvas');
    if (!canvas || !window.THREE) return;

    const container = canvas.parentElement;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 10, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2.0, 30);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 1. Chrome Liquid Star (Top-Left)
    const chromeGroup = new THREE.Group();
    chromeGroup.position.set(-8.5, 4.5, 0);

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.98,
      roughness: 0.08,
      envMapIntensity: 2.0
    });

    // Sculpt 4-pointed puffed chrome star
    const starArmGeo = new THREE.SphereGeometry(1.2, 32, 32);
    starArmGeo.scale(0.55, 1.6, 0.55);
    const starArm1 = new THREE.Mesh(starArmGeo, chromeMat);
    const starArm2 = new THREE.Mesh(starArmGeo, chromeMat);
    starArm2.rotation.z = Math.PI * 0.5;
    const starArm3 = new THREE.Mesh(starArmGeo, chromeMat);
    starArm3.rotation.z = Math.PI * 0.25;
    starArm3.scale.set(0.7, 0.7, 0.7);
    const starArm4 = new THREE.Mesh(starArmGeo, chromeMat);
    starArm4.rotation.z = -Math.PI * 0.25;
    starArm4.scale.set(0.7, 0.7, 0.7);

    chromeGroup.add(starArm1, starArm2, starArm3, starArm4);
    scene.add(chromeGroup);

    // 2. Glossy Red Inflated Heart (Bottom-Left)
    const heartGroup = new THREE.Group();
    heartGroup.position.set(-8.2, -4.2, 0);

    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.15,
      roughness: 0.25
    });

    const heartSphereGeo = new THREE.SphereGeometry(1.0, 28, 28);
    const heartLeft = new THREE.Mesh(heartSphereGeo, heartMat);
    heartLeft.position.set(-0.55, 0.4, 0);
    heartLeft.scale.set(0.9, 1.1, 0.8);

    const heartRight = new THREE.Mesh(heartSphereGeo, heartMat);
    heartRight.position.set(0.55, 0.4, 0);
    heartRight.scale.set(0.9, 1.1, 0.8);

    const heartTipGeo = new THREE.ConeGeometry(1.15, 1.6, 24);
    const heartTip = new THREE.Mesh(heartTipGeo, heartMat);
    heartTip.position.set(0, -0.4, 0);
    heartTip.rotation.z = Math.PI;

    heartGroup.add(heartLeft, heartRight, heartTip);
    heartGroup.scale.set(1.1, 1.1, 1.1);
    scene.add(heartGroup);

    // 3. Glossy Cobalt Blue Crystal (Top-Right)
    const crystalGroup = new THREE.Group();
    crystalGroup.position.set(8.5, 4.8, 0);

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.3,
      roughness: 0.15,
      flatShading: true
    });

    const crystalGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalGroup.add(crystalMesh);
    scene.add(crystalGroup);

    // 4. Glossy Purple Daisy Flower with Golden Center (Bottom-Right)
    const flowerGroup = new THREE.Group();
    flowerGroup.position.set(8.2, -4.2, 0);

    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.1,
      roughness: 0.35
    });

    const centerMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.2,
      roughness: 0.2
    });

    // 8 rounded petals
    const petalGeo = new THREE.SphereGeometry(0.7, 20, 20);
    petalGeo.scale(0.5, 1.2, 0.45);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const petal = new THREE.Mesh(petalGeo, petalMat);
      petal.position.set(Math.cos(angle) * 1.1, Math.sin(angle) * 1.1, 0);
      petal.rotation.z = angle + Math.PI * 0.5;
      flowerGroup.add(petal);
    }

    const centerGeo = new THREE.SphereGeometry(0.75, 24, 24);
    const flowerCenter = new THREE.Mesh(centerGeo, centerMat);
    flowerGroup.add(flowerCenter);
    flowerGroup.scale.set(1.05, 1.05, 1.05);
    scene.add(flowerGroup);

    // Mouse Parallax
    let targetPX = 0;
    let targetPY = 0;
    window.addEventListener('mousemove', (e) => {
      targetPX = (e.clientX / window.innerWidth - 0.5) * 1.8;
      targetPY = -(e.clientY / window.innerHeight - 0.5) * 1.8;
    });

    const clock = new THREE.Clock();

    function animateAbout() {
      requestAnimationFrame(animateAbout);
      const t = clock.getElapsedTime();

      // Continuous 3D rotation & floating bobbing
      chromeGroup.rotation.x = t * 0.5;
      chromeGroup.rotation.y = t * 0.7;
      chromeGroup.position.y = 4.5 + Math.sin(t * 1.8) * 0.4 + targetPY * 0.6;
      chromeGroup.position.x = -8.5 + targetPX * 0.6;

      heartGroup.rotation.y = Math.sin(t * 1.2) * 0.5;
      heartGroup.rotation.z = Math.cos(t * 0.8) * 0.15;
      heartGroup.position.y = -4.2 + Math.cos(t * 1.5) * 0.35 + targetPY * 0.5;
      heartGroup.position.x = -8.2 + targetPX * 0.5;

      crystalGroup.rotation.x = t * 0.6;
      crystalGroup.rotation.y = t * 0.8;
      crystalGroup.position.y = 4.8 + Math.sin(t * 1.6 + 1) * 0.4 + targetPY * 0.7;
      crystalGroup.position.x = 8.5 + targetPX * 0.7;

      flowerGroup.rotation.z = t * 0.35;
      flowerGroup.rotation.x = Math.sin(t * 0.8) * 0.2;
      flowerGroup.position.y = -4.2 + Math.sin(t * 1.4 + 2) * 0.35 + targetPY * 0.5;
      flowerGroup.position.x = 8.2 + targetPX * 0.5;

      renderer.render(scene, camera);
    }
    animateAbout();

    window.addEventListener('resize', () => {
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
  })();

  /* ---------------------------------------------------------
     5. SERVICES SECTION INTERACTION (Frames 9-11)
     --------------------------------------------------------- */
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      serviceItems.forEach(s => s.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ---------------------------------------------------------
     6. PROJECTS BENTO ACCORDION (Frames 13-15)
     Clicking a project card header expands its Bento showcase
     --------------------------------------------------------- */
  const projectCards = document.querySelectorAll('.project-accordion-card');
  projectCards.forEach(card => {
    const header = card.querySelector('.project-card-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        projectCards.forEach(c => c.classList.remove('active'));
        if (!isActive) {
          card.classList.add('active');
        } else {
          card.classList.add('active'); // Keep at least one active for visual impact
        }
      });
    }
  });

  /* ---------------------------------------------------------
     7. CERTIFICATE LIGHTBOX MODAL
     --------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      if (fullSrc && lightbox && lightboxImg) {
        lightboxImg.src = fullSrc;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      if (lightbox) lightbox.classList.remove('open');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox) {
      lightbox.classList.remove('open');
    }
  });

  /* ---------------------------------------------------------
     8. MODERN CONTACT FORM HANDLER
     --------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const feedbackMsg = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>SENDING...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>MESSAGE SENT ✓</span>';
        if (feedbackMsg) {
          feedbackMsg.textContent = 'Thank you! Your message has been noted. Kathir will get back to you shortly.';
        }
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          if (feedbackMsg) feedbackMsg.textContent = '';
        }, 4000);
      }, 1000);
    });
  }

  /* ---------------------------------------------------------
     9. MOBILE NAVIGATION TOGGLE
     --------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '20px';
        navMenu.style.right = '20px';
        navMenu.style.background = 'rgba(18, 18, 20, 0.96)';
        navMenu.style.padding = '24px';
        navMenu.style.borderRadius = '24px';
        navMenu.style.border = '1px solid rgba(255,255,255,0.15)';
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.style.display = 'none';
        }
      });
    });
  }

  /* ---------------------------------------------------------
     10. ACTIVE NAVBAR LINK HIGHLIGHT ON SCROLL
     --------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();

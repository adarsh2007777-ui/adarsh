/**
 * KARMA MINING | µLEARN PRC - OFFICIAL INTERACTIVE ENGINE v2.0
 * Features:
 * - Custom Cursor & Follower Physics
 * - Dynamic Text Rotator
 * - Interactive Arcade Karma Mining Clicker Station
 * - Web Audio API Multi-Tone Synthesizer
 * - 3D Hero Card Tilt & Perspective Reflection
 * - Live Countdown Timer
 * - Interactive Quest Search & Live Filtering
 * - Karma Qualification Progress Simulator (3,000 KP Milestone)
 * - Simulated Live Leaderboard with Real-Time Sync
 * - Volunteer Mentorship Spotlight & Doubt Drawer
 * - Dynamic Holographic Fresher Pass Generator
 * - Floating Quick-Action HUD Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initAudio();
  initTheme();
  initAmbientCanvas();
  initHeroTilt();
  initTextRotator();
  initCountdown();
  initMiningStation();
  initQuestFiltersAndSearch();
  initKarmaCalculator();
  initLeaderboard();
  initFAQ();
  initRegistrationModal();
  initScrollAnimations();
});

/* ==========================================================================
   1. CUSTOM CURSOR & MAGNETIC FOLLOWER PHYSICS
   ========================================================================== */
function initCustomCursor() {
  if (window.innerWidth < 768) return; // Disable on touch mobile

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';

  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactives
  const hoverables = document.querySelectorAll('button, a, .calc-task-item, .arcade-coin-btn, .quest-card, .mentor-card, input, select');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   2. WEB AUDIO SFX ENGINE (Synthesizer via Web Audio API)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  const soundBtn = document.getElementById('sound-toggle');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundBtn.innerHTML = soundEnabled ? '🔊' : '🔇';
    soundBtn.setAttribute('title', soundEnabled ? 'Sound FX On' : 'Sound FX Muted');
    showToast(soundEnabled ? 'Sound Effects Enabled 🔊' : 'Sound Effects Muted 🔇');
    if (soundEnabled) playSfx('pop');
  });

  document.querySelectorAll('.neo-btn, .filter-btn, .lb-tab-btn, .hud-btn').forEach(el => {
    el.addEventListener('click', () => {
      if (soundEnabled) playSfx('click');
    });
  });
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSfx(type) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'coin') {
      osc.type = 'sine';
      const f1 = 987.77 + (Math.random() * 80 - 40);
      osc.frequency.setValueAtTime(f1, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.07);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'jackpot') {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(f, now + i * 0.06);
        g.connect(ctx.destination);
        o.connect(g);
        g.gain.setValueAtTime(0.14, now + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
        o.start(now + i * 0.06);
        o.stop(now + i * 0.06 + 0.35);
      });
    } else if (type === 'unlock') {
      [440, 554.37, 659.25, 880].forEach((f, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(f, now + i * 0.08);
        g.connect(ctx.destination);
        o.connect(g);
        g.gain.setValueAtTime(0.1, now + i * 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.45);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.45);
      });
    }
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

/* ==========================================================================
   3. THEME SWITCHER
   ========================================================================== */
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('karma-theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.innerHTML = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('karma-theme', 'light');
      themeBtn.innerHTML = '🌙';
      showToast('Switched to Day Arcade Mode ☀️');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('karma-theme', 'dark');
      themeBtn.innerHTML = '☀️';
      showToast('Switched to Cyber Night Mode 🌙');
    }
    playSfx('pop');
  });
}

/* ==========================================================================
   4. DYNAMIC TEXT ROTATOR IN HERO
   ========================================================================== */
function initTextRotator() {
  const target = document.getElementById('hero-rotating-text');
  if (!target) return;

  const phrases = [
    'KARMA.',
    'FUTURE.',
    'CAREER.',
    'POTENTIAL.',
    'CROWN.'
  ];
  let index = 0;

  setInterval(() => {
    index = (index + 1) % phrases.length;
    target.style.opacity = '0';
    target.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      target.textContent = phrases[index];
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    }, 200);
  }, 2800);
}

/* ==========================================================================
   5. AMBIENT PARTICLE & RETRO GRID CANVAS
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particleCount = 32;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 3,
      speedX: (Math.random() - 0.5) * 0.7,
      speedY: -Math.random() * 0.8 - 0.25,
      color: Math.random() > 0.5 ? '#FF5E1E' : '#FFB703',
      alpha: Math.random() * 0.5 + 0.2,
      isCoin: Math.random() > 0.65
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      // Mouse gentle repulsion
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.x -= (dx / dist) * 1.8;
        p.y -= (dy / dist) * 1.8;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.isCoin) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#121316';
        ctx.font = `bold ${p.size * 1.2}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('µ', p.x, p.y);
      } else {
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      }
      ctx.restore();
    });

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   6. 3D HERO PERSPECTIVE TILT
   ========================================================================== */
function initHeroTilt() {
  const card = document.querySelector('.hero-main-card');
  const stage = document.querySelector('.hero-visual-stage');
  if (!card || !stage) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 16;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  stage.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   7. COUNTDOWN TIMER (August 16th – 27th August 2026)
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');
  if (!daysEl) return;

  const targetDate = new Date('August 16, 2026 09:00:00').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      const label = document.querySelector('.countdown-label span');
      if (label) label.textContent = '🔥 CHALLENGE IS CURRENTLY LIVE!';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   8. INTERACTIVE ARCADE KARMA MINING CLICKER STATION
   ========================================================================== */
let totalMinedKarma = 0;
let miningClicks = 0;

function initMiningStation() {
  const coinBtn = document.getElementById('arcade-coin-btn');
  const countDisplay = document.getElementById('mined-karma-count');
  const streakDisplay = document.getElementById('mining-streak-level');
  const meterFill = document.getElementById('mining-meter-fill');
  const fxContainer = document.getElementById('coin-fx-box');
  if (!coinBtn || !countDisplay) return;

  coinBtn.addEventListener('click', (e) => {
    miningClicks++;
    
    // Calculate gain with chances for critical hits!
    let gain = 50;
    let isCritical = false;
    const rand = Math.random();
    if (rand > 0.9) {
      gain = 250;
      isCritical = true;
    } else if (rand > 0.7) {
      gain = 100;
    }

    totalMinedKarma += gain;
    countDisplay.textContent = totalMinedKarma.toLocaleString();

    // Floating text animation
    if (fxContainer) {
      const floatText = document.createElement('div');
      floatText.className = 'floating-kp-num';
      floatText.textContent = isCritical ? `⚡ CRIT +${gain} KP!` : `+${gain} KP`;
      if (isCritical) floatText.style.color = '#FFB703';

      const rect = coinBtn.getBoundingClientRect();
      const parentRect = fxContainer.getBoundingClientRect();
      const offsetX = e.clientX - parentRect.left - 40 + (Math.random() * 40 - 20);
      const offsetY = e.clientY - parentRect.top - 20;

      floatText.style.left = `${offsetX}px`;
      floatText.style.top = `${offsetY}px`;
      fxContainer.appendChild(floatText);

      setTimeout(() => floatText.remove(), 950);
    }

    // Sound effect
    if (isCritical) {
      playSfx('jackpot');
    } else {
      playSfx('coin');
    }

    // Update streak meter
    const streakLevel = Math.floor(miningClicks / 10) + 1;
    if (streakDisplay) streakDisplay.textContent = `Lvl ${streakLevel} Fresher Miner`;
    if (meterFill) {
      const progress = (miningClicks % 10) * 10;
      meterFill.style.width = `${progress}%`;
    }

    if (totalMinedKarma === 1000) {
      triggerConfetti();
      showToast('⛏️ 1,000 Mined Karma Milestone! You are a mining pro!');
    }
  });
}

window.mineKarmaShortcut = function() {
  const station = document.getElementById('mining-station');
  if (station) station.scrollIntoView({ behavior: 'smooth' });
  const btn = document.getElementById('arcade-coin-btn');
  if (btn) btn.click();
};

/* ==========================================================================
   9. INTERACTIVE µJOURNEY QUEST FILTERING & SEARCH
   ========================================================================== */
const QUESTS_DATA = [
  {
    id: 'q1',
    title: 'μLearn Platform & Discord Onboarding',
    category: 'tech',
    categoryName: 'Tech & Community',
    karma: 250,
    time: '45 mins',
    level: 'Beginner',
    desc: 'Set up your official μLearn profile, join the PRC Discord server, link your campus, and introduce yourself to the peer group.'
  },
  {
    id: 'q2',
    title: 'Git & GitHub Explorer Quest',
    category: 'tech',
    categoryName: 'Tech & Dev',
    karma: 450,
    time: '2 hours',
    level: 'Beginner',
    desc: 'Install Git, initialize your first repository, configure SSH keys, create commits, and publish your portfolio README on GitHub.'
  },
  {
    id: 'q3',
    title: 'Freshers Personal Web Portfolio',
    category: 'tech',
    categoryName: 'Tech & Dev',
    karma: 600,
    time: '3 hours',
    level: 'Intermediate',
    desc: 'Build a responsive personal web page using HTML/CSS highlighting your skills, goals, and social handles, deployed on GitHub Pages.'
  },
  {
    id: 'q4',
    title: 'Figma UI/UX Challenge: Campus App',
    category: 'creative',
    categoryName: 'Design & Creative',
    karma: 400,
    time: '2 hours',
    level: 'Creative',
    desc: 'Design an intuitive 3-screen mobile wireframe in Figma addressing a real campus student problem with cohesive color schemes.'
  },
  {
    id: 'q5',
    title: 'Poster & Visual Graphic Showcase',
    category: 'creative',
    categoryName: 'Design & Creative',
    karma: 350,
    time: '1.5 hours',
    level: 'Creative',
    desc: 'Create an event poster celebrating your group’s journey during Karma Mining using modern neobrutalist typography.'
  },
  {
    id: 'q6',
    title: 'First Open Source PR to μLearn',
    category: 'oss',
    categoryName: 'Open Source',
    karma: 700,
    time: '3.5 hours',
    level: 'Advanced',
    desc: 'Fork a public repository, fix a typo or add documentation in markdown, submit a clean Pull Request adhering to contributing guidelines.'
  },
  {
    id: 'q7',
    title: 'Peer Mentorship & Doubt Buster',
    category: 'soft',
    categoryName: 'Soft Skills',
    karma: 300,
    time: '1 hour',
    level: 'Leadership',
    desc: 'Help 2 peers in your group understand a task, record a quick 2-minute summary video or voice note, and share in the group forum.'
  },
  {
    id: 'q8',
    title: 'Technical Blog on μJourney Learning',
    category: 'soft',
    categoryName: 'Soft Skills',
    karma: 500,
    time: '2 hours',
    level: 'Intermediate',
    desc: 'Write an article on Hashnode or Medium summarizing what you built during the Karma Marathon and how your volunteer helped you.'
  },
  {
    id: 'q9',
    title: 'Python Scripting: Mini Automation Bot',
    category: 'tech',
    categoryName: 'Tech & Dev',
    karma: 550,
    time: '2.5 hours',
    level: 'Intermediate',
    desc: 'Write a clean Python script that fetches real-time data from a public API or automates a repetitive file management task.'
  }
];

let activeFilter = 'all';
let searchQuery = '';

function initQuestFiltersAndSearch() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('quest-search-field');
  const container = document.getElementById('quests-grid-container');
  if (!container) return;

  function renderQuests() {
    container.innerHTML = '';
    
    let filtered = QUESTS_DATA;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(q => q.category === activeFilter);
    }
    if (searchQuery.trim() !== '') {
      const qLower = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(qLower) || 
        q.desc.toLowerCase().includes(qLower) || 
        q.categoryName.toLowerCase().includes(qLower)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-surface); border: 2px dashed var(--border-color); border-radius: var(--border-radius-lg);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3>No Quests Found</h3>
          <p style="color: var(--text-muted);">Try a different keyword or reset the category filter.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(q => {
      const card = document.createElement('div');
      card.className = 'quest-card';
      card.innerHTML = `
        <div class="quest-header">
          <span class="quest-badge badge-${q.category}">${q.categoryName}</span>
          <span class="quest-karma-pill">⚡ +${q.karma} KP</span>
        </div>
        <h3 class="quest-title">${q.title}</h3>
        <p class="quest-desc">${q.desc}</p>
        <div class="quest-meta">
          <span>⏱️ ${q.time}</span>
          <span>📊 ${q.level}</span>
        </div>
        <button class="neo-btn neo-btn-outline neo-btn-sm quest-action-btn" onclick="openQuestDetail('${q.id}')">
          View Task Details ➔
        </button>
      `;
      container.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderQuests();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderQuests();
    });
  }

  renderQuests();
}

window.openQuestDetail = function(questId) {
  const quest = QUESTS_DATA.find(q => q.id === questId);
  if (!quest) return;

  const modal = document.getElementById('quest-modal');
  const modalBody = document.getElementById('quest-modal-body');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <span class="quest-badge badge-${quest.category}">${quest.categoryName}</span>
      <h2 style="font-size: 1.6rem; margin: 0.75rem 0 0.5rem 0;">${quest.title}</h2>
      <p style="font-size: 1rem; color: var(--text-secondary);">${quest.desc}</p>
    </div>
    
    <div style="background: var(--bg-secondary); border: 2px solid var(--border-color); border-radius: var(--border-radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 0.5rem;">
        <span>🪙 Reward:</span>
        <span style="color: var(--brand-orange); font-family: var(--font-display); font-size: 1.1rem;">+${quest.karma} Karma Points</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 0.5rem;">
        <span>⏳ Est. Duration:</span>
        <span>${quest.time}</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-weight: 700;">
        <span>🤝 Volunteer Guidance:</span>
        <span style="color: var(--brand-teal-dark);">Dedicated Mentor Support</span>
      </div>
    </div>

    <h4 style="margin-bottom: 0.5rem;">Submission Guidelines:</h4>
    <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
      <li>Complete the practical task on your local environment or specified tool.</li>
      <li>Submit your proof-of-work link (GitHub Repo URL / Figma Link / Live URL) to your volunteer mentor.</li>
      <li>Points will be verified and credited directly to your µLearn PRC Karma ledger.</li>
    </ul>

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="neo-btn neo-btn-primary" style="flex: 1;" onclick="addQuestToCalculator('${quest.id}')">
        ➕ Add to My Calculator Plan
      </button>
      <button class="neo-btn neo-btn-outline" onclick="closeModal('quest-modal')">Close</button>
    </div>
  `;

  modal.classList.add('active');
  playSfx('pop');
};

/* ==========================================================================
   10. KARMA QUALIFICATION CALCULATOR (3,000 KP TARGET)
   ========================================================================== */
const CALC_TASKS = [
  { id: 'c1', name: 'Platform Setup & Discord Verification', points: 250, default: true },
  { id: 'c2', name: 'Git & GitHub Onboarding Sprint', points: 450, default: true },
  { id: 'c3', name: 'Responsive Web Portfolio Build', points: 600, default: true },
  { id: 'c4', name: 'Figma UI/UX Challenge & Critique', points: 400, default: false },
  { id: 'c5', name: 'First Open Source Pull Request', points: 700, default: true },
  { id: 'c6', name: 'Technical Learning Blog / Write-up', points: 500, default: true },
  { id: 'c7', name: 'Peer Support & Group Doubts Help', points: 300, default: false },
  { id: 'c8', name: 'Python Automation Mini-Script', points: 550, default: false }
];

let selectedTasks = new Set(['c1', 'c2', 'c3', 'c5', 'c6']); // total: 2500

function initKarmaCalculator() {
  const container = document.getElementById('calc-tasks-list');
  if (!container) return;

  container.innerHTML = '';
  CALC_TASKS.forEach(task => {
    const isChecked = selectedTasks.has(task.id);
    const item = document.createElement('div');
    item.className = `calc-task-item ${isChecked ? 'selected' : ''}`;
    item.setAttribute('data-id', task.id);
    item.innerHTML = `
      <div class="calc-task-left">
        <div class="calc-checkbox">${isChecked ? '✓' : ''}</div>
        <span class="calc-task-name">${task.name}</span>
      </div>
      <span class="calc-task-points">+${task.points} KP</span>
    `;

    item.addEventListener('click', () => {
      toggleCalcTask(task.id, item);
    });

    container.appendChild(item);
  });

  updateCalcGauge(false);
}

function toggleCalcTask(taskId, el) {
  if (selectedTasks.has(taskId)) {
    selectedTasks.delete(taskId);
    el.classList.remove('selected');
    el.querySelector('.calc-checkbox').textContent = '';
  } else {
    selectedTasks.add(taskId);
    el.classList.add('selected');
    el.querySelector('.calc-checkbox').textContent = '✓';
    playSfx('coin');
  }
  updateCalcGauge(true);
}

window.addQuestToCalculator = function(questId) {
  closeModal('quest-modal');
  const target = document.getElementById('calculator');
  if (target) target.scrollIntoView({ behavior: 'smooth' });
  showToast('Quest added to your Roadmap! Check your score ⚡');
};

let previousQualified = false;

function updateCalcGauge(playSound = true) {
  let total = 0;
  CALC_TASKS.forEach(t => {
    if (selectedTasks.has(t.id)) total += t.points;
  });

  const scoreEl = document.getElementById('calc-current-score');
  const circleEl = document.getElementById('calc-circle-progress');
  const badgeEl = document.getElementById('calc-status-badge');
  if (!scoreEl || !circleEl || !badgeEl) return;

  scoreEl.textContent = total.toLocaleString();

  const maxTarget = 3000;
  const percentage = Math.min(total / maxTarget, 1);
  const totalDash = 565; // circumference of circle r=90
  const offset = totalDash - (percentage * totalDash);

  circleEl.style.strokeDashoffset = offset;

  if (total >= 3000) {
    circleEl.classList.add('completed');
    badgeEl.className = 'qualification-status-badge status-unlocked';
    badgeEl.innerHTML = '🎉 QUALIFIED FOR AWARDS & CERTIFICATES!';

    if (!previousQualified && playSound) {
      playSfx('unlock');
      triggerConfetti();
      showToast('🌟 Qualification Benchmark Achieved! You crossed 3,000 Karma Points!');
      previousQualified = true;
    }
  } else {
    circleEl.classList.remove('completed');
    badgeEl.className = 'qualification-status-badge status-locked';
    const remaining = 3000 - total;
    badgeEl.innerHTML = `🔒 Need ${remaining} KP more to Qualify`;
    previousQualified = false;
  }
}

/* ==========================================================================
   11. SIMULATED LIVE LEADERBOARD (Top Students & Top Volunteers)
   ========================================================================== */
const STUDENTS_LB = [
  { rank: 1, name: 'Ananya Ramesh', dept: 'CSE - 1st Year', karma: 4850, tasks: 11, avatar: 'AR' },
  { rank: 2, name: 'Karthik Varma', dept: 'ECE - 1st Year', karma: 4420, tasks: 10, avatar: 'KV' },
  { rank: 3, name: 'Sneha George', dept: 'AI & DS - 1st Year', karma: 3950, tasks: 9, avatar: 'SG' },
  { rank: 4, name: 'Mohammed Farhan', dept: 'CSE - 1st Year', karma: 3600, tasks: 8, avatar: 'MF' },
  { rank: 5, name: 'Diya S. Nair', dept: 'ME - 1st Year', karma: 3450, tasks: 8, avatar: 'DN' },
  { rank: 6, name: 'Adithyan Pradeep', dept: 'EEE - 1st Year', karma: 3200, tasks: 7, avatar: 'AP' },
  { rank: 7, name: 'Rhea Kurian', dept: 'Civil - 1st Year', karma: 3100, tasks: 7, avatar: 'RK' }
];

const VOLUNTEERS_LB = [
  { rank: 1, name: 'Group Alpha (Lead: Rahul Krishna)', members: '12 Students', karma: 38400, qualified: '10/12 Qualifiers', avatar: 'GA' },
  { rank: 2, name: 'Group Vortex (Lead: Meera Pillai)', members: '11 Students', karma: 35150, qualified: '9/11 Qualifiers', avatar: 'GV' },
  { rank: 3, name: 'Group ByteForge (Lead: Arjun Jayaraj)', members: '12 Students', karma: 32900, qualified: '8/12 Qualifiers', avatar: 'GB' },
  { rank: 4, name: 'Group Catalyst (Lead: Pooja Menon)', members: '10 Students', karma: 29800, qualified: '7/10 Qualifiers', avatar: 'GC' }
];

function initLeaderboard() {
  const tabs = document.querySelectorAll('.lb-tab-btn');
  const body = document.getElementById('lb-table-body');
  if (!body) return;

  let currentTab = 'students';

  function render() {
    body.innerHTML = '';
    const list = currentTab === 'students' ? STUDENTS_LB : VOLUNTEERS_LB;

    list.forEach(item => {
      const row = document.createElement('div');
      row.className = 'lb-row';

      let rankClass = '';
      let medal = `#${item.rank}`;
      if (item.rank === 1) { rankClass = 'rank-gold'; medal = '🥇 #1'; }
      else if (item.rank === 2) { rankClass = 'rank-silver'; medal = '🥈 #2'; }
      else if (item.rank === 3) { rankClass = 'rank-bronze'; medal = '🥉 #3'; }

      row.innerHTML = `
        <div class="lb-rank ${rankClass}">${medal}</div>
        <div class="lb-user-info">
          <div class="lb-avatar">${item.avatar}</div>
          <div>
            <div class="lb-name">${item.name}</div>
            <div class="lb-sub">${currentTab === 'students' ? item.dept : item.members}</div>
          </div>
        </div>
        <div><span style="font-weight: 700; font-size: 0.9rem;">${currentTab === 'students' ? item.tasks + ' Quests' : item.qualified}</span></div>
        <div><span class="badge-tag-orange" style="font-size: 0.75rem;">${item.karma >= 3000 ? 'QUALIFIED' : 'IN PROGRESS'}</span></div>
        <div class="lb-karma-pill">${item.karma.toLocaleString()} KP</div>
      `;
      body.appendChild(row);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.getAttribute('data-tab');
      render();
    });
  });

  const refreshBtn = document.getElementById('lb-refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      STUDENTS_LB.forEach(s => {
        if (Math.random() > 0.4) s.karma += Math.floor(Math.random() * 50) + 25;
      });
      STUDENTS_LB.sort((a, b) => b.karma - a.karma);
      STUDENTS_LB.forEach((s, idx) => s.rank = idx + 1);
      render();
      playSfx('coin');
      showToast('Leaderboard Synced with Live µLearn Ledger ⚡');
    });
  }

  render();
}

/* ==========================================================================
   12. VOLUNTEER MENTOR DOUBT DRAWER
   ========================================================================== */
window.openMentorDoubtModal = function(domainName) {
  const modal = document.getElementById('mentor-modal');
  const title = document.getElementById('mentor-modal-title');
  const domainText = document.getElementById('mentor-modal-domain');
  if (!modal) return;

  if (title) title.textContent = `Ask Mentor: ${domainName}`;
  if (domainText) domainText.textContent = `Ask your questions regarding ${domainName} quests. Your dedicated group mentor will review and respond!`;

  modal.classList.add('active');
  playSfx('pop');
};

/* ==========================================================================
   13. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
      playSfx('click');
    });
  });
}

/* ==========================================================================
   14. REGISTRATION & FRESHER ACCESS PASS GENERATOR
   ========================================================================== */
function initRegistrationModal() {
  const form = document.getElementById('reg-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value.trim() || 'Fresher Explorer';
    const dept = document.getElementById('reg-dept').value || 'CSE';
    const domain = document.getElementById('reg-domain').value || 'Fullstack & Python';

    const ticketBox = document.getElementById('ticket-preview-box');
    const passName = document.getElementById('pass-student-name');
    const passDept = document.getElementById('pass-student-dept');
    const passDomain = document.getElementById('pass-student-domain');
    const passId = document.getElementById('pass-unique-id');

    if (ticketBox && passName && passDept && passDomain && passId) {
      passName.textContent = name;
      passDept.textContent = dept + ' | 1st Year Freshers';
      passDomain.textContent = 'Preferred Track: ' + domain;
      const randomCode = 'KM-2026-' + Math.floor(100000 + Math.random() * 900000);
      passId.textContent = randomCode;

      ticketBox.style.display = 'block';
      ticketBox.scrollIntoView({ behavior: 'smooth' });
    }

    playSfx('unlock');
    triggerConfetti();
    showToast(`🎉 Welcome to Karma Mining, ${name}! Your Pass is Ready.`);
  });
}

window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    playSfx('pop');
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    playSfx('click');
  }
};

/* ==========================================================================
   15. TOAST NOTIFICATION UTILITY
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   16. CONFETTI BURST ENGINE
   ========================================================================== */
function triggerConfetti() {
  const count = 75;
  const colors = ['#FF5E1E', '#FFB703', '#06D6A0', '#118AB2', '#FFFFFF'];
  const container = document.body;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.width = Math.random() * 10 + 6 + 'px';
    el.style.height = Math.random() * 10 + 6 + 'px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = '50vw';
    el.style.top = '40vh';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.border = '1px solid #121316';
    container.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 380 + 160;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity + 220;
    const rotation = Math.random() * 720;

    el.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 1000 + 1200,
      easing: 'cubic-bezier(0.1, 1, 0.1, 1)',
      fill: 'forwards'
    }).onfinish = () => el.remove();
  }
}

/* ==========================================================================
   17. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.neo-card, .section-header, .prize-card, .mining-station-box');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(24px)';
    t.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(t);
  });
}

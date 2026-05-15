/* ============== Devyani Khekale — Portfolio JS ============== */

/* ---------- Year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Theme toggle ---------- */
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'dark') root.classList.add('dark');
themeBtn.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
themeBtn.addEventListener('click', () => {
  root.classList.toggle('dark');
  const dark = root.classList.contains('dark');
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------- Typed roles ---------- */
const roles = [
  'Computer Engineering Student',
  'Beginner Blockchain Developer',
  'UI/UX Enthusiast',
  'Creative Problem Solver',
];
const typedEl = document.getElementById('typed');
let rIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const word = roles[rIdx];
  typedEl.textContent = word.slice(0, cIdx);
  if (!deleting && cIdx < word.length) { cIdx++; setTimeout(typeLoop, 80); }
  else if (deleting && cIdx > 0)       { cIdx--; setTimeout(typeLoop, 40); }
  else {
    deleting = !deleting;
    if (!deleting) rIdx = (rIdx + 1) % roles.length;
    setTimeout(typeLoop, deleting ? 1400 : 250);
  }
}
typeLoop();

/* ---------- Skills (rendered) ---------- */
const skills = [
  { icon: '💻', name: 'Frontend Development', level: 85 },
  { icon: '🔗', name: 'Blockchain Development', level: 72 },
  { icon: '🎨', name: 'UI/UX Design', level: 78 },
  { icon: '⚙️', name: 'IoT & Arduino', level: 80 },
  { icon: '🧠', name: 'Problem Solving', level: 88 },
  { icon: '✨', name: 'AI / ML', level: 65 },
  { icon: '👥', name: 'Management Skills', level: 82 },
];
const skillsGrid = document.querySelector('.skills-grid');
skillsGrid.innerHTML = skills.map(s => `
  <div class="glass card skill reveal">
    <div class="skill-head">
      <div class="skill-icon">${s.icon}</div>
      <h3>${s.name}</h3>
    </div>
    <div class="bar"><div class="bar-fill" data-level="${s.level}"></div></div>
    <span class="skill-level">${s.level}%</span>
  </div>
`).join('');

/* ---------- Projects (rendered) ---------- */
const REPO = 'https://github.com/devyanikhekale31-maker/Essentials-of-Data-Science';
const projects = [
  {
    title: 'Smart Posture Correction System',
    desc: 'An Arduino-powered wearable that detects incorrect posture in real time using IMU sensors and gently buzzes when slouching is detected.',
    tech: ['Arduino', 'C++', 'MPU6050', 'Embedded'],
    github: REPO, demo: REPO,
  },
  {
    title: 'Personal Portfolio Website',
    desc: 'A modern, animated portfolio crafted with HTML, CSS and JavaScript. Glassmorphism, gradients and smooth scroll throughout.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: REPO, demo: '#home',
  },
];
document.querySelector('.projects-grid').innerHTML = projects.map(p => `
  <article class="glass card project reveal">
    <div class="project-thumb"></div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="project-links">
        <a class="link-github" href="${p.github}" target="_blank" rel="noreferrer">GitHub</a>
        <a class="link-demo" href="${p.demo}" ${p.demo.startsWith('http') ? 'target="_blank" rel="noreferrer"' : ''}>Live Demo</a>
      </div>
    </div>
  </article>
`).join('');

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // animate skill bars
      e.target.querySelectorAll('.bar-fill').forEach(b => {
        b.style.width = b.dataset.level + '%';
      });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Contact form ---------- */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '✅ Thanks! Your message has been noted (demo only).';
  form.reset();
  setTimeout(() => status.textContent = '', 5000);
});

/* ---------- Particles background ---------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const mouse = { x: -9999, y: -9999 };
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
resize();
function initParticles() {
  particles = [];
  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.6,
    });
  }
}
initParticles();
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dark = root.classList.contains('dark');
  const color = dark ? 'rgba(200,180,255,' : 'rgba(80,40,160,';
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    const dx = p.x - mouse.x, dy = p.y - mouse.y;
    const d = Math.hypot(dx, dy);
    if (d < 120) { p.x += dx / d * 0.6; p.y += dy / d * 0.6; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = color + '0.6)';
    ctx.fill();
  });
  // connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = color + (0.15 * (1 - d / 110)) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(loop);
}
loop();

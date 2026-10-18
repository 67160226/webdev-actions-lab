const root = document.documentElement;
const themeBtn = document.querySelector('#themeBtn');
const helloBtn = document.querySelector('#helloBtn');
const statusEl = document.querySelector('#status');


/* ---------- ไล่แสดงบรรทัดทีละบรรทัดตอนเปิดหน้า ---------- */
document.querySelectorAll('.screen > *').forEach((el, i) => el.style.setProperty('--i', i));


/* ---------- สลับธีม (จำค่าไว้) ---------- */
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? '☀' : '☾';
}


let saved = null;
try { saved = localStorage.getItem('theme-t3'); } catch (e) {}
applyTheme(saved || 'dark');


themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme-t3', next); } catch (e) {}
});


/* ---------- ปุ่ม Say Hello: พิมพ์ข้อความทีละตัวอักษร ---------- */
const messages = [
  'Hello from GitHub Pages!',
  'git push -> Actions -> Pages: deployed ✅',
  'เว็บของผมออนไลน์แล้ว',
  'ยินดีที่ได้รู้จักครับ 👋'
];
let n = 0;
let timer = null;


helloBtn.addEventListener('click', () => {
  clearInterval(timer);
  const text = messages[n % messages.length];
  n++;
  let k = 0;
  statusEl.textContent = '';
  timer = setInterval(() => {
    k++;
    statusEl.textContent = text.slice(0, k);
    if (k >= text.length) clearInterval(timer);
  }, 28);
});


/* ---------- แถบ Skills ขยายเมื่อเลื่อนมาถึง ---------- */
const skills = document.querySelector('#skills');
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('ready'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.3 }).observe(skills);
} else {
  skills.classList.add('ready');
}
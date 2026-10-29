// Cấu hình nhanh: hãy thay email mẫu bằng email bạn muốn nhận tin nhắn.
const CONTACT_EMAIL = "your-email@example.com";

const $ = (selector) => document.querySelector(selector);
$("#year").textContent = new Date().getFullYear();
$("#emailDisplay").textContent = CONTACT_EMAIL;

const nav = $("#nav");
$("#menuToggle").addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  $("#menuToggle").setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal, .project-card").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));

$("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-glow");
  $("#themeToggle").textContent = document.body.classList.contains("light-glow") ? "✦" : "☾";
});

// Web Audio tạo giai điệu ambient đơn giản ngay trên trình duyệt, không tải nhạc có bản quyền.
// Trình duyệt chỉ phát âm thanh sau khi người dùng bấm nút.
let audioContext = null, musicTimer = null, musicOn = false, noteIndex = 0;
const notes = [220, 261.63, 329.63, 293.66, 196, 246.94, 293.66, 369.99];
function playNote() {
  if (!audioContext || !musicOn) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = notes[noteIndex++ % notes.length];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(now); osc.stop(now + 1.15);
}
function setMusic(on) {
  musicOn = on;
  $("#musicToggle").textContent = on ? "♫" : "♪";
  $("#musicStatus").textContent = on ? "Ambient đang phát" : "Bật nhạc nền";
  document.querySelector(".equalizer").classList.toggle("paused", !on);
  if (musicTimer) clearInterval(musicTimer);
  if (on) {
    if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
    playNote();
    musicTimer = setInterval(playNote, 950);
  }
}
$("#musicToggle").addEventListener("click", () => setMusic(!musicOn));

const dialog = $("#loginDialog");
$("#loginOpen").addEventListener("click", () => {
  if (typeof dialog.showModal === "function") dialog.showModal();
  else alert("Trình duyệt của bạn không hỗ trợ hộp thoại đăng nhập.");
});
$("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  const username = new FormData(event.currentTarget).get("username").toString().trim();
  // Demo: không gửi hoặc lưu mật khẩu. Không phải hệ thống xác thực thật.
  $("#loginFeedback").textContent = `Xin chào ${username}! Đây là bản demo — cần máy chủ để tạo tài khoản thật.`;
  event.currentTarget.querySelector('[name="password"]').value = "";
});

$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name").toString().trim();
  const email = data.get("email").toString().trim();
  const message = data.get("message").toString().trim();
  if (!name || !email || !message) return;
  if (CONTACT_EMAIL === "your-email@example.com") {
    $("#formFeedback").textContent = "Biểu mẫu đã kiểm tra hợp lệ. Chủ website cần thay CONTACT_EMAIL trong script.js để mở email gửi tin nhắn.";
    return;
  }
  const subject = encodeURIComponent(`Tin nhắn từ website — ${name}`);
  const body = encodeURIComponent(`Tên: ${name}\nEmail phản hồi: ${email}\n\nNội dung:\n${message}`);
  $("#formFeedback").textContent = "Đang mở ứng dụng email của bạn…";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", () => {
  const target = document.querySelector(a.getAttribute("href"));
  if (target) showToast(`Đang đến mục ${target.id === "home" ? "Trang chủ" : target.id}…`);
}));

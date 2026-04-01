/* ══════════════════════════════════════════
   SANTHOSH GOKA PORTFOLIO — MASTER SCRIPT
   ══════════════════════════════════════════ */
/* Attach global functions to window early to avoid issues with inline onclicks */
window.dbSwitchTab = dbSwitchTab;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.toggleSkillFolder = toggleSkillFolder;
window.openLightbox = openLightbox;
// ─────────────────────────────────────────────
// 2.  DARK / LIGHT THEME TOGGLE
// ─────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sg-theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    
    // If project modal is open, re-render to update logos/images
    if (document.getElementById('project-modal').classList.contains('active') && currentCompany) {
      renderDashboard(currentCompany, currentTab);
      // Also update hero visual
      updateHeroVisual(currentCompany, newTheme);
    }
  });
}

function updateHeroVisual(companyKey, theme) {
  const meta = companyMeta[companyKey];
  const visualWrap = document.getElementById('db-hero-visual-wrap');
  if (!visualWrap || !meta) return;

  const displayImage = (theme === 'dark' && meta.imageDark) ? meta.imageDark : meta.image;
  if (displayImage) {
    visualWrap.innerHTML = `<img src="${displayImage}" alt="Company Logo" class="db-hero-visual-img">`;
  }
}
// check if user has forced dark mode inside Local Storage, otherwise default light
applyTheme(localStorage.getItem('sg-theme') || 'light');


// ─────────────────────────────────────────────
// 3.  SCROLL-REVEAL
// ─────────────────────────────────────────────
document.querySelectorAll('.section, .glass-card, .work-card, .timeline-item, .lang-card, .sf-folder')
  .forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


// ─────────────────────────────────────────────
// 4.  SKILLS FOLDER TOGGLE
// ─────────────────────────────────────────────
function toggleSkillFolder() {
  const scene  = document.getElementById('sf-scene');
  const hint   = document.getElementById('sf-hint');
  const isOpen = scene.classList.toggle('open');

  if (hint) {
    hint.innerHTML = isOpen
      ? '<i class="fa-solid fa-folder"></i> Click to close'
      : '<i class="fa-solid fa-folder-open"></i> Click to open';
  }
}


// ─────────────────────────────────────────────
// 5.  STAT COUNTER ANIMATION
// ─────────────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let v = 0;
  const step = Math.ceil(target / 40);
  const t = setInterval(() => {
    v += step;
    if (v >= target) { v = target; clearInterval(t); }
    el.textContent = v + suffix;
  }, 40);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, raw = el.textContent.trim(), num = parseInt(raw);
    if (!isNaN(num)) animateCounter(el, num, raw.replace(String(num), ''));
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => {
  if (el.textContent.trim() !== '∞') counterObs.observe(el);
});


// ─────────────────────────────────────────────
// 6.  PROJECT DATA
//     ↓ Fill embed with your real YouTube embed
//       strings, and src with image paths.
// ─────────────────────────────────────────────
const companyMeta = {
  usp: {
    image: 'https://drive.google.com/thumbnail?id=1J9v0Fx7MwvakwoHxTazul0bqAwsd3GaK&sz=w1000',
    imageDark: 'https://drive.google.com/thumbnail?id=1_9NEwe9Qc38SyEOLbf39Ybh4u7cGM5rh&sz=w1000',
    period: 'Nov 2016 – Sep 2019',
    heroSub: 'Broadcast graphics, promotional videos & animated media campaigns.'
  },
  lehren: {
    image: 'https://drive.google.com/thumbnail?id=1WKLrgH-7Kr-rzJszih4Dhb-qDi8JGvoz&sz=w1000',
    imageDark: 'https://drive.google.com/thumbnail?id=1AGxUzXNZPF9eW245kNbzVTVjtyCYOmF5&sz=w1000',
    period: 'Dec 2019 – Jan 2022',
    heroSub: 'Entertainment graphics, Bollywood reels & social media motion assets.'
  },
  pen: {
    image: 'https://drive.google.com/thumbnail?id=1HvdPfXs97yjfrW3QseNm_UFWYYFNfP8t&sz=w1000',
    imageDark: 'https://drive.google.com/thumbnail?id=1sUweI_lGRTBhRfWXL9bp3rfc69aADLUI&sz=w1000',
    period: 'Feb 2022 – Present',
    heroSub: 'Cinematic title sequences, OTT promos & theatrical release graphics.'
  }
};

const projectData = {
  usp: {
    name: 'USP Studios Pvt Ltd',
    Videos: [
      { title: 'Sports Car Race Game', year: '2019', embed: `<iframe src="https://www.youtube.com/embed/AwjuO1rjg14?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Tow Truck Garage Police SWAT', year: '2019', embed: `<iframe src="https://www.youtube.com/embed/PRWXArvnyHw?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Soccer Ball Teaching Colors', year: '2018', embed: `<iframe src="https://www.youtube.com/embed/iVISaUHJRyo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Popcorn Colors Educational Kids Video', year: '2018', embed: `<iframe src="https://www.youtube.com/embed/A__i0RUaA_8?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Police Tow Truck Car Garage', year: '2018', embed: `<iframe src="https://www.youtube.com/embed/SRmZ3-i7gno?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Laalchi Bhoora Fairy Tales in Hindi', year: '2017', embed: `<iframe src="https://www.youtube.com/embed/NIOWqR8PE8E?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Good and Evil Jeep Monster Truck', year: '2017', embed: `<iframe src="https://www.youtube.com/embed/jTZGul2AlaM?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Evil VS Good Vehicles Army Tanker', year: '2017', embed: `<iframe src="https://www.youtube.com/embed/B_yypRLRpeE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Dumper Truck Formation & Uses', year: '2017', embed: `<iframe src="https://www.youtube.com/embed/V0TNntJsjaM?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Colors for Kids to Learn Wooden Hammer', year: '2016', embed: `<iframe src="https://www.youtube.com/embed/2YSc_uzxdHQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Color for Kids to Learn Educational Video', year: '2016', embed: `<iframe src="https://www.youtube.com/embed/epXZaX7Goa8?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
    ],
    Images: [
      { title: 'Project Dashboard 1', year: '2019', src: 'https://drive.google.com/thumbnail?id=1TS1jAhKwa8aZ30hwAx8Fn6TISCbNyh8p&sz=w1000' },
      { title: 'Project Dashboard 2', year: '2019', src: 'https://drive.google.com/thumbnail?id=1-zoU5QlyU1QUnsyCFPnz3RaWlUPxOiR4&sz=w1000' },
      { title: 'Project Dashboard 3', year: '2019', src: 'https://drive.google.com/thumbnail?id=1tSZMfuOOROHFU1ZayjSlaBewyp62nzmZ&sz=w1000' },
      { title: 'Project Dashboard 4', year: '2019', src: 'https://drive.google.com/thumbnail?id=10GnDfE-4XPLZryOah9vkwPR19QJ61yxR&sz=w1000' },
      { title: 'Project Dashboard 5', year: '2018', src: 'https://drive.google.com/thumbnail?id=1p0INrI_UqoluVkKPhF9YPmf5t0stAk0w&sz=w1000' },
      { title: 'Project Dashboard 6', year: '2018', src: 'https://drive.google.com/thumbnail?id=1PXfy0r5K3dafDiyetCJtlfHTd5iPyf_j&sz=w1000' },
      { title: 'Project Dashboard 7', year: '2018', src: 'https://drive.google.com/thumbnail?id=1gtrC6u_Ls8-98OoKSwDX0jj7xSWs47VC&sz=w1000' },
      { title: 'Project Dashboard 8', year: '2018', src: 'https://drive.google.com/thumbnail?id=1udldnKihTXRPnvwIiP62GUTBHDtn1hP3&sz=w1000' },
      { title: 'Project Dashboard 9', year: '2017', src: 'https://drive.google.com/thumbnail?id=1VwThHfLUSvi5RVGgTAPpqXPFnN1cgA7r&sz=w1000' },
      { title: 'Project Dashboard 10', year: '2017', src: 'https://drive.google.com/thumbnail?id=1Q1-IcwZ-q1ImGB15kvMXytK-5EXQx_V8&sz=w1000' },
      { title: 'Project Dashboard 11', year: '2016', src: 'https://drive.google.com/thumbnail?id=1M5-lQvuWTFaRQkSwSElKAmziu4P8dORK&sz=w1000' },
      { title: 'Project Dashboard 12', year: '2016', src: 'https://drive.google.com/thumbnail?id=1-VxGqstcjBuq8RMf6WAbbmXK8XENDQjz&sz=w1000' }
    ]
  },
  lehren: {
    name: 'Lehren Networks Pvt Ltd',
    Videos: [
      { title: 'Website', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/Aq8oeKeBOYo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Top Five Most Viewed Streaming Shows & Movies Of The Week 2', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/xmVwJFpU3V4?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Top Five Most Viewed Streaming Shows & Movies Of The Week 1', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/mzpCw7O6pzY?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Stories Never Told Before Start', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/NPIHEXYpVKA?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Stories Never Told Before End', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/RvfNsK71Imo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Stardom Logo', year: '2020', embed: `<iframe src="https://www.youtube.com/embed/mxKG4PAz3Sg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Shudh Desi Kitchen Logo', year: '2020', embed: `<iframe src="https://www.youtube.com/embed/VTxhc15iWdI?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Filmy Siyappa Logo', year: '2020', embed: `<iframe src="https://www.youtube.com/embed/ZMtNycyuhcs?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Motion Poster', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/AjqC-KJhvXk?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Montage 3', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/5kRhaYnK_fw?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Marvelous', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/Qcm2-TVVFEg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Marvellous Maverick', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/fghsq3B90qQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Frame', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/jlyzKhj9e5E?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: 'Edit 1', year: '2021', embed: `<iframe src="https://www.youtube.com/embed/_FrNh2eOPtE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
    ]
  },
  pen: {
    name: 'Pen Studio Pvt Ltd',
    Videos: [
      { title: "YouTube Interface for Mahabharat", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/em2fO28oWYo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Uru Krodhi Movie Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/L7WvsB0srHk?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Train Ek Chase Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Q8_hFM2npKA?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Thug Life End Screen", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/dmp03Dq7J5Y?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Tabaahi Killer Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/RPrBNxCVRHw?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "South Superstars Intro", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/a1ayvjXuA6M?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Sirivennela Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/SRLrQXm59hQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Seetimaarr", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/aPHX8G378Y4?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Seetimaarr Date", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/kt-gPTvXow8?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Sankat Mochan Mahabali Hanuman Disclaimer & Credits", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/RmPkiSKna88?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "RRR Event End Slate", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Mi21oHzWCkE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Romeo S3 End Screen", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/iuyezQuQBxQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Rama Navami Intro Credits", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/tPM9JgEzbMo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Ram Chale Van Ko", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/eBHoJyVvYNE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Ram Fire Action Scene End Slate", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/HrmJ5ahDe50?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Pen Movie Presents Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/3bKvfcbNAh8?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Pen Logo", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/1_tNEmAPdig?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Pen Bhakti Searching in Google", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/obCdAzCrmwE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Pen Bhakti Logo", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/KcW6rXUvsDE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Old TV Clips of Mahabharat on Doordarshan", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/cZRrY7-P6Rs?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Nagesh Theatre Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/7C_ys3Fv-7c?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Nagesh Theatre Movie Titles 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/ng1bBDiBL1A?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Naanu Matthu Gunda Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/pWs_VOCNYsQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Mahabharat Title Intro 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/c4t32n87MUs?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Mahabharat Title Intro", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/CXIq2iwW4bg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Mahabharat Shlok", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Q2J537NzHZY?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Mahabharat Logo", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/jW9buRnMBfc?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Mahabharat Intro 3", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/B4OnmQYcBCE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Mahabharat Intro 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/J_Kl2tQxgjM?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Ladies Special Intro", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/RZoiHMNM2Bg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kumki Trending Promo", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/kUdD8JSMBYI?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kumki 2 Trailer End Screen", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/PGFzcPb-Nh0?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kumki 2 Trailer End Screen 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Epb55Z3BWPw?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Krishna Aayo Natkhat Nandlal Final Output 002", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/raGSVUuMWvg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Khiladi Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Mms_Em6F948?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kaliveera Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/_hM26uzzcoc?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kaliveera Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/oHdq5WgrYx4?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kahani Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/QQ_BUz7kMYI?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Kahaane Trailer End Slate", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/l7BQTmXJSh0?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Jawab The Justice Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/CC9-js3RDMw?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Intro Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/GOx8V4Q86ow?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Hari Narayan", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/IBZUBOEW1is?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Guru Bina Jeevan Mein Gyan Nahi", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/qdVxJAHLAWc?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Gumnaam Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/jnodUbtF8SQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Gorilla Gang Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/6kUR7xtMnwM?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Final 25 Million Subscribers", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/ZOLboTDkLZA?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "End Screen", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/BPwphn9rgGo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "End Screen 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/w_c8NjU7yNA?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Disclaimer & Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/jj2kurXpHIU?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Disclaimer & Title 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/gwoG__nQiHE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Crime Case 99 Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/f3JzeIo0F80?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Chatrapathi 2023 Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/khEBol8xASg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Bollywood Superstars Intro", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/RadivD2izJg?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Bhakthi Movie Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/2rco6xJsOyM?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Best Of 2023 Mahabharat", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/C1vq-cNipiE?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Babbar The Police Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/7Oq1mRBMe8k?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Akhanda Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/luuuRolPuwc?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Pen Movies Presents Title", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/J9B5NanvBDU?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Pen Movies Presents Title 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/hn4XW7Ob3u8?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Acharya Movie Titles", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/812ztIjj2oQ?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "Acharya Aston Band 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/3DD5o1Ox1Uo?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "25 Million Subscribers", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/BHpFUKHlK3I?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
      { title: "10 Million Subscribers Milestone", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Cv6rXEo0Po8?autoplay=1&mute=1" allow="autoplay" allowfullscreen></iframe>` },
    ],
    Reels: [
      { title: 'Navdurga Intro Day 5 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/Z0iL6_WYq-A?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Upcoming Movies 2026 2027 Reel 01', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/gGLY_AEA6oM?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Sirivennela End Slate Screen Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/KNPuU99zEaY?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 4 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/T1YZaZuzQWc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Final Motion Poster 2', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/t9gE9aVzgks?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 3 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/nVxOCH6V6i4?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kasoombo Dialogue Reel 5', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/eMyiPo9c6tQ?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Romeo Short', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/loneTb67teQ?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 2 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/RYq6kOj-2ok?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kasoombo Dialogue Reel 4', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/cTB0S1re9Po?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kasoombo Dialogue Reel 3', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/D7HH3_O0yMQ?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 1 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/BZr5IWNrbhc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Final 25 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/Ksuidq_BTFc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kasoombo Dialogue Reel 1', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/HUw1Ab5O5QE?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Film Title Reveal', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/STRDWi6cDEc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kasoombo Comments Post', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/EMiwA4pXDhE?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Akhanda Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/38aggkQvF10?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Review Post', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/BUbh29IXOpw?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Reel End Slate', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/Z_i9NLzBUe0?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Akhanda Film Title Reveal Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/BFmGr7udYAo?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kahani Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/NTB8I0KvlF4?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Manjummel Boys Trailer Out Now', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/cvbXT4sl1eQ?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kahaani Out Now End Slate', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/wPchaXS1Am4?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 9 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/ZywfH6CAh34?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Manjummel Boys Now in Cinemas Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/iyVPAFS8P6Q?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kahaani Awards Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/F2_k69GtTXo?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 8 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/WAOn6zHB9bg?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Akhanda End Slate Screen Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/_MRY6Lo6qpg?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Instagram Review Post', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/0XBXEiD8Wgc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kumki 2 Coming Soon 02', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/8YOslsuf-7g?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 7 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/A8IksxERZxM?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Upcoming Movies 2026 2027 Reel 03', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/RGP6X9GXI0g?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Upcoming Movies 2026 2027 Reel 02', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/L62pWAPp4qA?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Kasoombo Dialogue Reel 22', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/DwqddNmdanw?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Akhanda Curiosity Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/1iKsGKYaO2Y?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Navdurga Intro Day 6 Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/EHowq-I_u0M?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Acharya Tomorrow Post Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/4IOK-pn7aF8?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Friends Forever 03', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/4CftLOlwdfc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: 'Acharya Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/LUAq7IsrchA?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: '25 Million Subscribers Reel', year: '2024', embed: `<iframe src="https://www.youtube.com/embed/2atOuaBGcrI?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Akhanda Post", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/yzynr-anyqA?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Kasoombo Post", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Ht44d978lcI?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Kasoombo Post 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/4j1q0EF71fw?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Review for Flying lokah static", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/Tw48_3qvI_k?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Kahani Mother Day Post", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/NFSIRa3Gtx0?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Kahani Mother Day Post 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/I8dM_xPnBKc?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Kahani Google Post", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/dK3L3pmOAG0?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "Kahani Google Post 2", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/zD9scAHLliI?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
      { title: "In Cinemas Now", year: "2024", embed: `<iframe src="https://www.youtube.com/embed/rSVnQeHUIoE?autoplay=1&mute=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>` },
    ],
    Images: [
      { title: 'Project Dashboard 1', year: '2024', src: 'https://drive.google.com/thumbnail?id=1GR6spS6hQyUl-NXFtWQwrDEJh-PNtE6u&sz=w1000' },
      { title: 'Project Dashboard 2', year: '2024', src: 'https://drive.google.com/thumbnail?id=1RXqsbNC8XWhUAuYsJtniOLXRWNMf8_Au&sz=w1000' },
      { title: 'Project Dashboard 3', year: '2024', src: 'https://drive.google.com/thumbnail?id=1dnvDR7np4ews-fI9f_jW0GGnj0MDNpl6&sz=w1000' },
      { title: 'Project Dashboard 4', year: '2024', src: 'https://drive.google.com/thumbnail?id=19UKyBJNVjPT1pxunlCc0Z4_BTUv0Dhbm&sz=w1000' },
      { title: 'Project Dashboard 5', year: '2024', src: 'https://drive.google.com/thumbnail?id=1pEV96D-quZWO3C7sRWRn2FeNFNEcC1Is&sz=w1000' },
      { title: 'Project Dashboard 6', year: '2024', src: 'https://drive.google.com/thumbnail?id=1X8FLv_aAc0020qKez0XtnFwLdvx9XxLx&sz=w1000' },
      { title: 'Project Dashboard 7', year: '2024', src: 'https://drive.google.com/thumbnail?id=1fGZ5_RMhoTzlF05dZWosHZ3OrYxmd0XK&sz=w1000' },
      { title: 'Project Dashboard 8', year: '2024', src: 'https://drive.google.com/thumbnail?id=1DeZcfzfZZ-LlkwYsXy_-6b5PssUrF1Zc&sz=w1000' },
      { title: 'Project Dashboard 9', year: '2024', src: 'https://drive.google.com/thumbnail?id=1NGg5brLj9oHHVzPTW1go_vtUCoshsW0L&sz=w1000' },
      { title: 'Project Dashboard 10', year: '2024', src: 'https://drive.google.com/thumbnail?id=1SxRsooy_b-S7HsV2y3y-qj-O-Bofvtnj&sz=w1000' },
      { title: 'Project Dashboard 11', year: '2024', src: 'https://drive.google.com/thumbnail?id=1DHYHuzoADGrHOA0WeyV-dHzovP84IB0c&sz=w1000' },
      { title: 'Project Dashboard 12', year: '2024', src: 'https://drive.google.com/thumbnail?id=1yo23L5DOv_w6zXBSic3MQNeK78YZ9cFr' },
      { title: 'Project Dashboard 13', year: '2024', src: 'https://drive.google.com/thumbnail?id=1p3t77ei1vARc993ad-vYBko72Ik0pz63' },
      { title: 'Project Dashboard 14', year: '2024', src: 'https://drive.google.com/thumbnail?id=1HDSPZLGaRJwuyVuGaDoKlV2vXiJon_Vi' },
      { title: 'Project Dashboard 15', year: '2024', src: 'https://drive.google.com/thumbnail?id=1cUmnNX2aHysZrSdFDiU4V9D9rVOHkG4t' },
      { title: 'Project Dashboard 16', year: '2024', src: 'https://drive.google.com/thumbnail?id=1jVrzf3APZ90ZiVN4yiIaFW66gkGc3fXX' },
      { title: 'Project Dashboard 17', year: '2024', src: 'https://drive.google.com/thumbnail?id=1HakHMeLAdmXtTZSA0MnGdoOVPIj6Fcg5' }
    ]
  }
};


// ─────────────────────────────────────────────
// 7.  DASHBOARD — OPEN / CLOSE / TAB SWITCH
// ─────────────────────────────────────────────
let currentCompany = null;
let currentTab = 'all';

/* ── Company meta colours for sidebar logo ── */
function openProjectModal(companyKey) {
  currentCompany = companyKey;
  currentTab = 'all';

  const data = projectData[companyKey];
  const meta = companyMeta[companyKey];

  // ── Hero banner ──
  const heroEl = document.getElementById('db-hero');
  const visualWrap = document.getElementById('db-hero-visual-wrap');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

  // Use dark image if in dark mode, otherwise light image
  const displayImage = (currentTheme === 'dark' && meta.imageDark) ? meta.imageDark : meta.image;

  if (displayImage) {
    visualWrap.innerHTML = `<img src="${displayImage}" alt="Company Logo" class="db-hero-visual-img">`;
    heroEl.style.backgroundImage = 'none';
  } else {
    visualWrap.innerHTML = '';
    const firstVid = data.Videos[0];
    const heroThumb = firstVid?.embed ? getYouTubeThumbnail(firstVid.embed) : null;
    heroEl.style.backgroundImage = heroThumb ? `url(${heroThumb})` : 'none';
  }

  document.getElementById('db-hero-badge').textContent = 'Featured Portfolio';
  document.getElementById('db-hero-title').textContent = data.name;
  document.getElementById('db-hero-sub').textContent   = meta.heroSub;

  // ── Render content ──
  renderDashboard(companyKey, 'all');

  // ── Show modal ──
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // BACKPORT BUGFIX: Reset scroll of main panel to top
    const dbMain = document.getElementById('db-main');
    if (dbMain) dbMain.scrollTop = 0;
  }
}

function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.body.style.overflow = '';
  currentCompany = null;
}

function dbSwitchTab(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.db-nav-btn').forEach(b => b.classList.remove('active'));
  // If btn is not the nav-btn itself (e.g., clicked from 'View All' badge), find the correct nav-btn
  const targetBtn = btn || document.querySelector(`.db-nav-btn[data-tab="${tab.toLowerCase()}"]`);
  if (targetBtn) targetBtn.classList.add('active');
  
  renderDashboard(currentCompany, tab);
  // scroll main panel to top of rows
  const dbMain = document.getElementById('db-main');
  if (dbMain) dbMain.scrollTo({ top: 0, behavior: 'smooth' });
}


// ─────────────────────────────────────────────
// 8.  RENDER DASHBOARD ROWS
// ─────────────────────────────────────────────
function renderDashboard(companyKey, tab) {
  const data = projectData[companyKey];
  const rows = document.getElementById('db-rows');
  const sections = [];

  // Toggle grid class based on tab
  if (tab === 'all') {
    rows.classList.remove('db-grid-mode');
    if (data.Videos && data.Videos.length > 0) sections.push(buildRow('Videos', data.Videos, 'Videos', 'video', companyKey));
    if (data.Reels && data.Reels.length > 0) sections.push(buildRow('Reels', data.Reels, 'Reels', 'film', companyKey, true));
    if (data.Images && data.Images.length > 0) sections.push(buildRow('Images', data.Images, 'Images', 'image', companyKey, false, true));
    rows.innerHTML = sections.join('');
  } else {
    // CATEGORY VIEW: Single category selection (Videos, Reels, or Images)
    rows.classList.remove('db-grid-mode'); 
    let items = [];
    let title = '';
    let isReel = false, isImage = false;

    if (tab === 'Videos') { items = data.Videos; title = 'Videos'; }
    else if (tab === 'Reels') { items = data.Reels; title = 'Reels'; isReel = true; }
    else if (tab === 'Images') { items = data.Images; title = 'Images'; isImage = true; }

    if (items && items.length > 0) {
      const cards = items.map(item => buildCard(item, tab.toLowerCase(), companyKey, isReel, isImage)).join('');
      rows.innerHTML = `
        <div class="db-category-wrapper">
          <div class="db-category-header">
            <span class="db-row-title">${title}</span>
            <span class="view-badge" onclick="dbSwitchTab('all', null)">Back to Dashboard</span>
          </div>
          <div class="db-grid-content">${cards}</div>
        </div>
      `;
    } else {
      rows.innerHTML = `<div class="db-empty">
        <div class="db-category-header"><span class="db-row-title">${tab}</span></div>
        <p>No ${tab.toLowerCase()} found for this project yet.</p>
      </div>`;
    }
  }
}

function buildRow(label, items, typeKey, icon, companyKey, isReel = false, isImage = false) {
  const brandIcon = isReel ? 'fa-brands' : 'fa-solid';
  const tabId = typeKey.toLowerCase();
  const countHtml = `<span class="view-badge" onclick="dbSwitchTab('${typeKey}', null)">View All</span>`;
  const header = `
    <div class="db-row-header">
      <span class="db-row-title"><i class="${brandIcon} fa-${icon}"></i>${label}</span>
      ${countHtml}
    </div>`;

  if (!items.length) {
    return `<div class="db-row">
      ${header}
      <div class="db-empty"><i class="fa-regular fa-folder-open"></i>No ${label.toLowerCase()} added yet.</div>
    </div>`;
  }

  const cards = items.map(item => buildCard(item, typeKey, companyKey, isReel, isImage)).join('');
  return `<div class="db-row">
    ${header}
    <div class="db-row-scroll">${cards}</div>
  </div>`;
}

function buildCard(item, typeKey, companyKey, isReel, isImage) {
  const typeClass = isReel ? 'reel-card' : isImage ? 'image-card' : '';
  const badgeClass = `type-${typeKey.toLowerCase().replace(/s$/, '')}`;
  const badgeLabel = isReel ? 'Reel' : isImage ? 'Image' : 'Video';

  const hasEmbed = !isImage && item.embed && item.embed.trim() !== '';
  const hasSrc   = isImage  && item.src  && item.src.trim() !== '';
  
  // Get fallback company thumb based on theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const meta = companyMeta[companyKey];
  const companyThumb = (currentTheme === 'dark' && meta?.imageDark) ? meta.imageDark : (meta?.image || '');

  // Thumbnail
  let thumbEl;
  if (hasEmbed) {
    const yt = getYouTubeThumbnail(item.embed);
    thumbEl = yt
      ? `<img class="db-card-thumb" src="${yt}" alt="${item.title}" loading="lazy" />`
      : `<img class="db-card-thumb" src="${companyThumb}" alt="${item.title}" loading="lazy" />`;
  } else if (hasSrc) {
    thumbEl = `<img class="db-card-thumb" src="${item.src}" alt="${item.title}" loading="lazy" />`;
  } else {
    thumbEl = companyThumb 
      ? `<img class="db-card-thumb" src="${companyThumb}" alt="${item.title}" loading="lazy" />`
      : `<div class="db-card-placeholder"><i class="fa-solid fa-clapperboard"></i></div>`;
  }

  const avatarBadge = '';

  // Play button only for playable media
  const playBtn = (hasEmbed)
    ? `<div class="db-play-btn"><i class="fa-solid fa-play"></i></div>`
    : '';
  const gradient = (hasEmbed || hasSrc)
    ? `<div class="db-thumb-gradient"></div>`
    : '';

  // Click handler
  const clickable = hasEmbed || hasSrc;
  
  // Create a clean item clone for the lightbox to avoid mutating the original data
  const itemForLightbox = { ...item };
  if(isReel) itemForLightbox.type = 'reel';
  if(isImage) itemForLightbox.type = 'image';
  
  const clickAttr = clickable
    ? `onclick="openLightbox('${encodeURIComponent(JSON.stringify(itemForLightbox))}')" `
    : '';

  return `
    <div class="db-card ${typeClass}" ${clickAttr}>
      <div style="position:relative; height: 100%;">
        ${thumbEl}
        ${avatarBadge}
        <span class="db-card-type ${badgeClass}">${badgeLabel}</span>
        ${playBtn}
        ${gradient}
        <div class="db-card-info">
          <div class="db-card-title">${item.title || 'Untitled Work'}</div>
          <div class="db-card-meta">${item.year || (item.src ? 'Image asset' : 'Project Detail')}</div>
        </div>
      </div>
    </div>`;
}

function getYouTubeThumbnail(embedCode) {
  const m = embedCode.match(/youtube\.com\/embed\/([^"?]+)/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : '';
}


// ─────────────────────────────────────────────
// 9.  VIDEO LIGHTBOX PLAYER
// ─────────────────────────────────────────────
const lightbox = document.getElementById('video-lightbox');

function openLightbox(itemJSON) {
  const item = JSON.parse(decodeURIComponent(itemJSON));
  if (!item.embed && !item.src) return;

  const isReel = (item.type === 'reel') || (item.embed && item.embed.includes('youtube.com/shorts'));
  const isImage = (item.type === 'image');

  if (isReel) {
    lightbox.classList.add('portrait-mode');
  } else {
    lightbox.classList.remove('portrait-mode');
  }

  const frameWrap = document.getElementById('vl-frame-wrap');
  if (isImage) {
    frameWrap.innerHTML = `<img src="${item.src}" alt="${item.title}" style="width:100%; height:100%; object-fit:contain; border-radius:12px;">`;
  } else {
    frameWrap.innerHTML = item.embed;
  }
  
  document.getElementById('vl-title').textContent    = item.title;
  document.getElementById('vl-year').textContent     = item.year || '';

  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  // Remove iframe to stop video
  document.getElementById('vl-frame-wrap').innerHTML = '';
}

document.getElementById('vl-close').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Close dashboard on overlay background click
document.getElementById('project-modal').addEventListener('click', function (e) {
  if (e.target === this) closeProjectModal();
});

// Escape key handling
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (lightbox.classList.contains('active')) { closeLightbox(); return; }
  closeProjectModal();
});

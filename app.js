// app.js - interactivity: theme, filters (reorder/highlight), charts, scroll spy, progress, accessibility
document.addEventListener('DOMContentLoaded', ()=>{
  // THEME TOGGLE (prefers + localStorage)
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (mode)=>{
    if(mode === 'light'){
      document.documentElement.style.setProperty('--bg-1','#f2f6ff');
      document.documentElement.style.setProperty('--bg-2','#eaf3ff');
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      document.documentElement.style.setProperty('--bg-1','#04050a');
      document.documentElement.style.setProperty('--bg-2','#071028');
      themeIcon.className = 'fa-solid fa-moon';
    }
  };
  setTheme(saved || (prefersDark ? 'dark' : 'dark'));
  themeToggle.addEventListener('click', ()=>{
    const current = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'dark');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    setTheme(next);
  });

  // SMOOTH SCROLL for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){ e.preventDefault(); document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // Scroll progress indicator
  const progress = document.getElementById('scroll-progress');
  const onScroll = ()=>{
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h>0 ? (window.scrollY / h) * 100 : 0;
    progress.style.width = pct + '%';
    // back to top visibility
    const backBtn = document.getElementById('back-to-top');
    if(window.scrollY>400) backBtn.style.display='block'; else backBtn.style.display='none';
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // SCROLL SPY (active nav link)
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  const spyObs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      const id = en.target.id;
      const link = document.querySelector('.nav a[href="#'+id+'"]');
      if(en.isIntersecting){ navLinks.forEach(n=>n.classList.remove('active')); if(link) link.classList.add('active'); }
    });
  },{threshold:0.45});
  sections.forEach(s=>spyObs.observe(s));

  // PROJECT FILTER: reorder & emphasize (no hiding)
  const projFilterBtns = document.querySelectorAll('.proj-filter');
  const projectsList = document.getElementById('projects-list');
  projFilterBtns.forEach(btn=>btn.addEventListener('click', ()=>{
    projFilterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    const cards = Array.from(projectsList.querySelectorAll('.project-card'));
    // emphasize matching first
    cards.sort((a,b)=>{
      if(f==='all') return 0;
      const aMatch = a.dataset.tech.includes(f) ? 0 : 1;
      const bMatch = b.dataset.tech.includes(f) ? 0 : 1;
      return aMatch - bMatch;
    });
    // reorder DOM
    cards.forEach(c=>projectsList.appendChild(c));
    // add emphasis class
    cards.forEach(c=>{ c.classList.toggle('emphasis', f!=='all' && c.dataset.tech.includes(f)); });
  }));

  // SKILL FILTER: reorder/emphasize skills (no hiding)
  const skillFilters = document.querySelectorAll('.skill-filter');
  const skillsList = document.getElementById('skills-list');
  skillFilters.forEach(btn=>btn.addEventListener('click', ()=>{
    skillFilters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    const items = Array.from(skillsList.querySelectorAll('.skill'));
    items.sort((a,b)=>{
      if(f==='all') return 0;
      const aMatch = a.dataset.cat === f ? 0 : 1;
      const bMatch = b.dataset.cat === f ? 0 : 1;
      return aMatch - bMatch;
    });
    items.forEach(i=>skillsList.appendChild(i));
    items.forEach(i=> i.classList.toggle('emphasis', f!=='all' && i.dataset.cat===f));
  }));

  // CHARTS (Chart.js) - demo realistic data
  const salesCtx = document.getElementById('salesChart');
  if(salesCtx){
    new Chart(salesCtx,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],datasets:[{label:'Monthly Revenue',data:[22,25,28,34,36,40,42,41,45,48,52,58],borderColor:'rgba(0,229,255,0.95)',backgroundColor:'rgba(0,229,255,0.08)',tension:0.3,pointRadius:3}]},options:{responsive:true,plugins:{legend:{display:false},tooltip:{mode:'index'}}}});
  }
  const segCtx = document.getElementById('segmentChart');
  if(segCtx){
    new Chart(segCtx,{type:'doughnut',data:{labels:['Top 20%','Mid 30%','Low 50%'],datasets:[{data:[60,25,15],backgroundColor:['#00E5FF','#9b6bff','#6be28a']}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}});
  }
  const chanCtx = document.getElementById('channelChart');
  if(chanCtx){
    new Chart(chanCtx,{type:'bar',data:{labels:['Email','Search','Referral','Recommendation'],datasets:[{label:'Conversion %',data:[2.4,1.8,1.2,4.6],backgroundColor:['#00E5FF','#9b6bff','#6be28a','#00E5FF']} ]},options:{responsive:true,plugins:{legend:{display:false}}}});
  }

  // IntersectionObserver reveal (subtle)
  const obs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } }); },{threshold:0.12});
  document.querySelectorAll('.card, .skill, .project-card, .viz-card, .hero-card, .hero-meta').forEach(el=>{ el.classList.add('reveal'); obs.observe(el); });

  // CONTACT form handler (no network) - accessible feedback
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const msg = form.elements['message'].value.trim();
      // Basic validation
      if(!name || !email || !msg){
        alert('모든 필드를 작성해 주세요.');
        return;
      }
      // Simulate send
      alert('메시지가 전송되었습니다. 감사합니다! (데모 전송)');
      form.reset();
    });
  }

  // Back to top
  const backBtn = document.getElementById('back-to-top');
  backBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // ensure keyboard accessible links
  document.querySelectorAll('.project-card, .skill').forEach(el=>{ el.setAttribute('tabindex', '0'); });
});

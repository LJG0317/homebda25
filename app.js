// app.js - main interactivity for portfolio
// 주요 기능: 테마 토글(prefs + localStorage), 탭/필터, 프로젝트 모달+아코디언, Chart.js 시각화,
// IntersectionObserver 기반 섹션 등장, 스무스 스크롤, Back-to-top

document.addEventListener('DOMContentLoaded', ()=>{
  // THEME TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const userPref = localStorage.getItem('theme');

  const applyTheme = (theme)=>{
    if(theme === 'light'){
      document.documentElement.style.setProperty('--bg-1','#f2f6ff');
      document.documentElement.style.setProperty('--bg-2','#eaf3ff');
      document.documentElement.style.setProperty('--glass-bg','rgba(255,255,255,0.6)');
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      document.documentElement.style.setProperty('--bg-1','#0f1020');
      document.documentElement.style.setProperty('--bg-2','#071028');
      document.documentElement.style.setProperty('--glass-bg','rgba(255,255,255,0.06)');
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // initialize theme
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(userPref) applyTheme(userPref);
  else applyTheme(prefersDark ? 'dark' : 'light');

  themeToggle.addEventListener('click', ()=>{
    const current = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
    document.body.animate([{opacity:0.95},{opacity:1}],{duration:320});
  });

  // SMOOTH SCROLL for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // PROJECT FILTER / TABS
  const tabs = document.querySelectorAll('.tab');
  const projects = document.querySelectorAll('.project-card');
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      projects.forEach(p=>{
        if(filter==='all') p.style.display='block';
        else {
          const techs = p.dataset.tech.split(' ');
          p.style.display = techs.includes(filter) ? 'block' : 'none';
        }
      });
    });
  });

  // PROJECT DETAILS (modal with accordion inside)
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = modal.querySelector('.modal-close');

  const projectDetails = {
    'p1':{
      title:'온라인 커머스 매출 분석 및 고객 세분화',
      goal:'재구매율 개선 및 핵심 고객군 도출',
      data:'주문/고객 트랜잭션 테이블, 고객 프로필, 상품 카테고리(가상 데이터 기반)',
      method:'SQL로 요약 테이블 생성 → Python(pandas)로 RFM 분석 → 세그멘테이션 → Tableau로 대시보드',
      results:'상위 20% 고객이 전체 매출의 약 60% 기여. 이탈 가능 고객군 및 잠재 우수 고객 도출.',
      recommendation:'우수 고객 대상 개인화 프로모션 및 이탈 가능 고객 재타겟팅',
      tech:'Python, SQL, Tableau'
    },
    'p2':{
      title:'매장별 매출 성과 분석 및 운영 개선',
      goal:'매출 편차 원인 분석, 운영 개선 방향 도출',
      data:'매장별 POS 데이터, 방문수, 프로모션 로그',
      method:'Excel 피벗 분석 → SQL 기반 KPI 계산 → Tableau로 지역별 패턴 시각화',
      results:'고매출 매장은 객단가 영향이 큼. 일부 프로모션은 특정 지역 의존.',
      recommendation:'고성과 매장 전략을 저성과 매장에 적용, 지역 맞춤 프로모션 운영',
      tech:'Excel, SQL, Tableau'
    },
    'p3':{
      title:'고객 이탈 분석 및 예측 (기초 모델링)',
      goal:'고객 행동으로 이탈 가능 고객 식별',
      data:'고객 행동 로그, 최근 활동, 거래 이력',
      method:'요약 테이블(SQL) → 특징 분석(python) → 로지스틱 회귀 모델',
      results:'최근 활동 감소가 이탈에 가장 큰 영향. 특정 서비스 미사용군 이탈 확률 높음.',
      recommendation:'활동 감소 고객 대상 리텐션 캠페인 및 서비스 사용 유도',
      tech:'Python, SQL, Excel'
    }
  };

  document.querySelectorAll('.details-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.project;
      const d = projectDetails[id];
      if(!d) return;
      modalContent.innerHTML = buildModalHTML(d);
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
      // add accordion listeners
      modal.querySelectorAll('.acc-toggle').forEach(t=>{
        t.addEventListener('click', ()=>{
          t.classList.toggle('open');
          const panel = t.nextElementSibling;
          if(t.classList.contains('open')) panel.style.maxHeight = panel.scrollHeight + 'px';
          else panel.style.maxHeight = null;
        });
      });
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });
  function closeModal(){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

  function buildModalHTML(d){
    return `
      <h2 id="modal-title">${d.title}</h2>
      <p><strong>Goal:</strong> ${d.goal}</p>
      <p><strong>Data:</strong> ${d.data}</p>
      <p><strong>Method:</strong> ${d.method}</p>
      <p><strong>Results:</strong> ${d.results}</p>
      <p><strong>Recommendation:</strong> ${d.recommendation}</p>
      <p><strong>Tech:</strong> ${d.tech}</p>
      <hr>
      <div class="accordion">
        <button class="acc-toggle">분석 과정 / 인사이트</button>
        <div class="acc-panel"><p>문제 정의 → 데이터 정제 → 지표 설계(RFM 등) → 세분화 → 검증 → 시각화 및 제안</p></div>
        <button class="acc-toggle">비즈니스 임팩트</button>
        <div class="acc-panel"><p>우수 고객 타깃팅을 통한 평균 재구매율 증가 및 마케팅 효율 향상 기대</p></div>
      </div>
    `;
  }

  // CHARTS (Chart.js) - Demo data (가상 데이터)
  const salesCtx = document.getElementById('salesChart');
  if(salesCtx){
    const salesChart = new Chart(salesCtx,{type:'line',data:{
      labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets:[{label:'Monthly Revenue (Demo)',data:[12,15,13,18,20,22,24,23,26,28,29,31],fill:true,backgroundColor:'rgba(126,240,255,0.12)',borderColor:'rgba(126,240,255,0.9)',tension:0.3}]
    },options:{responsive:true,plugins:{legend:{display:false},tooltip:{mode:'index'}},scales:{y:{beginAtZero:false}}});
  }

  const segCtx = document.getElementById('segmentChart');
  if(segCtx){
    const segChart = new Chart(segCtx,{type:'doughnut',data:{labels:['Top 20%','Mid 30%','Low 50%'],datasets:[{data:[60,25,15],backgroundColor:['#7ef0ff','#9b6bff','#6be28a']}]},options:{responsive:true,plugins:{legend:{position:'bottom'}}}});
  }

  // IntersectionObserver reveal
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target);} 
    });
  },{threshold:0.12});
  document.querySelectorAll('.card, .skill, .project-card, .viz-card, .hero-card, .hero-meta').forEach(el=>{ el.classList.add('reveal'); obs.observe(el); });

  // Back to top
  const backBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY>500) backBtn.style.display='block'; else backBtn.style.display='none';
  });
  backBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Accessibility: ensure accordion panels collapsed initially
  document.addEventListener('click', (e)=>{
    if(e.target.matches('.acc-toggle')){
      // handled earlier for modal accordions
    }
  });
});

// 수상경력·자격증: 항목마다 {title:'이름', date:'날짜', org:'주최·발급 기관', detail:'상세 내용'} 형태로 적는다.
// 비어 있는 목록은 "등록 예정"으로 표시된다.
const awards=[
{title:'지역기업 발굴 및 가치창출 프로그램 명칭 공모전 최우수상',date:'2023-04-24',org:'청주대학교 대학혁신사업단',detail:"수상작 '찾아보기UP'. '찾아보기'와 'UP'을 합친 이름입니다."}
];
const certs=[
{title:'Adobe Certified Professional (ACP) · Premiere Pro',org:'Adobe',date:'2026-10-29 만료',detail:'인증 종목: Digital Video Using Adobe Premiere Pro'}
];
function renderRecords(list,target,emptyText){const box=document.querySelector(target);if(!list.length){const p=document.createElement('p');p.className='record-empty';p.textContent=emptyText;box.append(p);return}list.forEach(r=>{const row=document.createElement('article');row.className='record';const main=document.createElement('div'),h=document.createElement('h3');h.textContent=r.title;main.append(h);if(r.org){const o=document.createElement('p');o.className='record-org';o.textContent=r.org;main.append(o)}if(r.detail){const d=document.createElement('p');d.textContent=r.detail;main.append(d)}row.append(main);if(r.date){const t=document.createElement('span');t.className='record-date';t.textContent=r.date;row.append(t)}box.append(row)})}
renderRecords(awards,'#awardList','수상경력 등록 예정');
renderRecords(certs,'#certList','자격증 등록 예정');
// 메뉴: 지금 보고 있는 구역의 메뉴를 강조한다.
const navLinks=[...document.querySelectorAll('.navlinks a')],navSections=navLinks.map(a=>document.querySelector(a.getAttribute('href')));
function markNav(){const line=window.innerHeight*.35;let current=0;navSections.forEach((s,i)=>{if(s.getBoundingClientRect().top<=line)current=i});if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-2&&navSections[navSections.length-1].getBoundingClientRect().top<window.innerHeight)current=Math.max(current,navSections.findLastIndex(s=>s.getBoundingClientRect().top<window.innerHeight*.8));navLinks.forEach((a,i)=>{if(i===current)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
window.addEventListener('scroll',markNav,{passive:true});window.addEventListener('resize',markNav);markNav();
// 스크롤해서 구역이 화면에 들어오면 나타난다.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.records,.about').forEach(s=>{s.classList.add('reveal');io.observe(s)})}

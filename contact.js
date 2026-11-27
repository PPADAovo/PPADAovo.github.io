// 연락처: url에 주소를 넣으면 버튼이 켜진다. 비워 두면 "준비 중"으로 표시된다.
// 이메일은 url에 'mailto:주소', text에 화면에 보여 줄 주소를 적는다.
const contacts=[
{name:'LinkedIn',url:'https://www.linkedin.com/in/ppada-/'},
{name:'Instagram',url:'https://www.instagram.com/_ppada/',text:'@_ppada'}
];
const contactToggle=document.querySelector('.contact-toggle'),contactList=document.querySelector('#contactList');
contacts.forEach((c,i)=>{const el=document.createElement(c.url?'a':'span');el.className='chan'+(c.url?'':' off');el.style.setProperty('--i',i);el.textContent=c.url?(c.text?`${c.name} · ${c.text}`:c.name):`${c.name} · 준비 중`;if(c.url){el.href=c.url;el.target='_blank';el.rel='noopener noreferrer'}contactList.append(el)});
function setContact(open){contactToggle.setAttribute('aria-expanded',String(open));contactToggle.textContent=open?'닫기':'연락하기';contactList.classList.toggle('open',open);contactList.inert=!open}
contactToggle.addEventListener('click',()=>setContact(contactToggle.getAttribute('aria-expanded')!=='true'));
setContact(false);
// 소개 칸의 수치는 프로젝트 목록에서 계산한다.
document.querySelector('#statProjects').textContent=projects.length;document.querySelector('#statLive').textContent=projects.filter(p=>p.live).length;
// 자기소개 칸: items에 ['내용','기간이나 날짜'] 형태로 적는다. 비어 있는 칸은 화면에 나오지 않는다.
const profile=[
{title:'학력',items:[['청주대학교 신소재화학과','2023 – 현재']]},
{title:'교외활동',items:[]},
{title:'자격증',items:[]},
{title:'수상',items:[]}
];
const filled=profile.filter(g=>g.items.length),about=document.querySelector('#about');
filled.forEach(g=>{const cell=document.createElement('article');cell.className='cell profile-cell'+(filled.length===1?' wide':'');const h=document.createElement('h3');h.textContent=g.title;const ul=document.createElement('ul');g.items.forEach(([text,when])=>{const li=document.createElement('li'),b=document.createElement('b');b.textContent=text;li.append(b);if(when){const t=document.createElement('span');t.textContent=when;li.append(t)}ul.append(li)});cell.append(h,ul);about.append(cell)});

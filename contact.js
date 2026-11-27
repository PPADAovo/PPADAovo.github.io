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

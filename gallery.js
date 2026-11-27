// Project covers can be replaced individually when real screenshots are available.
const fallback='default-cover.svg';
const gallery=document.createElement('section');gallery.className='project-gallery';gallery.setAttribute('aria-label','대표 이미지로 프로젝트 둘러보기');gallery.innerHTML=`<div class="deck" tabindex="0" role="region" aria-label="프로젝트 슬라이드. 좌우 방향키로 이동">${projects.map((p,i)=>`<button class="slide" type="button" data-index="${i}" aria-label="${p.name} 선택"><img src="${p.cover||fallback}" alt="${p.name}" draggable="false"><div class="slide-copy"><span>${p.category} · ${p.status}</span><strong>${p.name}</strong></div></button>`).join('')}</div>`;document.querySelector('.featured').replaceWith(gallery);
const deck=gallery.querySelector('.deck'),slides=[...deck.querySelectorAll('.slide')];let selected=0,drag=null,moved=false,raf=0,settle=0;
const motion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
const centerOf=s=>s.offsetLeft+s.offsetWidth/2;
// 화면 가운데에 가장 가까운 카드를 선택 상태로 표시한다.
function mark(){raf=0;const c=deck.scrollLeft+deck.clientWidth/2;let best=0,dist=Infinity;slides.forEach((s,i)=>{const d=Math.abs(centerOf(s)-c);if(d<dist){dist=d;best=i}});selected=best;slides.forEach((s,i)=>{const on=i===best;s.classList.toggle('active',on);s.tabIndex=on?0:-1;s.setAttribute('aria-current',String(on));s.setAttribute('aria-label',`${projects[i].name}${on?' 상세 보기':' 선택'}`)})}
function go(index){const i=Math.max(0,Math.min(slides.length-1,index));deck.scrollTo({left:centerOf(slides[i])-deck.clientWidth/2,behavior:motion()})}
deck.addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(mark)},{passive:true});
// 마우스로 잡아끌어 넘기기. 손가락 밀기는 브라우저 기본 스크롤이 처리한다.
deck.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,left:deck.scrollLeft,index:selected};moved=false});
window.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(!moved&&Math.abs(dx)>5){moved=true;clearTimeout(settle);deck.classList.add('dragging')}if(moved)deck.scrollLeft=drag.left-dx});
window.addEventListener('pointerup',e=>{if(!drag)return;const dx=e.clientX-drag.x,from=drag.index;drag=null;if(!moved)return;go(Math.abs(dx)>60?from-Math.sign(dx):from);settle=setTimeout(()=>deck.classList.remove('dragging'),520)});
deck.addEventListener('click',e=>{if(moved){moved=false;return}const s=e.target.closest('.slide');if(!s)return;const i=Number(s.dataset.index);if(i!==selected){go(i);return}const trigger=document.createElement('button');trigger.dataset.detail=projects[i].id;trigger.hidden=true;document.body.append(trigger);trigger.click();trigger.remove()});
deck.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(selected+(e.key==='ArrowRight'?1:-1))}if(e.key==='Home'){e.preventDefault();go(0)}if(e.key==='End'){e.preventDefault();go(slides.length-1)}});window.addEventListener('resize',mark);
// 상세창에는 실제 대표 이미지가 지정된 프로젝트만 이미지를 넣는다.
new MutationObserver(()=>{const body=document.querySelector('#detailBody');if(!body.querySelector('h2')||body.querySelector('.detail-cover'))return;const p=projects.find(p=>p.name===body.querySelector('h2').textContent);if(!p||!p.cover)return;const img=document.createElement('img');img.className='detail-cover';img.src=p.cover;img.alt=`${p.name} 대표 이미지`;img.onerror=()=>img.remove();body.querySelector('h2').after(img)}).observe(document.querySelector('#detailBody'),{childList:true});slides.forEach(s=>{const img=s.querySelector('img');img.onerror=()=>{img.onerror=null;img.src=fallback}});mark();

const header=document.querySelector('header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.getElementById('navigation');
const navLinks=[...nav.querySelectorAll('a[href^="#"]')];
const desktopNavigation=matchMedia('(min-width: 1181px)');
function setMenu(open,{restoreFocus=false}={}){
 nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Навигация мәзірін жабу':'Навигация мәзірін ашу');toggle.querySelector('span').textContent=open?'×':'☰';
 if(!open&&restoreFocus)toggle.focus();
}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
navLinks.forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open'))setMenu(false,{restoreFocus:true})});
document.addEventListener('click',event=>{if(nav.classList.contains('open')&&!header.contains(event.target))setMenu(false)});
desktopNavigation.addEventListener?.('change',event=>{if(event.matches)setMenu(false)});

function updateHeaderHeight(){document.documentElement.style.setProperty('--header-height',`${Math.ceil(header.getBoundingClientRect().height)}px`)}
new ResizeObserver(updateHeaderHeight).observe(header);updateHeaderHeight();

const navigationSections=navLinks.map(link=>document.querySelector(link.hash)).filter(Boolean);
const visibleSections=new Map();
function markActiveSection(){
 const candidates=[...visibleSections.entries()].filter(([,entry])=>entry.isIntersecting).sort((a,b)=>b[1].intersectionRatio-a[1].intersectionRatio||Math.abs(a[1].boundingClientRect.top)-Math.abs(b[1].boundingClientRect.top));
 const headerOffset=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))+32;let passedSection;
 for(const section of navigationSections){if(section.getBoundingClientRect().top<=headerOffset)passedSection=section}
 const active=candidates[0]?.[0]||passedSection||navigationSections[0];
 navLinks.forEach(link=>{if(link.hash===`#${active.id}`)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});
}
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>visibleSections.set(entry.target,entry));markActiveSection()},{rootMargin:'-12% 0px -58% 0px',threshold:[0,.15,.35,.6]});
navigationSections.forEach(section=>sectionObserver.observe(section));
window.addEventListener('hashchange',markActiveSection);markActiveSection();
const menuDays=['Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма'];
const dayMeals=[
 [{image:'assets/menu/day-1-meal-1.jpg',text:"Қайнатылған жұмыртқа, қызанақ пен қияр, нан, компот"},{image:'assets/menu/day-1-meal-2.jpg',text:"Сұлы печеньесі"},{image:'assets/menu/day-1-meal-3.jpg',text:"Маш сорпасы, ет қосылған макарон, ашытылған қырыққабат, компот, нан"},{image:'assets/menu/day-1-meal-4.jpg',text:"Картоп қосылған бәліш"},{image:'assets/menu/day-1-meal-5.jpg',text:"Сұлы ботқасы, компот, нан"}],
 [{image:'assets/menu/day-2-meal-1.jpg',text:"Жарма ботқасы, сары май, ыстық нан, сүтті шай"},{image:'assets/menu/day-2-meal-2.jpg',text:"Банан"},{image:'assets/menu/day-2-meal-3.jpg',text:"Тауық сорпасы, палау, сәбіз салаты, компот, нан"},{image:'assets/menu/day-2-meal-4.jpg',text:"Тәтті сүзбе"},{image:'assets/menu/day-2-meal-5.jpg',text:"Тұздық қосылған қарақұмық, компот"}],
 [{image:'assets/menu/day-3-meal-1.jpg',text:"Қаймақ қосылған құймақ, сүтсіз шай"},{image:'assets/menu/day-3-meal-2.jpg',text:"Печенье"},{image:'assets/menu/day-3-meal-3.jpg',text:"Бұршақ сорпасы, ет қосылған картоп, қияр, қызанақ, компот, нан"},{image:'assets/menu/day-3-meal-4.jpg',text:"Бельгиялық вафли, каркаде"},{image:'assets/menu/day-3-meal-5.jpg',text:"Вермишель ботқасы, компот, нан"}],
 [{image:'assets/menu/day-4-meal-1.jpg',text:"Күріш ботқасы, нан мен сары май, компот"},{image:'assets/menu/day-4-meal-2.jpg',text:"Алма"},{image:'assets/menu/day-4-meal-3.jpg',text:"Бешбармақ, жілік сорпасы, каркаде"},{image:'assets/menu/day-4-meal-4.jpg',text:"Бауырсақ, компот"},{image:'assets/menu/day-4-meal-5.jpg',text:"Йогурт"}],
 [{image:'assets/menu/day-5-meal-1.jpg',text:"Сұлы ботқасы, сары май мен нан, каркаде"},{image:'assets/menu/day-5-meal-2.jpg',text:"Вафли, какао"},{image:'assets/menu/day-5-meal-3.jpg',text:"Тефтель сорпасы, ет қосылған қарақұмық, қызылша салаты, компот, нан"},{image:'assets/menu/day-5-meal-4.jpg',text:"Тәтті бәліш"},{image:'assets/menu/day-5-meal-5.jpg',text:"Тұздық қосылған макарон, нан, компот"}]
];
const mealLabels=['Таңғы ас','Екінші таңғы ас','Түскі ас','Бесін ас','Кешкі ас'];
const menuTabs=document.getElementById('menu-tabs');
function selectMenuDay(index){
 [...menuTabs.children].forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1});
 const panel=document.getElementById('menu-panel');panel.setAttribute('aria-labelledby','menu-day-'+index);
 panel.innerHTML=`<h4>${menuDays[index]} <span>5 мезгіл тамақ</span></h4><div class="meal-cards">`+dayMeals[index].map(({image,text},i)=>`<article><img class="meal-image" src="${image}" alt="Ас мәзіріндегі тағам фотосуреті" width="251" height="251" loading="lazy"><div><span class="tag">0${i+1}</span><h5>${mealLabels[i]}</h5><p>${text}</p></div></article>`).join('')+'</div>';
}
menuDays.forEach((day,index)=>{const button=document.createElement('button');button.type='button';button.textContent=day;button.id='menu-day-'+index;button.setAttribute('role','tab');button.setAttribute('aria-controls','menu-panel');button.addEventListener('click',()=>selectMenuDay(index));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?4:(index+(event.key==='ArrowRight'?1:4))%5;selectMenuDay(next);menuTabs.children[next].focus()});menuTabs.append(button)});selectMenuDay(0);

const teamMembers=[
 ...Array.from({length:8},(_,index)=>({id:`staff-${String(index+1).padStart(2,'0')}`,image:`assets/team/staff-${String(index+1).padStart(2,'0')}.jpeg`}))
];
const teamTrack=document.getElementById('team-track');
if(teamTrack){
 teamMembers.forEach(({id,image},index)=>{
  const card=document.createElement('article');card.className='team-card';card.id=id;
  const portrait=document.createElement('img');portrait.src=image;portrait.alt=`Zeyin балабақшасы ұжымының ${index+1}-фотосуреті`;portrait.width=1024;portrait.height=1280;portrait.loading='lazy';portrait.decoding='async';
  const copy=document.createElement('div');copy.className='team-card-copy';
  const roleLabel=document.createElement('h3');roleLabel.className='team-role';roleLabel.textContent='Біздің ұжым';copy.append(roleLabel);
  card.append(portrait,copy);teamTrack.append(card);
 });
 teamTrack.closest('.team')?.querySelector('.section-notice')?.remove();
}

// Temporary event data. Set image to a local path to replace the emoji panel.
const events=[
 {id:'event-01',title:'Наурыз мерекесі',description:'Балалар ұлттық дәстүрлермен танысып, мерекелік қойылымдарға қатысты.',image:'',emoji:'🌷'},
 {id:'event-02',title:'Шығармашылық күні',description:'Балалар сурет салып, өз өнерлерін көрсетті.',image:'',emoji:'🎨'},
 {id:'event-03',title:'Көңілді старттар',description:'Балалар спорттық ойындарға белсенді қатысты.',image:'',emoji:'🏃'},
 {id:'event-04',title:'Балалық шақ мерекесі',description:'Қызықты ойындар мен көңілді сәттерге толы күн.',image:'',emoji:'🎈'},
 {id:'event-05',title:'Білім күні',description:'Балалар жаңа оқу жылын қуанышпен қарсы алды.',image:'',emoji:'📚'},
 {id:'event-06',title:'Музыка әлемі',description:'Балалар ән айтып, би билеп, өнер көрсетті.',image:'',emoji:'🎵'}
];
const eventsTrack=document.getElementById('events-track');
if(eventsTrack){
 events.forEach(({id,title,description,image,emoji})=>{
  const card=document.createElement('article');card.className='event-card';card.id=id;
  const media=document.createElement('div');media.className='event-media';
  if(image){const photo=document.createElement('img');photo.src=image;photo.alt=title;photo.loading='lazy';photo.decoding='async';media.append(photo)}
  else{media.textContent=emoji;media.setAttribute('role','img');media.setAttribute('aria-label',`${title} іс-шарасының үлгілік белгісі`)}
  const copy=document.createElement('div');copy.className='event-copy';
  const heading=document.createElement('h3');heading.textContent=title;
  const text=document.createElement('p');text.textContent=description;
  copy.append(heading,text);card.append(media,copy);eventsTrack.append(card);
 });
}

function initCarousel(carousel){
 const viewport=carousel.querySelector('.carousel-viewport');
 const track=carousel.querySelector('.carousel-track');
 const previous=carousel.querySelector('[data-prev]');
 const next=carousel.querySelector('[data-next]');
 const dots=carousel.querySelector('.carousel-dots');
 let pages=1;
 let positions=[0];
 const visibleCount=()=>Number.parseInt(getComputedStyle(track).getPropertyValue('--visible'),10)||1;
 function currentPage(){return positions.reduce((closest,position,index)=>Math.abs(position-viewport.scrollLeft)<Math.abs(positions[closest]-viewport.scrollLeft)?index:closest,0)}
 function update(){const page=currentPage();[...dots.children].forEach((dot,index)=>dot.setAttribute('aria-current',String(index===page)));previous.disabled=page===0;next.disabled=page===pages-1}
 function goTo(page){const target=Math.min(pages-1,Math.max(0,page));viewport.scrollTo({left:positions[target],behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
 function rebuild(){const visible=visibleCount();pages=Math.max(1,Math.ceil(track.children.length/visible));const gap=Number.parseFloat(getComputedStyle(track).columnGap||0);const step=(track.firstElementChild?.getBoundingClientRect().width||viewport.clientWidth)+gap;const maximum=Math.max(0,viewport.scrollWidth-viewport.clientWidth);positions=Array.from({length:pages},(_,index)=>Math.min(index*visible*step,maximum));dots.replaceChildren();for(let i=0;i<pages;i++){const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`${i+1}-бет`);dot.addEventListener('click',()=>goTo(i));dots.append(dot)}update()}
 previous.addEventListener('click',()=>goTo(currentPage()-1));next.addEventListener('click',()=>goTo(currentPage()+1));viewport.addEventListener('scroll',update,{passive:true});
 let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(rebuild,120)});
 rebuild();
}
document.querySelectorAll('[data-carousel]').forEach(initCarousel);

const groupGrid=document.querySelector('.group-grid');
if(groupGrid){
 const groups=[
  {slug:'balapan',name:'Балапан',age:'1.3–2 жас',photos:['balapan.PNG','balapan-sleeping-room.PNG']},
  {slug:'botakan',name:'Ботақан',age:'1.3–2 жас',photos:['botakan.PNG','botakan-sleeping-room.PNG']},
  {slug:'kulunshak',name:'Құлыншақ',age:'2–3 жас',photos:['kulunshak.PNG','kulunshak-sleeping-room.PNG']},
  {slug:'samga',name:'Самға',age:'2–3 жас',photos:['samga.PNG','samga-sleeping-room.PNG']},
  {slug:'baldyrgan',name:'Балдырған',age:'3–4 жас',photos:['baldyrgan.PNG','baldyrgan-sleeping-room.PNG']},
  {slug:'kunshuak',name:'Күншуақ',age:'4–5 жас',photos:[]},
  {slug:'bolashak',name:'Болашақ',age:'5–6 жас, мектепалды даярлық тобы',photos:[]}
 ];
 const columns=[document.createElement('div'),document.createElement('div')];
 columns.forEach(column=>{column.className='group-column'});
 const cards=[];
 groups.forEach(({slug,name,age,photos},index)=>{
  const card=document.createElement('article');card.className=`group-card group-tone-${index%5+1}`;card.style.setProperty('--group-order',index);
  const button=document.createElement('button');button.type='button';button.className='group-card-button';
  button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',`group-details-${index}`);
  button.innerHTML=`<img class="group-logo" src="assets/groups/logos/processed/${slug}.png" alt="${name} тобының логотипі, ${age}" width="512" height="512" loading="lazy"><span class="group-card-copy"><strong>${name}</strong></span><span class="group-toggle" aria-hidden="true">+</span>`;
  const details=document.createElement('div');details.className='group-details';details.id=`group-details-${index}`;details.hidden=true;
  details.innerHTML=photos.length?`<div class="group-photos">${photos.map((photo,photoIndex)=>`<figure><img src="assets/groups/${photo}" alt="${name} — ${photoIndex?'жатын бөлмесі':'ойын бөлмесі'}" width="1448" height="1086" loading="lazy" decoding="async"><figcaption>${photoIndex?'Жатын бөлмесі':'Ойын бөлмесі'}</figcaption></figure>`).join('')}</div>`:'<p class="group-photo-placeholder">Әзірге фотосуреттер жоқ</p>';
  button.addEventListener('click',()=>{
   const opening=button.getAttribute('aria-expanded')!=='true';
   button.setAttribute('aria-expanded',String(opening));details.hidden=!opening;
   button.querySelector('.group-toggle').textContent=opening?'−':'+';
  });
  card.append(button,details);
  cards.push(card);
 });
 const mobileGroups=matchMedia('(max-width: 650px)');
 const arrangeGroups=()=>{
  if(mobileGroups.matches)groupGrid.replaceChildren(...cards);
  else{groupGrid.replaceChildren(...columns);cards.forEach((card,index)=>columns[index%2].append(card))}
 };
 mobileGroups.addEventListener?.('change',arrangeGroups);arrangeGroups();
}

const roomSlides=[
 ['assets/groups/balapan.PNG','Балапан — Ойын бөлмесі'],['assets/groups/balapan-sleeping-room.PNG','Балапан — Жатын бөлмесі'],
 ['assets/groups/botakan.PNG','Ботақан — Ойын бөлмесі'],['assets/groups/botakan-sleeping-room.PNG','Ботақан — Жатын бөлмесі'],
 ['assets/groups/kulunshak.PNG','Құлыншақ — Ойын бөлмесі'],['assets/groups/kulunshak-sleeping-room.PNG','Құлыншақ — Жатын бөлмесі'],
 ['assets/groups/samga.PNG','Самға — Ойын бөлмесі'],['assets/groups/samga-sleeping-room.PNG','Самға — Жатын бөлмесі'],
 ['assets/groups/baldyrgan.PNG','Балдырған — Ойын бөлмесі'],['assets/groups/baldyrgan-sleeping-room.PNG','Балдырған — Жатын бөлмесі'],
 ['assets/groups/montessori-01.jpeg','Монтессори бөлмесі'],['assets/groups/montessori-02.jpeg','Монтессори кеңістігі']
];
const roomGallery=document.querySelector('.room-gallery');
if(roomGallery&&roomSlides.length){
 const image=roomGallery.querySelector('#room-gallery-image');const caption=roomGallery.querySelector('#room-gallery-caption');
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');let current=0;let timer;
 const preload=index=>{const preloadImage=new Image();preloadImage.src=roomSlides[(index+roomSlides.length)%roomSlides.length][0]};
 const show=index=>{current=(index+roomSlides.length)%roomSlides.length;const [src,label]=roomSlides[current];image.classList.add('is-changing');const swap=()=>{image.src=src;image.alt=label.toLowerCase();caption.textContent=label;image.classList.remove('is-changing');preload(current+1);preload(current-1)};if(reducedMotion.matches)swap();else setTimeout(swap,120)};
 const stop=()=>{clearInterval(timer);timer=undefined};
 const start=()=>{stop();if(!reducedMotion.matches&&!document.hidden)timer=setInterval(()=>show(current+1),3000)};
 const move=step=>{show(current+step);start()};
 roomGallery.querySelector('[data-room-prev]').addEventListener('click',()=>move(-1));roomGallery.querySelector('[data-room-next]').addEventListener('click',()=>move(1));
 roomGallery.addEventListener('pointerenter',stop);roomGallery.addEventListener('pointerleave',start);roomGallery.addEventListener('focusin',stop);roomGallery.addEventListener('focusout',event=>{if(!roomGallery.contains(event.relatedTarget))start()});
 document.addEventListener('visibilitychange',()=>document.hidden?stop():start());reducedMotion.addEventListener?.('change',start);
 show(0);start();
}

// Coordinates come from the route target attached to the verified 2GIS object
// (29A microdistrict, building 38), rather than an ambiguous text search.
const heroLabel=document.querySelector('.hero h1 > span');
if(heroLabel?.textContent.trim().toLowerCase()==='zeyin балабақшасы')heroLabel.remove();
const mapBlock=document.querySelector('.map-block');
if(mapBlock){
 const latitude='43.671713';
 const longitude='51.177019';
 const mapUrl=`https://yandex.ru/map-widget/v1/?ll=${longitude}%2C${latitude}&pt=${longitude}%2C${latitude}%2Cpm2rdm&z=17`;
 mapBlock.innerHTML=`<div class="map-address"><span class="location-pin" aria-hidden="true">⌖</span><div><span class="eyebrow">КАРТАДА</span><h3>Қазақстан, Ақтау, 29А шағын ауданы, 38</h3><p>Нүкте 2ГИС-тегі нақты объект бойынша тексерілді.</p></div></div><iframe title="Zeyin балабақшасы Яндекс Картада" src="${mapUrl}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}
const addressLink=document.querySelector('.big-contacts article:first-child > a');
if(addressLink){addressLink.classList.add('contact-icon-link');addressLink.innerHTML='<svg class="contact-social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg><span>Ақтау қаласы<br>29А шағын ауданы, 38</span>'}
const photoDialog=document.querySelector('.photo-dialog');
const photoImage=photoDialog.querySelector('img');
let photoOpener;
document.querySelectorAll('[data-menu-photo]').forEach(link=>link.addEventListener('click',event=>{
 event.preventDefault(); photoOpener=link; photoImage.src=link.href;
 photoImage.alt=link.querySelector('img').alt; photoImage.classList.remove('zoomed');
 photoDialog.showModal(); document.body.style.overflow='hidden';
}));
function closePhoto(){photoDialog.close()}
photoDialog.querySelector('.photo-close').addEventListener('click',closePhoto);
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog)closePhoto()});
photoDialog.addEventListener('close',()=>{document.body.style.overflow='';photoOpener?.focus()});
photoImage.addEventListener('click',()=>photoImage.classList.toggle('zoomed'));
const enquiryForm=document.getElementById('enquiry-form');
const groupSelect=document.getElementById('group');
if(groupSelect){
 const names=['Балапан','Ботақан','Құлыншақ','Самға','Балдырған','Күншуақ','Болашақ'];
 const help=groupSelect.lastElementChild;groupSelect.replaceChildren(groupSelect.firstElementChild);
 names.forEach(name=>{const option=document.createElement('option');option.textContent=name;groupSelect.append(option)});groupSelect.append(help);
}
enquiryForm.addEventListener('submit',event=>{
 event.preventDefault();
 if(!enquiryForm.reportValidity())return;
 const data=new FormData(enquiryForm);
 const message=`Сәлеметсіз бе! Zeyin балабақшасы туралы кеңес алғым келеді.\nАтым: ${data.get('parent').trim()}\nТоп: ${data.get('group')}\nТелефоным: ${data.get('phone').trim()}`;
 window.location.assign('https://wa.me/77029205696?text='+encodeURIComponent(message));
});

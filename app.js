const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus()}});
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

// The group cards intentionally contain neutral, editable placeholders until
// the kindergarten confirms a description, headcount and group photograph.
const groupGrid=document.querySelector('.group-grid');
if(groupGrid){
 [...groupGrid.querySelectorAll('article')].forEach((card,index)=>{
  const name=card.querySelector('h3').textContent;
  const button=document.createElement('button');
  button.type='button';button.className='group-card-button';
  button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',`group-details-${index}`);
  while(card.firstChild)button.append(card.firstChild);
  button.insertAdjacentHTML('beforeend','<span class="group-toggle" aria-hidden="true">+</span>');
  const details=document.createElement('div');details.className='group-details';details.id=`group-details-${index}`;details.hidden=true;
  details.innerHTML=`<div class="group-photo-placeholder" role="img" aria-label="${name} тобының фотосуреті кейін қосылады"><span aria-hidden="true">▧</span><small>Фотосурет кейін қосылады</small></div><div class="group-fields"><p><strong>Сипаттама</strong><span>Ақпарат кейін қосылады</span></p><p><strong>Балалар саны</strong><span>Ақпарат кейін қосылады</span></p></div>`;
  button.addEventListener('click',()=>{
   const opening=button.getAttribute('aria-expanded')!=='true';
   [...groupGrid.querySelectorAll('.group-card-button')].forEach(other=>{other.setAttribute('aria-expanded','false');other.closest('article').querySelector('.group-details').hidden=true});
   button.setAttribute('aria-expanded',String(opening));details.hidden=!opening;
  });
  card.append(button,details);
 });
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
 const routeUrl=`https://yandex.kz/maps/?rtext=~${latitude}%2C${longitude}&rtt=auto`;
 mapBlock.innerHTML=`<div class="map-address"><span class="location-pin" aria-hidden="true">⌖</span><div><span class="eyebrow">КАРТАДА</span><h3>Қазақстан, Ақтау, 29А шағын ауданы, 38</h3><p>Нүкте 2ГИС-тегі нақты объект бойынша тексерілді.</p><a class="button light" href="${routeUrl}" target="_blank" rel="noopener">Маршрут құру</a></div></div><iframe title="Zeyin балабақшасы Яндекс Картада" src="${mapUrl}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>`;
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
enquiryForm.addEventListener('submit',event=>{
 event.preventDefault();
 if(!enquiryForm.reportValidity())return;
 const data=new FormData(enquiryForm);
 const message=`Сәлеметсіз бе! Zeyin балабақшасы туралы кеңес алғым келеді.\nАтым: ${data.get('parent').trim()}\nТоп: ${data.get('group')}\nТелефоным: ${data.get('phone').trim()}`;
 window.location.assign('https://wa.me/77029205696?text='+encodeURIComponent(message));
});

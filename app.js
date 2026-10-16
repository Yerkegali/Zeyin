const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus()}});
const menuDays=['Дүйсенбі','Сейсенбі','Сәрсенбі','Бейсенбі','Жұма'];
const dayMeals=[[[130,516,205,100,"Қайнатылған жұмыртқа, қызанақ пен қияр, нан, компот"],[145,772,180,75,"Сұлы печеньесі"],[120,944,220,122,"Маш сорпасы, ет қосылған макарон, ашытылған қырыққабат, компот, нан"],[135,1265,190,100,"Картоп қосылған бәліш"],[125,1470,205,122,"Сұлы ботқасы, компот, нан"]],[[380,514,185,100,"Жарма ботқасы, сары май, ыстық нан, сүтті шай"],[395,768,155,80,"Банан"],[375,934,205,128,"Тауық сорпасы, палау, сәбіз салаты, компот, нан"],[385,1257,195,108,"Тәтті сүзбе"],[375,1470,205,110,"Тұздық қосылған қарақұмық, компот"]],[[605,510,185,103,"Қаймақ қосылған құймақ, сүтсіз шай"],[635,761,145,80,"Печенье"],[613,924,200,125,"Бұршақ сорпасы, ет қосылған картоп, қияр, қызанақ, компот, нан"],[632,1250,185,100,"Бельгиялық вафли, каркаде"],[625,1460,200,125,"Вермишель ботқасы, компот, нан"]],[[830,503,185,110,"Күріш ботқасы, нан мен сары май, компот"],[875,754,105,80,"Алма"],[845,923,200,123,"Бешбармақ, жілік сорпасы, каркаде"],[865,1247,180,95,"Бауырсақ, компот"],[885,1467,165,128,"Йогурт"]],[[1050,500,180,103,"Сұлы ботқасы, сары май мен нан, каркаде"],[1080,749,175,79,"Вафли, какао"],[1080,919,195,128,"Тефтель сорпасы, ет қосылған қарақұмық, қызылша салаты, компот, нан"],[1100,1239,185,100,"Тәтті бәліш"],[1100,1438,200,138,"Тұздық қосылған макарон, нан, компот"]]];
const mealLabels=['Таңғы ас','Екінші таңғы ас','Түскі ас','Бесін ас','Кешкі ас'];
const menuTabs=document.getElementById('menu-tabs');
function selectMenuDay(index){
 [...menuTabs.children].forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1});
 const panel=document.getElementById('menu-panel');panel.setAttribute('aria-labelledby','menu-day-'+index);
 panel.innerHTML=`<h4>${menuDays[index]} <span>5 мезгіл тамақ</span></h4><div class="meal-cards">`+dayMeals[index].map(([x,y,w,h,text],i)=>`<article><svg class="meal-photo-crop" viewBox="${x} ${y} ${w} ${h}" role="img" aria-label="${mealLabels[i]}: ${text}"><image href="assets/menu-week-2.jpg" width="1368" height="1824" preserveAspectRatio="none"/></svg><div><span class="tag">0${i+1}</span><h5>${mealLabels[i]}</h5><p>${text}</p></div></article>`).join('')+'</div>';
}
menuDays.forEach((day,index)=>{const button=document.createElement('button');button.type='button';button.textContent=day;button.id='menu-day-'+index;button.setAttribute('role','tab');button.setAttribute('aria-controls','menu-panel');button.addEventListener('click',()=>selectMenuDay(index));button.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?4:(index+(event.key==='ArrowRight'?1:4))%5;selectMenuDay(next);menuTabs.children[next].focus()});menuTabs.append(button)});selectMenuDay(0);
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

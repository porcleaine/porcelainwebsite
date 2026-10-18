var c=document.getElementById('clock');
var ap=document.getElementById('ap');
function tick(){var p=new Intl.DateTimeFormat([],{hour:'numeric',minute:'2-digit'}).formatToParts(new Date()),h='',d='';p.forEach(function(x){if(x.type==='dayPeriod')d=x.value;else if(x.type!=='literal'||h)h+=x.value});c.textContent=h.trim();ap.textContent=d}
tick();setInterval(tick,5000);

function show(v){['home','about'].forEach(function(id){var section=document.getElementById(id);if(section)section.hidden=id!==v});document.querySelectorAll('.menu a').forEach(function(m){m.classList.toggle('on',m.dataset.view===v)});window.scrollTo(0,0)}
try{if(location.hash==='#about')show('about')}catch(e){}
var toast=document.getElementById('toast'),tt;
document.querySelectorAll('.row,.menu a,.ttl,.back,.pbtn').forEach(function(a){
  a.addEventListener('click',function(e){
    if(a.getAttribute('href').charAt(0)!=='#')return;
    e.preventDefault();if(a.dataset.view){show(a.dataset.view);return}toast.textContent=a.dataset.page+' is not ready yet.';
    toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},2000);
  });
});

if(matchMedia('(pointer:fine)').matches){
  var cur=document.getElementById('cur'),ring=document.getElementById('ring');
  var x=-100,y=-100,rx=-100,ry=-100,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.documentElement.classList.add('cur-on');
  addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;
    cur.style.transform='translate('+x+'px,'+y+'px)';
    ring.classList.toggle('big',!!e.target.closest('a'));});
  (function loop(){rx+=(x-rx)*(reduce?1:.16);ry+=(y-ry)*(reduce?1:.16);
    ring.style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(loop)})();
  var glyphs=['♡','✝','♱','♥'];
  addEventListener('mousedown',function(){
    for(var i=0;i<7;i++){var s=document.createElement('div'),a=Math.random()*6.28,r=30+Math.random()*35;
      s.className='bit';s.textContent=glyphs[i%4];s.style.left=x+'px';s.style.top=y+'px';
      s.style.setProperty('--dx',Math.cos(a)*r+'px');s.style.setProperty('--dy',Math.sin(a)*r+'px');
      document.body.appendChild(s);setTimeout(function(el){el.remove()},800,s);}
  });
}
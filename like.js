/* Избранное: анимация «Сердечки» (WAAPI, без библиотек). Остальные 4 варианта — _archive/like-5variants.js.
   Like.svg — разметка сердечка внутри .Favorite_root__qyOOi
   Like.play(btn, on, variant) — проиграть анимацию; класс active ставит вызывающий код. */
(function(){
const HP='M19.787 9.431C18.699 15.046 10 19.9 10 19.9S1.301 15.045.213 9.43C-.859 3.9 2.296 1.01 5.556 1.01A4.938 4.938 0 0 1 10 3.232a4.938 4.938 0 0 1 4.444-2.222c3.26 0 6.415 2.889 5.343 8.421Z';
const svg=`<span class="lk-w"><svg class="lk-o" viewBox="0 0 20 20"><path pathLength="1" d="${HP}"/></svg><svg class="lk-f" viewBox="0 0 20 20"><path d="${HP}"/></svg></span>`;
const RED='#cd1717', GRAY='#f4f4f4';

function layer(){ let l=document.getElementById('lkfx'); if(!l){ l=document.createElement('div'); l.id='lkfx'; document.body.appendChild(l);} return l; }
function center(el){ const r=el.getBoundingClientRect(); return {x:r.left+r.width/2, y:r.top+r.height/2}; }
function spawn(html,cls,w,h){ const d=document.createElement('div'); if(cls) d.className=cls; d.style.width=w+'px'; d.style.height=h+'px'; d.style.marginLeft=(-w/2)+'px'; d.style.marginTop=(-h/2)+'px'; d.innerHTML=html||''; layer().appendChild(d); return d; }
function run(el,frames,opt){ const a=el.animate(frames,Object.assign({fill:'forwards'},opt)); a.onfinish=()=>{ if(el.parentNode && el.parentNode.id==='lkfx') el.remove(); }; return a; }
const at=(p,extra)=>`translate(${p.x}px,${p.y}px) ${extra||''}`;
const heartSVG=(c,s)=>`<svg viewBox="0 0 20 20" width="${s}" height="${s}"><path fill="${c}" d="${HP}"/></svg>`;

function bg(btn,frames,dur,delay){ btn.animate(frames.map(c=>({backgroundColor:c})),{duration:dur,delay:delay||0,fill:'backwards',easing:'ease-out'}); }

const V={
  /* 2. Сердечки: двойной удар сердца, вверх всплывают маленькие сердечки */
  2(btn,p,f,o,w){
    bg(btn,[GRAY,RED],180);
    f.animate([{transform:'scale(0)'},{transform:'scale(1.3)',offset:.3},{transform:'scale(1)',offset:.5},{transform:'scale(1.15)',offset:.7},{transform:'scale(1)'}],{duration:760,easing:'ease-out'});
    const cols=['#cd1717','#ff5e7e','#ff8fb1','#e8364a','#ff6b6b','#ffa3c1'];
    cols.forEach((c,i)=>{ const s=9+(i%3)*3, h=spawn(heartSVG(c,s),'',s,s);
      const dx=(i-2.5)*11+(i%2?6:-6), dy=-(70+(i*17)%45), rot=(i%2?1:-1)*(15+i*5);
      const q1={x:p.x+dx*.35,y:p.y+dy*.45}, q2={x:p.x+dx,y:p.y+dy};
      run(h,[{transform:at(p,'scale(.3) rotate(0deg)'),opacity:0},{transform:at(q1,`scale(1.1) rotate(${-rot/2}deg)`),opacity:1,offset:.35},{transform:at(q2,`scale(.7) rotate(${rot}deg)`),opacity:0}],{duration:900+i*60,delay:60+i*55,easing:'cubic-bezier(.3,.6,.4,1)'}); });
  }
};

function play(btn,on,variant){
  const w=btn.querySelector('.lk-w'); if(!w) return;
  const f=w.querySelector('.lk-f'), o=w.querySelector('.lk-o'), p=center(btn);
  if(!on){ bg(btn,[RED,GRAY],200);
    f.animate([{transform:'scale(1)'},{transform:'scale(0)'}],{duration:180,easing:'ease-in'});
    w.animate([{transform:'scale(1)'},{transform:'scale(.82)',offset:.5},{transform:'scale(1)'}],{duration:260});
    return; }
  (V[variant]||V[2])(btn,p,f,o,w);
}
window.Like={svg,play,HP};
})();

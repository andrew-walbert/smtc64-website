const servicesButton=document.getElementById('services-button');
if(servicesButton){servicesButton.addEventListener('click',()=>document.getElementById('services').scrollIntoView({behavior:'smooth'}));}
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const canvas=document.getElementById('network-canvas');
if(canvas){
  const ctx=canvas.getContext('2d');
  const nodes=[];
  let width=0,height=0,raf=0;
  function resizeCanvas(){
    const ratio=window.devicePixelRatio||1;
    width=canvas.clientWidth;
    height=canvas.clientHeight;
    canvas.width=width*ratio;
    canvas.height=height*ratio;
    ctx.setTransform(ratio,0,0,ratio,0,0);
    nodes.length=0;
    const count=Math.max(34,Math.floor(width/26));
    for(let i=0;i<count;i++){
      nodes.push({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*0.28,vy:(Math.random()-.5)*0.28,r:Math.random()*1.8+1.2});
    }
  }
  function drawNetwork(){
    ctx.clearRect(0,0,width,height);
    const grad=ctx.createLinearGradient(0,0,width,height);
    grad.addColorStop(0,'rgba(127,184,207,0.18)');
    grad.addColorStop(0.52,'rgba(217,238,243,0.10)');
    grad.addColorStop(1,'rgba(248,244,230,0.10)');
    ctx.fillStyle=grad;
    ctx.fillRect(0,0,width,height);
    for(const node of nodes){
      node.x+=node.vx;node.y+=node.vy;
      if(node.x<0||node.x>width)node.vx*=-1;
      if(node.y<0||node.y>height)node.vy*=-1;
    }
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
        if(dist<150){
          ctx.strokeStyle=`rgba(217,238,243,${(1-dist/150)*0.18})`;
          ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    }
    for(const node of nodes){
      ctx.fillStyle='rgba(248,244,230,0.8)';
      ctx.beginPath();ctx.arc(node.x,node.y,node.r,0,Math.PI*2);ctx.fill();
    }
    raf=requestAnimationFrame(drawNetwork);
  }
  resizeCanvas();
  drawNetwork();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resizeCanvas();drawNetwork();});
}
document.querySelectorAll('.modal-overlay').forEach(overlay=>{overlay.addEventListener('click',function(e){if(e.target===this)closeModal(this.id);});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal-overlay.open').forEach(m=>closeModal(m.id));}});
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

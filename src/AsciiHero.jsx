import React,{useEffect,useRef} from 'react';
export default function AsciiHero({text,theme,smile=false,background=false,heading=false}){
 const ref=useRef(null), palette=useRef(theme); palette.current=theme;
 useEffect(()=>{
 const c=ref.current,g=c.getContext('2d'),hero=background?window:c.parentElement,motion=matchMedia('(prefers-reduced-motion: reduce)'); let w,h,s,pixelRatio=1,points=[],stars=[],mx=-999,my=-999,frame,last=0,prev=0,smileShape=null,elapsed=0;
 function sparkle(x,y,r,outline=false){g.beginPath();g.moveTo(x,y-r);g.quadraticCurveTo(x+r*.16,y-r*.16,x+r,y);g.quadraticCurveTo(x+r*.16,y+r*.16,x,y+r);g.quadraticCurveTo(x-r*.16,y+r*.16,x-r,y);g.quadraticCurveTo(x-r*.16,y-r*.16,x,y-r);g.closePath();outline?g.stroke():g.fill();}
 function setup(){w=c.clientWidth;h=c.clientHeight;if(!w||!h)return;let d=Math.min(devicePixelRatio||1,2);pixelRatio=d;c.width=Math.round(w*d);c.height=Math.round(h*d);g.setTransform(d,0,0,d,0,0);s=heading?Math.max(1.5,Math.min(2.8,h/38)):w<480?3:Math.min(6,w/150);let a=document.createElement('canvas');a.width=Math.ceil(w/s);a.height=Math.ceil(h/s);let b=a.getContext('2d');let f=a.width*.23;b.font=`700 ${f}px "Libre Caslon Text", Georgia`;f*=Math.min(1,a.width*.78/b.measureText(text).width,a.height*.29/f);b.font=`700 ${f}px "Libre Caslon Text", Georgia`;b.fillStyle='white';b.textAlign='center';b.textBaseline='middle';if(background){/* only drifting stars */}else if(smile){const x=a.width/2,y=a.height/2,r=Math.min(a.width,a.height)*.39;smileShape={x,y,r};b.beginPath();b.arc(x,y,r,0,Math.PI*2);b.fill();}else if(heading){
 const inset=3;
 b.textAlign='left';b.textBaseline='alphabetic';
 let size=parseFloat(getComputedStyle(hero).fontSize)/s;
 const font=()=>{b.font=`700 ${size}px "Libre Caslon Text", Georgia`;};
 font();let m=b.measureText(text);
 size*=Math.min(1,(a.width-2*inset)/Math.max(1,m.width,m.actualBoundingBoxLeft+m.actualBoundingBoxRight),(a.height-2*inset)/Math.max(1,m.actualBoundingBoxAscent+m.actualBoundingBoxDescent));
 font();m=b.measureText(text);
 b.fillText(text,inset+m.actualBoundingBoxLeft,(a.height+m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2);
 }else b.fillText(text,a.width/2,a.height*.47);let data=b.getImageData(0,0,a.width,a.height).data;points=[];for(let y=0;y<a.height;y++)for(let x=0;x<a.width;x++)if(data[(y*a.width+x)*4+3]>95)points.push({x:x*s,y:y*s,dx:0,dy:0,vx:0,vy:0,k:Math.random()*5|0});stars=Array.from({length:background?Math.min(2600,Math.floor(w*h/650)):0},()=>({x:Math.random()*w,y:Math.random()*h,r:.45+Math.random()*.65,shine:0,layer:Math.random()*4|0}));paint(0,0);}
 function paint(t,dt){if(!w||!h)return;const p=palette.current;g.setTransform(pixelRatio,0,0,pixelRatio,0,0);g.clearRect(0,0,w,h);let near=null,nd=20;for(const a of stars){if(!motion.matches){a.y-= [0.22,0.36,0.55,0.11][a.layer]*dt;if(a.y< -3){a.y=h+3;a.x=Math.random()*w;}}let d=Math.hypot(mx-a.x,my-a.y);if(d<nd){near=a;nd=d;}}for(const a of stars){let target=a===near?1:0;a.shine=motion.matches?target:a.shine+(target-a.shine)*(1-Math.pow(target?.76:.945,dt));g.globalAlpha=[.25,.4,.55,.18][a.layer];g.fillStyle=p.dot;g.beginPath();g.arc(a.x,a.y,a.r,0,7);g.fill();if(a.shine>.025){g.globalAlpha=a.shine;g.fillStyle=p.shine;g.shadowBlur=14*a.shine;g.shadowColor=p.shine;sparkle(a.x,a.y,2+7*a.shine);g.shadowBlur=0;}}g.globalAlpha=1;
 const cycle=elapsed%6000, progress=Math.min(1,cycle/3000);
 const eased=progress*progress*(3-2*progress);
 const spin=smile&&!motion.matches?eased*Math.PI*6:0;
 const blend=smile&&!motion.matches?Math.max(0,Math.min(1,(cycle-400)/400,(3400-cycle)/400)):0;
 const face=smileShape;
 function hole(x,y){if(!face)return false;const r=face.r*s,fx=(x-face.x*s)/r,fy=(y-face.y*s)/r;
 for(const eye of [-.33,.33]){if(((fx-eye)/.12)**2+((fy+.23)/.19)**2<1){if(((fx-eye+.035)/.035)**2+((fy+.30)/.05)**2<1)return false;return true;}}
 const wide= .49-.38*blend, high=.27-.16*blend, center=.29-.01*blend;
 if(Math.abs(fx)>wide)return false;
 const mouthY=(fy-center)/high;
 return blend>.98? (fx/wide)**2+mouthY**2<1 : mouthY>-.48 && (fx/wide)**2+mouthY**2<1;
 }
 let px=mx,py=my;
 // Rotate points around one fixed center, never the canvas or its layout box.
 const cx=face?face.x*s:0,cy=face?face.y*s:0,cos=Math.cos(spin),sin=Math.sin(spin);
 if(smile&&face){const dx=mx-cx,dy=my-cy;px=cx+dx*cos+dy*sin;py=cy-dx*sin+dy*cos;}
 g.fillStyle=p.name;g.strokeStyle=p.name;g.lineWidth=.85;for(const a of points){let dx=a.x+a.dx-px,dy=a.y+a.dy-py,d=Math.hypot(dx,dy);if(!motion.matches){if(d<45&&d>1){let f=(1-d/45)**2*1.7;a.vx+=dx/d*f*dt;a.vy+=dy/d*f*dt;}a.vx=(a.vx-a.dx*.05*dt)*Math.pow(.82,dt);a.vy=(a.vy-a.dy*.05*dt)*Math.pow(.82,dt);a.dx+=a.vx*dt;a.dy+=a.vy*dt;if(t-last>400&&Math.random()<.025)a.k=Math.random()*5|0;}let x=a.x+a.dx,y=a.y+a.dy,r=s*.47;
 if(smile&&face){if(hole(a.x,a.y))continue;
 // Keep hover displacement local, with generous clearance around the face.
 const distance=Math.hypot(a.dx,a.dy),limit=Math.min(18,face.r*s*.10);
 if(distance>limit){a.dx*=limit/distance;a.dy*=limit/distance;a.vx*=.5;a.vy*=.5;}
 const dx=a.x+a.dx-cx,dy=a.y+a.dy-cy;
 x=cx+dx*cos-dy*sin;y=cy+dx*sin+dy*cos;
 }if(a.k<2)sparkle(x,y,r,a.k===1);else if(a.k<4){g.beginPath();g.arc(x,y,r*(a.k===2?.7:.85),0,7);a.k===2?g.fill():g.stroke();}else{g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*.75,y);g.lineTo(x,y+r);g.lineTo(x-r*.75,y);g.closePath();g.fill();}}if(t-last>400)last=t;}
 function tick(t){elapsed+=Math.min(50,t-(prev||t));paint(t,Math.min(2,(t-(prev||t))/16.67));prev=t;frame=requestAnimationFrame(tick);}
 function reset(){mx=my=-999;if(motion.matches)paint(0,0);}
 function move(e){if((background && e.target?.closest?.('header, a, button, .contact-art')) || e.target?.closest?.('.letter')){reset();return;}let r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;if(motion.matches)paint(0,0);}
 function restart(){cancelAnimationFrame(frame);prev=0;setup();if(!motion.matches)frame=requestAnimationFrame(tick);}
 const ro=new ResizeObserver(()=>{if(c.clientWidth!==w||c.clientHeight!==h)setup()});ro.observe(c);hero.addEventListener('pointermove',move);(background?document.documentElement:hero).addEventListener('pointerleave',reset);motion.addEventListener('change',restart);restart();let disposed=false;document.fonts?.ready.then(()=>{if(!disposed&&!background)setup()});const redraw=()=>paint(0,0);c.addEventListener('themechange',redraw);return()=>{disposed=true;ro.disconnect();cancelAnimationFrame(frame);hero.removeEventListener('pointermove',move);(background?document.documentElement:hero).removeEventListener('pointerleave',reset);motion.removeEventListener('change',restart);c.removeEventListener('themechange',redraw);};
 },[text,smile,background,heading]);
 useEffect(()=>{ref.current?.dispatchEvent(new Event('themechange'));},[theme]);
 return <canvas ref={ref} className={background?"global-stars":undefined} aria-hidden="true"/>;
}

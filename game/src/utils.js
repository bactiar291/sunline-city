export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)); export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y); export const angle=(x,y)=>Math.atan2(y,x); export const lerp=(a,b,t)=>a+(b-a)*t); 

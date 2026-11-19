export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const lerp=(a,b,t)=>a+(b-a)*t;
export const ang=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
export function seeded(n=1337){return()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296;};}

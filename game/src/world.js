import {CITY,VEHICLE_COLORS} from './config.js';
import {seeded,clamp,dist} from './random.js';
const r=seeded(91), road=n=>n*CITY.block+CITY.road/2;
export function makeWorld(){
 const cars=[],peds=[],pickups=[], buildings=[];
 for(let x=0;x<CITY.w;x+=CITY.block)for(let y=0;y<CITY.h;y+=CITY.block){ buildings.push({x:x+105,y:y+105,w:330,h:330,hue:Math.floor(r()*6)}); }
 for(let i=0;i<31;i++){let vertical=i%2===0, line=road(1+Math.floor(r()*5));cars.push({x:vertical?line:150+r()*(CITY.w-300),y:vertical?150+r()*(CITY.h-300):line,a:vertical?Math.PI/2:0,v:30+r()*45,color:VEHICLE_COLORS[i%VEHICLE_COLORS.length],ai:true,vertical,dead:false,police:i<2});}
 cars[2].x=480;cars[2].y=420;cars[2].a=0;cars[2].v=0;cars[2].ai=false;
 for(let i=0;i<58;i++)peds.push({x:110+r()*(CITY.w-220),y:110+r()*(CITY.h-220),a:r()*7,walk:15+r()*28,down:0});
 [[780,450,'DROP'],[1740,1080,'MEET'],[2840,1720,'VAULT'],[1120,1940,'SAFE']].forEach((q,i)=>pickups.push({x:q[0],y:q[1],label:q[2],taken:false,mission:i}));
 return {cars,peds,pickups,buildings,shots:[],particles:[],time:0};
}
export function blockAt(w,x,y){return w.buildings.find(b=>x>b.x-20&&x<b.x+b.w+20&&y>b.y-20&&y<b.y+b.h+20);}
export function bounds(o){o.x=clamp(o.x,30,CITY.w-30);o.y=clamp(o.y,30,CITY.h-30);}
export function nearbyCar(w,p){let best=null,d=65;for(const c of w.cars){const n=dist(p,c);if(!c.dead&&n<d){best=c;d=n;}}return best;}

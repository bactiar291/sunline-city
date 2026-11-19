const HOLD = new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','ShiftLeft','ShiftRight']);
const ONCE = new Set(['KeyE','KeyF','KeyP','Escape','Enter','Space','KeyR']);
export function createInput(canvas) {
  const held = new Set(); let taps = new Set(); const pointer = { x: 0, y: 0, down: false };
  window.addEventListener('keydown', e => { if (HOLD.has(e.code)) held.add(e.code); if (ONCE.has(e.code) && !e.repeat) taps.add(e.code); if (HOLD.has(e.code)||ONCE.has(e.code)) e.preventDefault(); });
  window.addEventListener('keyup', e => held.delete(e.code)); window.addEventListener('blur', () => { held.clear(); pointer.down=false; });
  canvas.addEventListener('pointermove', e => { const r=canvas.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height; });
  canvas.addEventListener('pointerdown', e => { pointer.down=true;const r=canvas.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height; }); window.addEventListener('pointerup',()=>pointer.down=false);
  return { axis(){return {x:(held.has('KeyD')||held.has('ArrowRight')?1:0)-(held.has('KeyA')||held.has('ArrowLeft')?1:0),y:(held.has('KeyS')||held.has('ArrowDown')?1:0)-(held.has('KeyW')||held.has('ArrowUp')?1:0)};}, sprint(){return held.has('ShiftLeft')||held.has('ShiftRight');}, fire(){return pointer.down||held.has('KeyF');}, take(c){const y=taps.has(c);taps.delete(c);return y;},pointer };
}

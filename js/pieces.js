export const SHAPES={I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],O:[[1,1],[1,1]],T:[[0,1,0],[1,1,1],[0,0,0]],S:[[0,1,1],[1,1,0],[0,0,0]],Z:[[1,1,0],[0,1,1],[0,0,0]],J:[[1,0,0],[1,1,1],[0,0,0]],L:[[0,0,1],[1,1,1],[0,0,0]]};
export const COLORS={I:'#35d8ff',O:'#ffd447',T:'#b578ff',S:'#52ed9a',Z:'#ff5f7c',J:'#538bff',L:'#ff9b45'};
export const TYPES=Object.keys(SHAPES);
export function rotateMatrix(m,cw=true){const n=m.length;return cw?m.map((_,y)=>m.map(row=>row[y]).reverse()):m.map((_,y)=>m.map(row=>row[n-1-y]));}
export function createBag(random=Math.random){const a=[...TYPES];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function makePiece(type){return{type,matrix:SHAPES[type].map(r=>[...r]),rotation:0,x:type==='O'?4:3,y:-1};}

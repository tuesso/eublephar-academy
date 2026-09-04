/* V6 bootstrap: core + Alan/Hector + Adventure Mode */
(()=>{
  const load=(src)=>new Promise((ok,fail)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=fail;document.head.appendChild(s)});
  load('./app-core.js')
    .then(()=>load('./alan-hector.js'))
    .then(()=>load('./v6-game.js'))
    .catch(console.error);
})();

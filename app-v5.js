/* V5 bootstrap: core + Alan/Hector personalization */
(()=>{const load=(src)=>new Promise((ok,fail)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=fail;document.head.appendChild(s)});load('./app-core.js').then(()=>load('./alan-hector.js')).catch(console.error)})();

/* Академия Эублефара V5: varied learning, magic rewards and living terrarium */
(()=>{
  "use strict";
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const today=()=>new Date().toISOString().slice(0,10);
  const pick=a=>a[Math.floor(Math.random()*a.length)];
  const shuffleV5=a=>[...a].sort(()=>Math.random()-.5);
  state.activity[today()]=(state.activity[today()]||0)+1;

  function addGeckos(){
    const hero=$(".hero-main"),terr=$(".terrarium");
    if(hero&&!$(".hero-gecko")){const i=new Image();i.src="gecko-real.webp";i.alt="Реалистичный пятнистый эублефар";i.className="real-gecko hero-gecko";hero.append(i)}
    if(terr&&!$(".terrarium-gecko")){const i=new Image();i.src="gecko-real.webp";i.alt="Эублефар в террариуме";i.className="real-gecko terrarium-gecko";terr.append(i)}
  }
  function addBanner(){
    const home=$("#homeView"); if(!home||$(".v5-banner"))return;
    const b=document.createElement("div");b.className="v5-banner";b.innerHTML="<b>Магическая Академия открыта!</b> Задания теперь меняются, за серии ответов открываются заклинания, а в террариуме живёт питомец, о котором можно заботиться.";home.prepend(b)
  }
  function addDataTools(){
    const control=$$(".parent-box").find(x=>x.textContent.includes("Сброс прогресса"));if(!control||$("#exportProgress"))return;
    const row=document.createElement("div");row.className="care-actions";row.innerHTML='<button class="secondary" id="exportProgress">⬇️ Резервная копия</button><button class="secondary" id="importProgress">⬆️ Восстановить</button><input id="progressFile" type="file" accept="application/json" hidden>';
    control.insertBefore(row,control.querySelector('.danger'));
    $("#exportProgress").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`eublephar-progress-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)};
    $("#importProgress").onclick=()=>$("#progressFile").click();$("#progressFile").onchange=async e=>{try{const parsed=JSON.parse(await e.target.files[0].text());if(!parsed||typeof parsed!=="object"||!Array.isArray(parsed.completed))throw Error();state={...defaultState,...parsed};save();magicBurst("Прогресс восстановлен!")}catch(err){toast("Файл резервной копии не распознан")}}
  }
  function improveAccessibility(){
    $("#soundBtn")?.setAttribute("aria-label","Включить или выключить звук");$(".bottomnav")?.setAttribute("aria-label","Основная навигация");
    $$(".node").forEach(n=>{n.tabIndex=0;n.setAttribute("role","button");n.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();n.click()}}})
  }
  function magicBurst(label="Волшебство знаний!"){
    let layer=$(".magic-layer");if(!layer){layer=document.createElement("div");layer.className="magic-layer";document.body.append(layer)}
    const x=innerWidth/2,y=innerHeight*.42,colors=["#ffe477","#a978ff","#67e8f9","#8cf0a6","#ff91c8"];
    const ring=document.createElement("i");ring.className="magic-ring";ring.style.left=(x-16)+"px";ring.style.top=(y-16)+"px";layer.append(ring);
    for(let i=0;i<34;i++){const s=document.createElement("i"),a=Math.random()*Math.PI*2,d=80+Math.random()*260;s.className="magic-star";s.style.left=x+"px";s.style.top=y+"px";s.style.setProperty("--c",colors[i%colors.length]);s.style.setProperty("--mx",Math.cos(a)*d+"px");s.style.setProperty("--my",Math.sin(a)*d+"px");layer.append(s)}
    const w=document.createElement("div");w.className="spell-word";w.textContent=label;w.style.left=x+"px";w.style.top=y+"px";layer.append(w);rewardSound();setTimeout(()=>layer.replaceChildren(),1500)
  }
  window.magicBurst=magicBurst;

  const lessonPools={
    "Математика":[
      ()=>{const a=12+Math.floor(Math.random()*38),b=3+Math.floor(Math.random()*8),ok=a*b;return qa(`${a} × ${b} = ?`,ok,`${a} × ${b} = ${ok}.`)},
      ()=>{const b=4+Math.floor(Math.random()*8),q=6+Math.floor(Math.random()*12),ok=b*q;return qa(`${ok} ÷ ${b} = ?`,q,`${ok} ÷ ${b} = ${q}.`)},
      ()=>{const a=100+Math.floor(Math.random()*700),b=20+Math.floor(Math.random()*180),ok=a+b;return qa(`${a} + ${b} = ?`,ok,`Сумма равна ${ok}.`)},
      ()=>{const a=300+Math.floor(Math.random()*600),b=20+Math.floor(Math.random()*200),ok=a-b;return qa(`${a} − ${b} = ?`,ok,`Разность равна ${ok}.`)}
    ],
    "English":[
      ["What does “habitat” mean?",["среда обитания","хвост","камень","скорость"],0,"habitat — среда обитания."],
      ["Choose the correct word: The gecko is active at …",["night","stone","water","tail"],0,"Leopard geckos are mainly active at night."],
      ["What does “observe” mean?",["наблюдать","кормить","рисовать","прыгать"],0,"observe — наблюдать."],
      ["Choose the plural form of “insect”.",["insects","insectes","insect's","insecting"],0,"The plural form is insects."],
      ["What does “shelter” mean?",["укрытие","влажность","пятно","масса"],0,"shelter — укрытие."]
    ],
    "O‘zbek tili":[
      ["«Kaltakesak» so‘zi nimani anglatadi?",["ящерица","камень","вода","ночь"],0,"kaltakesak — ящерица."],
      ["«Kuzatmoq» so‘zi nimani anglatadi?",["наблюдать","считать","рисовать","спать"],0,"kuzatmoq — наблюдать."],
      ["«Harorat» so‘zi nimani anglatadi?",["температура","влажность","песок","еда"],0,"harorat — температура."],
      ["«Oziq» so‘zi nimani anglatadi?",["корм","глаз","лапа","свет"],0,"oziq — корм."],
      ["«Boshpana» so‘zi nimani anglatadi?",["укрытие","хвост","воздух","учёный"],0,"boshpana — укрытие."]
    ],
    "Русский язык":[
      ["В каком слове верно выделено окончание: эублефарЫ?",["эублефары — окончание «ы»","окончания нет","окончание «фар»","окончание «ры»"],0,"Во множественном числе окончание — «ы»."],
      ["Выбери глагол.",["наблюдает","пятнистый","террариум","ночью"],0,"«Наблюдает» обозначает действие."],
      ["Выбери прилагательное.",["осторожный","укрытие","ползёт","рядом"],0,"«Осторожный» обозначает признак предмета."],
      ["Где правильно поставлена запятая?",["Ночью эублефар вышел, а утром спрятался.","Ночью, эублефар вышел а утром спрятался.","Ночью эублефар, вышел а утром спрятался.","Ночью эублефар вышел а утром спрятался."],0,"Запятая ставится перед союзом «а»."],
      ["Какое слово является существительным?",["наблюдение","точный","исследовать","быстро"],0,"«Наблюдение» называет явление."]
    ],
    "Естествознание":[
      ["Почему эублефару нужно тёплое место?",["Температура тела зависит от среды","Чтобы изменить окраску","Чтобы научиться летать","Для роста шерсти"],0,"Рептилии регулируют температуру тела, перемещаясь между зонами."],
      ["Что помогает эублефару пережить недостаток пищи?",["Запас питательных веществ в хвосте","Большие уши","Перья","Жабры"],0,"Толстый хвост служит хранилищем энергетических запасов."],
      ["Какой корм подходит насекомоядной ящерице?",["Кормовые сверчки","Конфеты","Хлеб","Трава"],0,"Эублефары питаются подходящими кормовыми насекомыми."],
      ["Зачем в террариуме термометр?",["Контролировать температурный режим","Считать корм","Измерять длину хвоста","Определять цвет"],0,"Температуру необходимо измерять, а не угадывать."],
      ["Что является наблюдением, а не предположением?",["В 21:10 животное вышло из укрытия","Ему наверняка стало скучно","Оно мечтает о пустыне","Оно решило поиграть"],0,"Наблюдение описывает зафиксированный факт."]
    ],
    "Чтение и логика":[
      ["Датчик показал 28°C вечером и 25°C утром. Что точно известно?",["Температура снизилась на 3°C","Обогреватель сломан","Эублефар заболел","Утром всегда холодно"],0,"Из данных следует только снижение на 3°C."],
      ["Сначала проверили воду, затем температуру, после этого дали корм. Что было вторым?",["Проверка температуры","Кормление","Проверка воды","Уборка"],0,"Вторым действием была проверка температуры."],
      ["Есть три укрытия: тёплое, прохладное и влажное. Какое нельзя исключить без проверки условий?",["Ни одно","Только тёплое","Только влажное","Только прохладное"],0,"Каждое укрытие выполняет свою функцию."],
      ["Камера сделала снимки в 20:00, 21:00 и 22:00. Сколько промежутков между снимками?",["2","3","1","4"],0,"Между тремя моментами времени два промежутка."],
      ["Если все сверчки — насекомые, а этот корм — сверчок, то…",["этот корм — насекомое","это растение","это минерал","вывод невозможен"],0,"Это прямой логический вывод."]
    ]
  };
  function qa(text,correct,why){let vals=new Set([correct]);while(vals.size<4)vals.add(Math.max(0,correct+Math.floor(Math.random()*21)-10));const a=shuffleV5([...vals]);return{text,a,ok:a.indexOf(correct),why}}
  function freshQuestion(base){
    const pool=lessonPools[base.sub];if(!pool)return base;
    let item=pick(pool);if(typeof item==="function"){const q=item();return{sub:base.sub,q:q.text,a:q.a,ok:q.ok,why:q.why,ctx:base.ctx}}
    return{sub:base.sub,q:item[0],a:item[1],ok:item[2],why:item[3],ctx:base.ctx}
  }
  let activeQuestion=null,answerLocked=false,correctStreak=0;
  window.renderQuestion=function(){
    const base=quizBank[state.mission][state.q];activeQuestion=freshQuestion(base);answerLocked=false;
    $("#subjectTag").textContent=activeQuestion.sub;$("#qCount").textContent=`${state.q+1} / ${quizBank[state.mission].length}`;$("#question").textContent=activeQuestion.q;
    const ctx=$("#contextBox");if(activeQuestion.ctx){ctx.textContent=activeQuestion.ctx;ctx.style.display="block"}else ctx.style.display="none";
    const ans=$("#answers");ans.replaceChildren();activeQuestion.a.forEach((t,i)=>{const b=document.createElement("button");b.className="answer-btn";b.textContent=t;b.addEventListener("click",()=>window.answer(i,b));ans.append(b)});
    $("#feedback").style.display="none";$("#nextBtn").style.display="none"
  };
  window.answer=function(i,btn){
    if(answerLocked)return;answerLocked=true;const q=activeQuestion,all=$$(".answer-btn");all.forEach(b=>b.disabled=true);
    const key=`${state.mission}-${state.q}`,fresh=!state.questionDone[key],ok=i===q.ok,gain=fresh?(ok?15:10):0;
    if(fresh){state.answered++;state.bySubject[q.sub]??={a:0,c:0};state.bySubject[q.sub].a++;state.xp+=gain;state.questionDone[key]=true;if(ok){state.correct++;state.bySubject[q.sub].c++}}
    if(ok){btn.classList.add("correct");correctStreak++;state.magicLevel=(state.magicLevel||0)+1;state.mistakes=state.mistakes.filter(x=>!(x.m===state.mission&&x.q===state.q));if(correctStreak%3===0)magicBurst(`${correctStreak} верных подряд!`);else beep(true)}
    else{btn.classList.add("wrong");all[q.ok].classList.add("correct");correctStreak=0;beep(false);if(!state.mistakes.some(x=>x.m===state.mission&&x.q===state.q))state.mistakes.push({m:state.mission,q:state.q})}
    const fb=$("#feedback");fb.style.display="block";fb.innerHTML=`<b>${ok?"Заклинание сработало!":"Руна просит проверить ответ."}</b> ${q.why}<br><span class="small">${fresh?`+${gain} XP`:`Повторение без дополнительного XP`} · серия ${correctStreak}</span>`;$("#nextBtn").style.display="inline-block";state.activity[today()]=(state.activity[today()]||0)+1;save()
  };

  function careUI(){
    const terr=$(".terrarium");if(!terr||$(".care-panel"))return;
    const p=document.createElement("div");p.className="care-panel";p.innerHTML=`${[["food","Сытость"],["water","Вода"],["clean","Чистота"],["mood","Настроение"]].map(([k,n])=>`<div class="care"><b>${n}</b><meter id="care-${k}" min="0" max="100"></meter></div>`).join("")}`;terr.append(p);
    const actions=document.createElement("div");actions.className="care-actions";actions.innerHTML='<button class="secondary" onclick="carePet(\'feed\')">🦗 Покормить</button><button class="secondary" onclick="carePet(\'water\')">💧 Дать воду</button><button class="secondary" onclick="carePet(\'clean\')">✨ Убрать</button><button class="primary" onclick="carePet(\'play\')">🪄 Поиграть</button>';terr.after(actions)
  }
  window.carePet=function(action){const t=state.terrarium;if(action==="feed")t.food=Math.min(100,t.food+22);if(action==="water")t.water=Math.min(100,t.water+25);if(action==="clean")t.clean=Math.min(100,t.clean+28);if(action==="play")t.mood=Math.min(100,t.mood+20);t.lastCare=Date.now();state.xp+=2;magicBurst(action==="feed"?"Вкусный сверчок!":"Питомец доволен!");save()};
  function updateCare(){Object.entries(state.terrarium).forEach(([k,v])=>{const m=$("#care-"+k);if(m&&typeof v==="number")m.value=v})}

  const extraGames=[
    ["lightning","⚡ Выбери ответ","Новые вопросы по разным предметам"],["runes","🔮 Рунная последовательность","Память и закономерности"],["reaction","🌟 Поймай светлячка","Реакция и внимание"],["feed","🦗 Охота эублефара","Быстрота и координация"],["habitat","🏜 Собери террариум","Знания об уходе"]
  ];
  function addGames(){const list=$(".game-list");if(!list||$("[data-game=lightning]"))return;extraGames.forEach(([id,t,d])=>{const b=document.createElement("button");b.className="game-card new-game";b.dataset.game=id;b.innerHTML=`<strong>${t}</strong><span class="fresh">Каждый раунд новый</span><span>${d}</span>`;b.onclick=()=>openGame(id,b);list.append(b)})}
  const oldOpen=window.openGame;
  window.openGame=function(id,btn=null){
    if(["lightning","runes","reaction","feed","habitat"].includes(id)){currentGame=id;$$('.game-card').forEach(x=>x.classList.toggle('active',x.dataset.game===id));$("#gameStatus").className="game-status";$("#gameStatus").textContent="Новый раунд начался.";({lightning:gameLightning,runes:gameRunes,reaction:gameReaction,feed:gameFeed,habitat:gameHabitat}[id])();return}
    oldOpen(id,btn)
  };
  function gameLightning(){setGameHeader("Молниеносная викторина","Пять случайных вопросов. При новом запуске набор изменится.");let n=0;const next=()=>{if(n++===5){gameWin("lightning-"+today(),"Пять случайных испытаний пройдены.");return}const sub=pick(Object.keys(lessonPools)),q=freshQuestion({sub});$("#gameBoard").innerHTML=`<div class="subject-tag">${sub}</div><div class="question">${q.q}</div><div class="challenge-grid">${q.a.map((a,i)=>`<button class="challenge-btn">${a}</button>`).join("")}</div><div class="small">Вопрос ${n} из 5</div>`;$$('.challenge-btn',$("#gameBoard")).forEach((b,i)=>b.onclick=()=>{if(i===q.ok){beep(true);setTimeout(next,220)}else{beep(false);b.classList.add('wrong')}})};next()}
  function gameRunes(){setGameHeader("Рунная последовательность","Запомни порядок светящихся рун и повтори его.");const glyph=["✦","◈","☾","◇","✧","⬡"],seq=Array.from({length:4+Math.floor(Math.random()*3)},()=>Math.floor(Math.random()*6));let entered=[];$("#gameBoard").innerHTML=`<div class="sequence" id="runeSeq">${seq.map(i=>glyph[i]).join(" ")}</div><div class="rune-grid">${glyph.map((g,i)=>`<button class="rune" data-i="${i}">${g}</button>`).join("")}</div>`;setTimeout(()=>$("#runeSeq").textContent="Повтори руны",1800);$$('.rune').forEach(b=>b.onclick=()=>{entered.push(+b.dataset.i);b.classList.add('selected');setTimeout(()=>b.classList.remove('selected'),180);const p=entered.length-1;if(entered[p]!==seq[p]){entered=[];beep(false);$("#gameStatus").textContent="Последовательность начни заново."}else if(entered.length===seq.length)gameWin("runes-"+today(),"Магическая последовательность восстановлена.")})}
  function gameReaction(){setGameHeader("Поймай светлячка","Жди зелёного свечения и нажми как можно быстрее.");let ready=false,start=0,timer;$("#gameBoard").innerHTML='<button class="reaction-pad" id="reactionPad">Жди…</button>';const p=$("#reactionPad");timer=setTimeout(()=>{ready=true;start=performance.now();p.classList.add('ready');p.textContent='Лови!'},1100+Math.random()*2600);p.onclick=()=>{if(!ready){clearTimeout(timer);beep(false);p.textContent='Рано! Нажми, чтобы начать снова';p.onclick=gameReaction}else{const ms=Math.round(performance.now()-start);gameWin("reaction-"+today(),`Светлячок пойман за ${ms} мс.`)}}}
  function gameFeed(){setGameHeader("Охота эублефара","Поймай восемь сверчков. Их положение каждый раз меняется.");let caught=0;$("#gameBoard").innerHTML='<div class="feed-arena" id="feedArena"></div>';const spawn=()=>{const a=$("#feedArena");a.replaceChildren();const c=document.createElement('button');c.className='cricket';c.textContent='🦗';c.style.left=(5+Math.random()*82)+'%';c.style.top=(8+Math.random()*70)+'%';c.onclick=()=>{caught++;beep(true);if(caught>=8){gameWin("feed-"+today(),"Все восемь сверчков пойманы.");state.terrarium.food=Math.min(100,state.terrarium.food+12);save()}else{document.getElementById('gameStatus').textContent=`Поймано: ${caught} из 8`;spawn()}};a.append(c)};spawn()}
  function gameHabitat(){setGameHeader("Собери правильный террариум","Выбери четыре необходимых элемента. Набор вариантов перемешивается.");const items=shuffleV5([["Термометр",1],["Укрытие",1],["Чистая вода",1],["Подходящий обогрев",1],["Конфеты",0],["Мокрая вата повсюду",0],["Яркий свет всю ночь",0],["Острые камни",0]]);let chosen=[];$("#gameBoard").innerHTML=`<div class="challenge-grid">${items.map(([t],i)=>`<button class="challenge-btn" data-i="${i}">${t}</button>`).join("")}</div><div class="actions"><button class="primary" id="habCheck">Проверить</button></div>`;$$('.challenge-btn').forEach(b=>b.onclick=()=>{b.classList.toggle('selected');chosen=chosen.includes(+b.dataset.i)?chosen.filter(x=>x!==+b.dataset.i):chosen.concat(+b.dataset.i)});$("#habCheck").onclick=()=>{const ok=chosen.length===4&&chosen.every(i=>items[i][1]);if(ok)gameWin("habitat-"+today(),"Безопасный террариум собран.");else{beep(false);$("#gameStatus").textContent="Нужно выбрать ровно четыре безопасных и необходимых элемента."}}}

  const oldMemory=window.gameMemory;
  window.gameMemory=function(){
    setGameHeader("Пары исследователя","Каждый запуск выбирает четыре новые пары слов.");
    const bank=[["tail","хвост"],["eye","глаз"],["rock","камень"],["water","вода"],["shelter","укрытие"],["insect","насекомое"],["night","ночь"],["warm","тёплый"],["sand","песок"],["observe","наблюдать"],["scale","чешуя"],["habitat","среда"]],pairs=shuffleV5(bank).slice(0,4),cards=shuffleV5(pairs.flatMap((p,i)=>[{t:p[0],p:i},{t:p[1],p:i}]));memOpen=[];memMatched=0;memLock=false;$("#gameBoard").innerHTML='<div class="memory-grid" id="memoryGrid"></div>';const g=$("#memoryGrid");cards.forEach((c,i)=>{const e=document.createElement("button");e.className="memory-card";e.dataset.p=c.p;e.dataset.i=i;e.dataset.t=c.t;e.textContent="◆";e.onclick=()=>flipMemory(e);g.append(e)})
  };

  const oldUpdate=window.updateUI;
  window.updateUI=function(){oldUpdate();updateCare();const days=$$(".activity .day"),labels=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);labels.push(d)}days.forEach((el,i)=>{const d=labels[i],key=d.toISOString().slice(0,10),n=state.activity[key]||0;el.textContent=d.toLocaleDateString('ru-RU',{weekday:'short'});el.classList.toggle('on',n>0);el.title=n?`Действий: ${n}`:'Нет занятий'});const streak=$("#streak");if(streak){let n=0,d=new Date();while(state.activity[d.toISOString().slice(0,10)]){n++;d.setDate(d.getDate()-1)}streak.textContent=Math.max(1,n)}improveAccessibility()};
  addGeckos();addBanner();careUI();addGames();addDataTools();updateUI();improveAccessibility();save();
})();

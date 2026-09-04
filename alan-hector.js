/* Персональный сюжет Академии для Алана и Гектора */
(()=>{
  'use strict';
  const PLAYER='Алан', PET='Гектор';
  const chapters=[
    ['Секретное досье Гектора','Алан замечает, что в архиве Академии появилось досье с меткой HECTOR-01. Чтобы открыть его, нужно завершить первую экспедицию.','HECTOR-01'],
    ['Ночная камера','Гектор оставил след возле ночной камеры. В записи скрыта первая координата. Следующий этап откроет её полностью.','21:40 • X=?'],
    ['Код пятнистой кожи','Узор на коже Гектора совпал с кодом в архиве. Алану предстоит проверить числа и восстановить последовательность.','SPOT-28'],
    ['Пропавшая кормовая карточка','Из лаборатории исчезла карточка кормления. На месте остались только числа, которые делятся без остатка.','240 / 5 / 10'],
    ['Сигнал после полуночи','Камера зафиксировала движение, а датчик прислал странный пакет данных. Гектор словно ведёт Алана к следующей разгадке.','CAM-05'],
    ['Дневник герпетолога','Алан находит дневник, где факты отделены от предположений. Одна страница вырвана.','LOG-FACT'],
    ['Следы в секторе B','Рядом с укрытием Гектора найдены новые следы. Нужно понять, кому они принадлежат.','SECTOR-B'],
    ['Закрытый шкаф','Координаты ведут к шкафу Академии. Замок откроется только после серии правильных ответов.','X4-Y7'],
    ['Проект MACULARIUS','Первая большая тайна раскрыта: архив относится к исследовательскому проекту MACULARIUS. Но кто его создал?','PROJECT-M'],
    ['Полевая экспедиция','Алан и Гектор получают маршрут за пределы Академии. Теперь задания связаны с движением, расстоянием и картой.','ROUTE-10'],
    ['Пустынный маяк','На маршруте найден старый маяк. Его координаты зашифрованы математическими действиями.','BEACON-11'],
    ['Две команды','Алан обнаруживает, что по маршруту движется ещё одна исследовательская группа. Нужно вычислить точку встречи.','TEAM-2'],
    ['Погоня за сигналом','Радиосигнал удаляется. Гектор замечает направление раньше приборов.','CHASE-13'],
    ['Вес находки','В рюкзаке найден неизвестный образец. Его масса — ключ к следующему коду.','MASS-14'],
    ['Ошибка в отчёте','Кто-то намеренно округлил данные неправильно. Алан должен найти ошибку.','ERR-15'],
    ['Система организма','Архив неожиданно переключается на биологические данные. Это часть старого учебного протокола.','BIO-16'],
    ['Вторая печать','Открывается второй уровень архива. Внутри — карта с отметкой хвоста Гектора.','SEAL-II'],
    ['Секрет хвоста','Почему хвост Гектора такой важный? Ответ связан с запасами энергии и дробями.','TAIL-18'],
    ['Разделить запас','Запасы лаборатории нужно распределить точно. Ошибка оставит экспедицию без нужного ресурса.','SUPPLY-19'],
    ['Дробный ключ','Код замка состоит из половин, четвертей и восьмых.','1/2 • 1/4 • 1/8'],
    ['Лаборатория дробей','Алан получает доступ к панели с неправильными и смешанными дробями.','FRACTION-21'],
    ['Шкала датчика','Датчик Гектора показывает дробные отметки. Нужно определить точное значение.','SCALE-22'],
    ['Запас воды','Экспедиция подходит к сухому сектору. Алан должен рассчитать и сохранить воду.','H2O-23'],
    ['Воздух пустыни','Датчики воздуха показывают изменение условий. В архиве появляется новая улика.','AIR-24'],
    ['Почва под лапами','След Гектора ведёт к образцу почвы. В нём спрятана часть кода.','SOIL-25'],
    ['Минеральный тайник','В образцах найдены минералы с метками старой Академии.','MINERAL-26'],
    ['Точные измерения','Чтобы открыть контейнер, нужно перейти от приблизительных значений к точным.','0.1 • 0.01'],
    ['Процент совпадения','Система сообщает: совпадение архивных данных с наблюдениями Алана — 92%.','MATCH-92%'],
    ['Третья печать','Алан открывает третью печать. До имени автора проекта остаётся шесть этапов.','SEAL-III'],
    ['Сила движения','Механизм двери запускается только после правильного объяснения силы и движения.','FORCE-30'],
    ['Испытание трением','Поверхности в лаборатории ведут себя по-разному. Гектор выбирает безопасный путь.','FRICTION-31'],
    ['Симметрия знака','На стене найден симметричный знак проекта. Его половина совпадает с жетоном Алана.','SYM-32'],
    ['Архитектор Академии','Схема старого центра раскрывает скрытую комнату. Нужно рассчитать площадь и понять развёртки тел.','LAB-33'],
    ['Финал: сообщение для Алана','Архив полностью открыт. Последний файл был оставлен будущему исследователю, который умеет наблюдать, считать и проверять гипотезы. Им оказался Алан. Гектор получает знак главного помощника Академии.','ALAN + HECTOR']
  ];
  function completed(){return Array.isArray(state?.completed)?state.completed.length:0}
  function personalize(){
    if(!state)return;
    if(!state.name||state.name==='Исследователь') state.name=PLAYER;
    state.pet5Name=PET; state.petName=PET;
    try{localStorage.setItem('ea_state_final',JSON.stringify(state))}catch(e){}
    const top=document.getElementById('profileTop');if(top)top.textContent=PLAYER;
    const name=document.getElementById('nameInput');if(name&&!name.value)name.value=PLAYER;
    ['pet5name','petNameDisplay'].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=PET});
    ['pet5input','petNameInput'].forEach(id=>{const e=document.getElementById(id);if(e)e.value=PET});
  }
  function story(){
    const n=completed(),i=Math.min(n,chapters.length-1),c=chapters[i];
    const home=document.getElementById('homeView');if(!home)return;
    let box=document.getElementById('alanStory');
    if(!box){box=document.createElement('section');box.id='alanStory';box.className='card';box.style.cssText='margin-top:16px;padding:18px;border-color:rgba(239,196,105,.25)';const quick=home.querySelector('.quick-grid');quick?.before(box)}
    box.innerHTML=`<div class="kicker">Личная экспедиция Алана • глава ${i+1}/34</div><h3 style="margin:8px 0 7px;font-size:22px">${c[0]}</h3><p style="color:#c8d1d8;line-height:1.5;margin:0">${c[1]}</p><div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><span class="pill">Улика: ${c[2]}</span><span class="pill">Открыто ${n}/34</span><span class="pill">Помощник: ${PET}</span></div>`;
    const hero=document.getElementById('heroCopy');if(hero&&n<34)hero.innerHTML=`<b>${PLAYER}</b>, ${PET} уже ждёт. Заверши экспедицию, чтобы открыть следующую часть секретного архива.`;
  }
  function teaser(){
    document.querySelectorAll('.node').forEach((node,idx)=>{
      if(node.querySelector('.alan-teaser'))return;
      const globalIndex=[...document.querySelectorAll('.node')].indexOf(node);
      const d=document.createElement('div');d.className='alan-teaser';d.style.cssText='margin-top:7px;font-size:10px;color:#d8b96f';
      d.textContent=node.classList.contains('locked')?'🔒 Секрет скрыт':node.classList.contains('done')?'✓ Улика получена':'◆ Открыть улику';node.appendChild(d)
    })
  }
  function rewardHook(){
    if(window.__alanHook)return;window.__alanHook=true;
    const old=window.nextQuestion;if(typeof old==='function')window.nextQuestion=function(){const before=completed();old.apply(this,arguments);setTimeout(()=>{if(completed()>before){magicBurst?.(`${PLAYER} и ${PET}: новая улика!`);story()}},80)};
  }
  function refresh(){personalize();story();teaser()}
  window.addEventListener('load',()=>{refresh();rewardHook();setInterval(refresh,1600)});
})();

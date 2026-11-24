(()=> {
const KEY='ct_language', words={
'КОМИКСЫ И ФАКТЫ':'COMICS & FACTS','НАВИГАТОР':'NAVIGATOR','РАЗГОВОРНИК':'PHRASEBOOK','РЕЙД':'RAID',
'Архив Черноруси':'Chernarus Archive','Добро пожаловать в информационную сеть выживших.':'Welcome to the survivors’ information network.',
'Здесь собраны материалы, заметки, истории и сведения,':'This archive contains materials, notes, stories and information',
'которые могут помочь тебе пережить ещё один день.':'that may help you survive another day.',
'История Черноруси':'History of Chernarus','Выживание':'Survival','Опасные места':'Dangerous Locations','Секретные материалы':'Classified Files',
'Архив событий, загадки заражения и информация':'An archive of events, the infection mystery and information',
'о мире после начала катастрофы.':'about the world after the outbreak.',
'Полезные сведения о поиске припасов,':'Useful information about finding supplies,',
'передвижении и выживании в опасных районах.':'travel and survival in dangerous areas.',
'Военные объекты, заражённые территории,':'Military sites, contaminated areas,',
'заброшенные поселения и тайники.':'abandoned settlements and stashes.',
'Неизвестные события, странные находки':'Unknown events, strange discoveries',
'и информация, которую лучше не игнорировать.':'and information best not ignored.',
'Сообщение системы':'System Message','Система архива запущена.':'Archive system initialized.',
'Доступ к информационным разделам открыт.':'Access to information sections granted.',
'ПОМНИ: доверять можно не каждому.':'REMEMBER: not everyone can be trusted.',
'Запасы ограничены. Любой выстрел может привлечь внимание.':'Supplies are limited. Any shot can draw attention.',
'Тактический навигатор':'Tactical Navigator','Интерактивная карта Черноруси.':'Interactive map of Chernarus.',
'Используй её для планирования маршрутов,':'Use it to plan routes,',
'поиска локаций и отметок важных мест.':'find locations and mark points of interest.',
'Разговорник выжившего':'Survivor Phrasebook','Основные термины и выражения,':'Common terms and expressions',
'которые можно встретить в общении между выжившими.':'used when survivors communicate.',
'убивать при встрече, без переговоров.':'kill on sight, without negotiation.',
'Вопрос о намерениях встреченного игрока.':'A question about the intentions of another player.',
'Предметы, оружие, еда и другие полезные вещи.':'Items, weapons, food and other useful supplies.',
'Новый игрок, который только появился на побережье.':'A new player who has just spawned on the coast.',
'Игрок с хорошим снаряжением и оружием.':'A player with good gear and weapons.',
'База или укреплённое убежище игроков.':'A player-built base or fortified shelter.',
'Единый раздел рейда':'Unified Raid Section','Калькулятор урона, справочник прочности и подготовка к выходу.':'Damage calculator, durability reference and raid preparation.',
'Тактическая карта Черноруси':'Chernarus Tactical Map','Единый раздел рейда DayZ':'DayZ Unified Raid Section',
'Мои отметки':'My Markers','Маркер':'Marker','Лут':'Loot','Отменить режим добавления':'Cancel Add Mode',
'Выбери тип отметки, затем нажми на карту.':'Choose a marker type, then click the map.',
'Фильтры карты':'Map Filters','Мои маркеры':'My Markers','Параметры отметки':'Marker Settings',
'Название отметки':'Marker Name','Военный лут':'Military Loot','Медицинский лут':'Medical Loot',
'Промышленный лут':'Industrial Loot','Охотничий лут':'Hunting Loot','Транспорт':'Vehicles','Тайник':'Stash',
'Название можно оставить пустым — система подставит стандартное.':'Leave the name blank to use the default name.',
'Управление данными':'Data Management','Экспорт отметок JSON':'Export Markers JSON',
'Импорт отметок JSON':'Import Markers JSON','Удалить все отметки':'Delete All Markers',
'Личные отметки хранятся в памяти браузера.':'Personal markers are stored in this browser.',
'Для переноса данных на другое устройство используй экспорт JSON.':'To move data to another device, export the JSON file.',
'Тактическая карта':'Tactical Map','Открыть меню':'Open menu','Без названия':'Untitled',
'Режим включён: нажми на нужное место карты.':'Mode enabled: click the desired location on the map.',
'Моя отметка':'My Marker','Файл должен содержать массив отметок':'The file must contain an array of markers',
'Удалить все личные отметки из этого браузера?':'Delete all personal markers from this browser?',
'Ошибка загрузки одного или нескольких фрагментов карты.':'One or more map tiles failed to load.',
'Карта загружается · тайлов получено:':'Loading map · tiles received:',
'Тайлы карты загружены:':'Map tiles loaded:',
'КАЛЬКУЛЯТОР':'CALCULATOR','СПРАВОЧНИК':'REFERENCE','ПОДГОТОВКА':'PREPARATION',
'ЧТО РАЗБИРАЕМ':'TARGET','Часть постройки':'Structure Part','Количество одинаковых частей':'Number of identical parts',
'Профиль данных':'Data Profile','Vanilla 1.30':'Vanilla 1.30','Свой сервер':'Custom Server',
'HP одной части':'HP per part','Множитель взрыва':'Explosive multiplier','Множитель пуль':'Bullet multiplier',
'HP / ЧАСТЬ':'HP / PART','ВСЕГО HP':'TOTAL HP','МНОЖИТЕЛЬ':'MULTIPLIER',
'ЧЕМ НАНОСИМ УРОН':'DAMAGE SOURCE','Тип атаки':'Attack Type','Взрывчатка':'Explosives','Боеприпасы':'Ammunition',
'Свой урон / мод':'Custom Damage / Mod','Предмет / патрон':'Item / Ammo','Базовый урон за попадание / взрыв':'Base damage per hit / explosion',
'Количество':'Quantity','Урон по части = базовый урон × множитель выбранной цели. Для пользовательского профиля введи параметры своего сервера.':'Damage to a structure part = base damage × target multiplier. Enter your server values when using a custom profile.',
'РАССЧИТАТЬ':'CALCULATE','ДОБАВИТЬ В ПЛАН':'ADD TO PLAN','РЕЗУЛЬТАТ':'RESULT',
'УРОН ЗА ЕДИНИЦУ':'DAMAGE PER UNIT','ЕДИНИЦ НА ЧАСТЬ':'UNITS PER PART','ЕДИНИЦ НА ВСЁ':'UNITS TOTAL',
'Выбери цель и средство урона для расчёта.':'Choose a target and damage source to calculate.',
'ОЧИСТИТЬ ПЛАН':'CLEAR PLAN','ВАЖНЫЕ ПРАВИЛА':'IMPORTANT NOTES',
'Ворота не являются отдельной повреждаемой частью.':'The gate itself is not a separate damageable part.',
'Разрушай раму/панели; после разрушения обеих рам створка падает.':'Destroy the frames/panels; the gate leaf falls once both frames are destroyed.',
'Секции стены разделены на верхнюю и нижнюю половины.':'Wall sections are split into upper and lower halves.',
'Один взрыв может задеть соседние части.':'One explosion may damage adjacent parts.',
'Калькулятор считает каждую цель отдельно и не засчитывает побочный урон соседним секциям, поэтому фактический расход иногда будет меньше.':'The calculator treats each target separately and does not include splash damage to adjacent sections, so actual usage may be lower.',
'ПРОЧНОСТЬ И МНОЖИТЕЛИ ЧАСТЕЙ':'PART DURABILITY & DAMAGE MULTIPLIERS','ЧАСТЬ':'PART','ВЗРЫВ':'EXPLOSIVE','ПУЛИ':'BULLETS',
'УРОН ВЗРЫВЧАТКИ':'EXPLOSIVE DAMAGE','ПРЕДМЕТ':'ITEM','БАЗОВЫЙ УРОН':'BASE DAMAGE',
'УРОН БОЕПРИПАСОВ':'AMMUNITION DAMAGE','КАЛИБР / ТИП':'CALIBER / TYPE','УРОН':'DAMAGE',
'Снаряжение':'Equipment','МЕДИЦИНА И ВЫЖИВАНИЕ':'MEDICAL & SURVIVAL','ПЕРЕД ВЫХОДОМ':'BEFORE DEPARTURE',
'Сколько нужно':'How Much Is Needed','ЦЕЛЬ':'TARGET','СРЕДСТВО':'SOURCE','КОЛ-ВО ЦЕЛЕЙ':'TARGET COUNT','ЕД. НА ВСЁ':'TOTAL UNITS',
'ПЛАН ПОКА ПУСТ':'PLAN IS EMPTY','Пользовательские параметры сервера.':'Custom server parameters.',
'Эта часть не повреждается напрямую. Выбери раму или панель ворот.':'This part cannot be damaged directly. Choose a frame or gate panel.',
'Укажи базовый урон больше нуля.':'Enter base damage greater than zero.',
'Нельзя добавить расчёт: у цели нет HP или не задан урон.':'Cannot add calculation: target HP or damage is missing.',
'единиц':'units','на одну часть':'per part','Лестница вышки':'Watchtower ladder','Крыша вышки':'Watchtower roof',
'Рама забора / вышки':'Fence / watchtower frame','Деревянная панель (половина)':'Wooden panel (half)',
'Металлическая панель (половина)':'Metal panel (half)','Платформа забора':'Fence platform',
'Колючая проволока':'Barbed wire','Створка ворот':'Gate leaf',
'Оружие и боеприпасы':'Weapons and ammunition','Запасной магазин':'Spare magazine',
'Взрывчатка и средства подрыва':'Explosives and detonators','Нож или инструмент':'Knife or tool',
'Средства защиты':'Protective gear','Фонарь и батарейки':'Flashlight and batteries',
'Бинты / тряпки':'Bandages / rags','Таблетки и антисептик':'Pills and disinfectant',
'Вода и еда':'Water and food','Тёплая одежда':'Warm clothing','Запасной источник света':'Backup light source',
'Проверить маршрут и точки отхода':'Check route and fallback points','Проверить состояние экипировки':'Check gear condition',
'Убедиться, что есть место в инвентаре':'Make sure inventory space is available',
'Согласовать роли и связь группы':'Agree on squad roles and communications',
'Проверить правила и настройки сервера':'Check server rules and settings',
'Верхняя и нижняя половины считаются отдельными частями.':'Upper and lower halves are counted separately.',
'Пули наносят крайне малый урон.':'Bullets deal very little damage.',
'Непосредственно не повреждается; разрушай обе рамы.':'Not directly damageable; destroy both frames.',
'Платформа секции забора.':'Fence section platform.',
'Часть watchtower.':'Part of the watchtower.',
'Радиус зоны (условные метры)':'ZONE RADIUS (APPROX. METERS)',
'Система архива запущена.':'Archive system initialized.',
'ЛИЧНЫЕ ОТМЕТКИ':'PERSONAL MARKERS'
};
const ruToEn=Object.entries(words).sort((a,b)=>b[0].length-a[0].length);
const enToRu=Object.entries(words).map(([a,b])=>[b,a]).sort((a,b)=>b[0].length-a[0].length);
function translateText(text,lang){let out=text;for(const [from,to] of (lang==='en'?ruToEn:enToRu)){out=out.split(from).join(to)}return out}
const originals=new WeakMap();
function translateNode(node,lang){if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=translateText(originals.get(node),lang)}
function translateTree(root,lang){
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
 while(node=walker.nextNode())translateNode(node,lang);
 if(root.nodeType===Node.TEXT_NODE)translateNode(root,lang);
}
function apply(lang){
lang=lang==='en'?'en':'ru';document.documentElement.lang=lang;
translateTree(document.body,lang);
document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>['placeholder','title','aria-label'].forEach(attr=>{const v=el.getAttribute(attr);if(v)el.setAttribute(attr,translateText(v,lang))}));
let b=document.getElementById('ct-lang-toggle');if(b)b.textContent=lang==='en'?'RU':'EN';
localStorage.setItem(KEY,lang);
}
function init(){
const host=document.querySelector('.system-right')||document.querySelector('.header-status')||document.querySelector('header')||document.body;
const b=document.createElement('button');b.id='ct-lang-toggle';b.type='button';b.className='ct-lang-toggle';b.textContent='EN';b.setAttribute('aria-label','Switch language / Сменить язык');b.style.cssText='margin-left:10px;padding:5px 10px;border:1px solid #6eaa75;background:#102016;color:#b6f5a9;font:600 12px Consolas,monospace;cursor:pointer;min-width:42px;z-index:1002;';host.appendChild(b);
b.addEventListener('click',()=>apply((localStorage.getItem(KEY)||'ru')==='ru'?'en':'ru'));
apply(localStorage.getItem(KEY)||'ru');
window.addEventListener('storage',e=>{if(e.key===KEY)apply(e.newValue||'ru')});
const observer=new MutationObserver(records=>{const lang=localStorage.getItem(KEY)||'ru';for(const rec of records){rec.addedNodes.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)translateNode(n,lang);else if(n.nodeType===Node.ELEMENT_NODE)translateTree(n,lang)})}});
observer.observe(document.body,{subtree:true,childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
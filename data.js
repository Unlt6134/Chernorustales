const MAP_CONFIG = {
  file: 'map.webp',   // Проверьте, чтобы имя файла в Spck совпадало (map.jpg или map.png)
  width: 4000,
  height: 4000,
  borderPx: 28,       // Ширина белой рамки по краям картинки
  realMeters: 15360   // Реальный размер Черноруси в метрах
};

const locations = [
  { name: "Березино", y: 2780, x: 3340, type: "city" },
  { name: "Старый Собор", y: 2150, x: 1620, type: "city" },
  { name: "СЗ Аэро", y: 2760, x: 1200, type: "military" },
  { name: "Черногорск", y: 620, x: 1750, type: "city" },
  { name: "Электрозаводск", y: 580, x: 2720, type: "city" }
];

const nodes = {
  "n1": { y: 2780, x: 3340 },
  "n2": { y: 2150, x: 1620 },
  "n3": { y: 2760, x: 1200 }
};

const edges = [
  { from: "n1", to: "n2", type: "highway" },
  { from: "n2", to: "n3", type: "forest" }
];

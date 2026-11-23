 const MAP_CONFIG = {
  file: 'map.webp', // ИМЯ ВАШЕГО ФАЙЛА КАРТЫ (например map.jpg или map.png)
  width: 4000,
  height: 4000,
  borderPx: 28,
  realMeters: 15360
};

let locations = [
  { name: "Березино", y: 2780, x: 3340, type: "city" },
  { name: "Старый Собор", y: 2150, x: 1620, type: "city" },
  { name: "СЗ Аэро", y: 2760, x: 1200, type: "military" }
];

let nodes = {
  "n1": { y: 2780, x: 3340 },
  "n2": { y: 2150, x: 1620 },
  "n3": { y: 2760, x: 1200 }
};

let edges = [
  { from: "n1", to: "n2", type: "highway" },
  { from: "n2", to: "n3", type: "forest" }
];

let currentMode = 'start', startNode = null, endNode = null;
let navLayers = [], editorLayers = [], lastEditedNodeId = null, editHistory = [];

const pad = MAP_CONFIG.borderPx || 0;
const imgBounds = L.latLngBounds(L.latLng(0, 0), L.latLng(MAP_CONFIG.height, MAP_CONFIG.width));
const playBounds = L.latLngBounds(L.latLng(pad, pad), L.latLng(MAP_CONFIG.height - pad, MAP_CONFIG.width - pad));

const map = L.map('map', {
  crs: L.CRS.Simple, minZoom: -3, maxZoom: 2,
  zoomControl: false, attributionControl: false,
  maxBounds: playBounds, maxBoundsViscosity: 1.0
});

L.imageOverlay(MAP_CONFIG.file, imgBounds).addTo(map);
function centerMap() { map.fitBounds(playBounds); }
centerMap();

const METERS_PER_PX = MAP_CONFIG.realMeters / (MAP_CONFIG.width - pad * 2);

locations.forEach(loc => {
  L.circleMarker(L.latLng(loc.y, loc.x), {
    radius: 4, color: loc.type === 'military' ? '#ff5252' : '#40c4ff', fillOpacity: 0.9
  }).bindTooltip(loc.name, { permanent: true, direction: 'top', offset: L.point(0, -4), className: 'city-tooltip' }).addTo(map);
});

function drawEditorGraph() {
  editorLayers.forEach(l => map.removeLayer(l));
  editorLayers = [];
  if (currentMode !== 'edit') return;

  const colors = { highway: '#ff5252', dirt: '#ffd740', forest: '#69f0ae' };
  edges.forEach(e => {
    const n1 = nodes[e.from], n2 = nodes[e.to];
    if (n1 && n2) {
      const pts = new Array(L.latLng(n1.y, n1.x), L.latLng(n2.y, n2.x));
      editorLayers.push(L.polyline(pts, { color: colors[e.type] || '#fff', weight: 3 }).addTo(map));
    }
  });

  for (const id in nodes) {
    const pos = nodes[id];
    const sel = (id === lastEditedNodeId);
    const dot = L.circleMarker(L.latLng(pos.y, pos.x), { radius: sel ? 6 : 4, color: sel ? '#ff9100' : '#fff', fillColor: sel ? '#ff9100' : '#000', fillOpacity: 1 }).addTo(map);
    dot.on('click', ev => { L.DomEvent.stopPropagation(ev); connectToExistingNode(id); });
    editorLayers.push(dot);
  }
}

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active', 'edit-active'));
  if (mode === 'edit') {
    document.getElementById('btn-edit').classList.add('edit-active');
    document.getElementById('player-controls').style.display = 'none';
    document.getElementById('editor-controls').style.display = 'block';
  } else {
    document.getElementById('btn-' + mode).classList.add('active');
    document.getElementById('player-controls').style.display = 'block';
    document.getElementById('editor-controls').style.display = 'none';
  }
  drawEditorGraph();
}

map.on('click', function(e) {
  const y = Math.round(e.latlng.lat), x = Math.round(e.latlng.lng);
  if (y < pad || y > MAP_CONFIG.height - pad || x < pad || x > MAP_CONFIG.width - pad) return;

  if (currentMode === 'edit') {
    const newId = 'n' + Date.now().toString(36);
    nodes[newId] = { y: y, x: x };
    let addedEdge = false;
    if (lastEditedNodeId) {
      edges.push({ from: lastEditedNodeId, to: newId, type: document.getElementById('road-type').value });
      addedEdge = true;
    }
    editHistory.push({ nodeId: newId, prevNodeId: lastEditedNodeId, addedEdge: addedEdge });
    lastEditedNodeId = newId;
    drawEditorGraph();
    return;
  }

  const nearest = findNearestNode(y, x);
  if (!nearest) return;
  if (currentMode === 'start') { startNode = nearest; setMode('end'); }
  else if (currentMode === 'end') { endNode = nearest; }
  updateNavigation();
});

function connectToExistingNode(id) {
  if (currentMode !== 'edit') return;
  if (lastEditedNodeId && lastEditedNodeId !== id) {
    edges.push({ from: lastEditedNodeId, to: id, type: document.getElementById('road-type').value });
    editHistory.push({ nodeId: null, prevNodeId: lastEditedNodeId, addedEdge: true });
  }
  lastEditedNodeId = id;
  drawEditorGraph();
}

function undoLastNode() {
  const last = editHistory.pop();
  if (!last) return;
  if (last.addedEdge) edges.pop();
  if (last.nodeId) delete nodes[last.nodeId];
  lastEditedNodeId = last.prevNodeId;
  drawEditorGraph();
}

function breakChain() { lastEditedNodeId = null; drawEditorGraph(); }

function exportData() {
  const code = 'let locations = ' + JSON.stringify(locations, null, 2) + ';\n\n' +
               'let nodes = ' + JSON.stringify(nodes, null, 2) + ';\n\n' +
               'let edges = ' + JSON.stringify(edges, null, 2) + ';';
  navigator.clipboard.writeText(code).then(() => alert('Код скопирован! Замените им блоки locations, nodes и edges в app.js')).catch(() => prompt('Скопируйте вручную:', code));
}

function findNearestNode(y, x) {
  let best = null, min = Infinity;
  for (const id in nodes) {
    const pos = nodes[id];
    const d = Math.hypot(pos.y - y, pos.x - x);
    if (d < min) { min = d; best = id; }
  }
  return best;
}

function resetNav() {
  startNode = null; endNode = null;
  navLayers.forEach(l => map.removeLayer(l));
  navLayers = [];
  document.getElementById('results').textContent = 'Нажмите на карту, чтобы выбрать старт и финиш.';
  setMode('start');
}

function findPath(start, goal, weights) {
  const dist = {}, prev = {}, unvisited = new Set(Object.keys(nodes));
  unvisited.forEach(n => dist[n] = Infinity);
  dist[start] = 0;

  while (unvisited.size) {
    let curr = null;
    for (const n of unvisited) if (curr === null || dist[n] < dist[curr]) curr = n;
    if (curr === goal || dist[curr] === Infinity) break;
    unvisited.delete(curr);

    edges.filter(e => e.from === curr || e.to === curr).forEach(e => {
      const next = e.from === curr ? e.to : e.from;
      if (!unvisited.has(next)) return;
      const d = Math.hypot(nodes[curr].y - nodes[next].y, nodes[curr].x - nodes[next].x);
      const cost = d * (weights[e.type] || 1);
      if (dist[curr] + cost < dist[next]) { dist[next] = dist[curr] + cost; prev[next] = curr; }
    });
  }

  const path = [];
  let c = goal, px = 0;
  while (c) {
    path.unshift(nodes[c]);
    if (prev[c]) px += Math.hypot(nodes[c].y - nodes[prev[c]].y, nodes[c].x - nodes[prev[c]].x);
    c = prev[c];
  }
  return { path: path, meters: Math.round(px * METERS_PER_PX) };
}

function updateNavigation() {
  navLayers.forEach(l => map.removeLayer(l));
  navLayers = [];
  if (startNode) navLayers.push(L.marker(L.latLng(nodes[startNode].y, nodes[startNode].x)).bindPopup('Старт').addTo(map));
  if (endNode) navLayers.push(L.marker(L.latLng(nodes[endNode].y, nodes[endNode].x)).bindPopup('Финиш').addTo(map));
  if (!startNode || !endNode) return;

  const profiles = [
    { name: 'Быстрый (опасно)', color: '#ff5252', off: 0, w: { highway: 0.6, dirt: 1.0, forest: 2.2 } },
    { name: 'Средний', color: '#ffd740', off: 5, w: { highway: 1.0, dirt: 1.0, forest: 1.0 } },
    { name: 'Безопасный (лес)', color: '#69f0ae', off: -5, w: { highway: 3.0, dirt: 1.2, forest: 0.7 } }
  ];

  let html = '';
  profiles.forEach(p => {
    const res = findPath(startNode, endNode, p.w);
    if (res.path.length > 1) {
      const shifted = res.path.map(pt => L.latLng(pt.y + p.off, pt.x + p.off));
      navLayers.push(L.polyline(shifted, { color: p.color, weight: 4 }).addTo(map));
      html += '<div class="route-card" style="border-color:' + p.color + '"><span><b>' + p.name + '</b></span><span>' + (res.meters / 1000).toFixed(2) + ' км</span></div>';
    }
  });
  document.getElementById('results').innerHTML = html || 'Нет связи между точками.';
}

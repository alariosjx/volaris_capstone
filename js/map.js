// Route map — D3 + TopoJSON
// Real country borders, great-circle arcs, Bloomberg/Volaris styling

const AIRPORTS = {
  LAX: { name: "Los Angeles",     lng: -118.408, lat: 33.943,  label: "Los Angeles",   labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  OAK: { name: "Oakland",         lng: -122.221, lat: 37.721,  label: "Oakland",        labelAnchor: "end",   labelDx: -7, labelDy: -5 },
  SFO: { name: "San Francisco",   lng: -122.375, lat: 37.619,  label: "",               labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  SJC: { name: "San Jose",        lng: -121.929, lat: 37.363,  label: "",               labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  FAT: { name: "Fresno",          lng: -119.718, lat: 36.776,  label: "Fresno",         labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  ONT: { name: "Ontario",         lng: -117.6,   lat: 34.056,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  SAN: { name: "San Diego",       lng: -117.19,  lat: 32.733,  label: "San Diego",      labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  ORD: { name: "Chicago",         lng: -87.904,  lat: 41.978,  label: "Chicago",        labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  MDW: { name: "Chicago Midway",  lng: -87.752,  lat: 41.786,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  DEN: { name: "Denver",          lng: -104.673, lat: 39.856,  label: "Denver",         labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  LAS: { name: "Las Vegas",       lng: -115.152, lat: 36.08,   label: "Las Vegas",      labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  PHX: { name: "Phoenix",         lng: -112.012, lat: 33.437,  label: "Phoenix",        labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  IAH: { name: "Houston",         lng: -95.279,  lat: 29.984,  label: "Houston",        labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  DAL: { name: "Dallas",          lng: -96.851,  lat: 32.847,  label: "Dallas",         labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  SAT: { name: "San Antonio",     lng: -98.47,   lat: 29.533,  label: "San Antonio",    labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  AUS: { name: "Austin",          lng: -97.669,  lat: 30.198,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  NYC: { name: "New York",        lng: -73.779,  lat: 40.64,   label: "New York",       labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  DET: { name: "Detroit",         lng: -83.353,  lat: 42.212,  label: "Detroit",        labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  SLC: { name: "Salt Lake City",  lng: -111.978, lat: 40.788,  label: "Salt Lake",      labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  GDL: { name: "Guadalajara",     lng: -103.31,  lat: 20.521,  label: "Guadalajara",    labelAnchor: "end",   labelDx: -7, labelDy: -5 },
  MEX: { name: "Mexico City",     lng: -99.072,  lat: 19.436,  label: "Mexico City",    labelAnchor: "start", labelDx: 7,  labelDy: -5 },
  MTY: { name: "Monterrey",       lng: -100.107, lat: 25.779,  label: "Monterrey",      labelAnchor: "end",   labelDx: -7, labelDy: -5 },
  TIJ: { name: "Tijuana",         lng: -116.97,  lat: 32.541,  label: "Tijuana",        labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  CUN: { name: "Cancún",          lng: -86.877,  lat: 21.037,  label: "Cancún",         labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  ZCL: { name: "Zacatecas",       lng: -102.687, lat: 22.897,  label: "Zacatecas",      labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  MLM: { name: "Morelia",         lng: -101.025, lat: 19.85,   label: "Morelia",        labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  BJX: { name: "León",            lng: -101.481, lat: 20.993,  label: "León",           labelAnchor: "end",   labelDx: -7, labelDy: 3  },
  SLP: { name: "San Luis Potosí", lng: -100.931, lat: 22.254,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  CUL: { name: "Culiacán",        lng: -107.474, lat: 24.765,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  MZT: { name: "Mazatlán",        lng: -106.266, lat: 23.162,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  HMO: { name: "Hermosillo",      lng: -111.048, lat: 29.096,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  CJS: { name: "Juárez",          lng: -106.428, lat: 31.636,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  OAX: { name: "Oaxaca",          lng: -96.726,  lat: 17.0,    label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  VSA: { name: "Villahermosa",    lng: -92.817,  lat: 17.997,  label: "",               labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  GUA: { name: "Guatemala City",  lng: -90.528,  lat: 14.583,  label: "Guatemala City", labelAnchor: "start", labelDx: 7,  labelDy: 3  },
  SAL: { name: "San Salvador",    lng: -89.055,  lat: 13.44,   label: "San Salvador",   labelAnchor: "start", labelDx: 7,  labelDy: 3  },
};

const ROUTES = [
  // Volaris-only
  ["OAK", "GDL", "volaris"], ["OAK", "ZCL", "volaris"], ["OAK", "MLM", "volaris"],
  ["FAT", "GDL", "volaris"], ["FAT", "ZCL", "volaris"],
  ["SJC", "GDL", "volaris"], ["SJC", "MLM", "volaris"],
  ["ONT", "GDL", "volaris"], ["ONT", "MLM", "volaris"],
  ["DEN", "GDL", "volaris"], ["DEN", "MTY", "volaris"],
  ["SAT", "GDL", "volaris"], ["AUS", "MTY", "volaris"],
  ["NYC", "CUN", "volaris"],
  ["DET", "GDL", "volaris"], ["SLC", "GDL", "volaris"],
  ["GDL", "GUA", "volaris"], ["MEX", "SAL", "volaris"],
  // Viva-only
  ["LAX", "MEX", "viva"], ["LAX", "CUL", "viva"], ["LAX", "HMO", "viva"],
  ["SAN", "TIJ", "viva"], ["SAN", "GDL", "viva"],
  ["DAL", "MTY", "viva"], ["DAL", "MEX", "viva"],
  ["IAH", "GDL", "viva"], ["IAH", "MEX", "viva"],
  ["PHX", "HMO", "viva"], ["PHX", "CJS", "viva"],
  ["MEX", "GUA", "viva"],
  // Overlap — both carriers compete
  ["OAK", "MTY", "overlap"], ["FAT", "BJX", "overlap"],
  ["SFO", "GDL", "overlap"], ["SFO", "MTY", "overlap"],
  ["LAX", "GDL", "overlap"], ["LAX", "MTY", "overlap"],
  ["ORD", "GDL", "overlap"], ["ORD", "MTY", "overlap"],
  ["MDW", "GDL", "overlap"],
  ["LAS", "GDL", "overlap"], ["LAS", "MTY", "overlap"],
  ["IAH", "MTY", "overlap"], ["PHX", "GDL", "overlap"],
];

const LABEL_ALWAYS = new Set([
  "OAK","LAX","ORD","GDL","MEX","MTY","CUN","GUA",
  "NYC","FAT","DEN","IAH","DAL","SAN","PHX","LAS","SLC","DET",
]);

const ROUTE_STYLES = {
  volaris: { stroke: "#a12985", width: 1.1, opacity: 0.55, dash: "5,3", glowFilter: false },
  viva:    { stroke: "#016928", width: 1.1, opacity: 0.55, dash: "5,3", glowFilter: false },
  overlap: { stroke: "#ea8b01", width: 2.0, opacity: 0.85, dash: null,  glowFilter: true  },
};

// Cached world data so we only fetch once
let _worldCache = null;

async function getWorld() {
  if (_worldCache) return _worldCache;
  const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
  if (!res.ok) throw new Error("fetch failed");
  _worldCache = await res.json();
  return _worldCache;
}

async function initMap(activeFilter) {
  const container = document.getElementById("route-map-container");
  if (!container) return;

  container.innerHTML = "";

  const W = container.offsetWidth > 0 ? container.offsetWidth : 900;
  const H = Math.round(W * 0.7);

  let world;
  try {
    world = await getWorld();
  } catch (e) {
    container.innerHTML = '<p style="padding:2rem;color:#808080;font-family:sans-serif;font-size:0.8rem;">Map unavailable — requires internet connection.</p>';
    return;
  }

  const d3 = window.d3;
  const topojson = window.topojson;

  const proj = d3.geoMercator()
    .center([-100, 27])
    .scale(W * 0.9)
    .translate([W * 0.44, H * 0.5]);

  const pathGen = d3.geoPath().projection(proj);

  const svg = d3.select(container)
    .append("svg")
    .attr("width", W)
    .attr("height", H)
    .attr("viewBox", `0 0 ${W} ${H}`)
    .style("display", "block");

  // Glow filter for overlap routes
  const defs = svg.append("defs");
  const glowFilter = defs.append("filter")
    .attr("id", "overlap-glow")
    .attr("x", "-40%").attr("y", "-40%")
    .attr("width", "180%").attr("height", "180%");
  glowFilter.append("feGaussianBlur")
    .attr("in", "SourceGraphic").attr("stdDeviation", "2.5").attr("result", "blur");
  const feMerge = glowFilter.append("feMerge");
  feMerge.append("feMergeNode").attr("in", "blur");
  feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  // Ocean background
  svg.append("rect").attr("width", W).attr("height", H).attr("fill", "#dce8f0");

  // Land
  const countries = topojson.feature(world, world.objects.countries);
  svg.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("d", pathGen)
    .attr("fill", "#edeae3")
    .attr("stroke", "#c4bdb3")
    .attr("stroke-width", 0.5);

  // Country borders
  svg.append("path")
    .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
    .attr("d", pathGen)
    .attr("fill", "none")
    .attr("stroke", "#a89e92")
    .attr("stroke-width", 1.1);

  // Draw routes — volaris and viva under overlap
  ["volaris", "viva", "overlap"].forEach((type) => {
    // If a filter is active and it's not this type, draw at very low opacity
    const isActive = !activeFilter || activeFilter === "all" || activeFilter === type;
    const s = ROUTE_STYLES[type];

    const g = svg.append("g").attr("class", `routes-${type}`);

    ROUTES.filter((r) => r[2] === type).forEach(([from, to]) => {
      const a = AIRPORTS[from], b = AIRPORTS[to];
      if (!a || !b) return;
      g.append("path")
        .datum({
          type: "Feature",
          geometry: { type: "LineString", coordinates: [[a.lng, a.lat], [b.lng, b.lat]] },
        })
        .attr("d", pathGen)
        .attr("fill", "none")
        .attr("stroke", s.stroke)
        .attr("stroke-width", s.width)
        .attr("stroke-opacity", isActive ? s.opacity : 0.07)
        .attr("stroke-dasharray", s.dash)
        .attr("stroke-linecap", "round")
        .attr("filter", isActive && s.glowFilter ? "url(#overlap-glow)" : null);
    });
  });

  // Airport dots
  const usedCodes = new Set(ROUTES.flatMap(([f, t]) => [f, t]));
  const dotG = svg.append("g");

  usedCodes.forEach((code) => {
    const ap = AIRPORTS[code];
    if (!ap) return;
    const [x, y] = proj([ap.lng, ap.lat]);
    if (x < 2 || x > W - 2 || y < 2 || y > H - 2) return;
    const isHub = LABEL_ALWAYS.has(code);
    dotG.append("circle")
      .attr("cx", x).attr("cy", y)
      .attr("r", isHub ? 3.5 : 2)
      .attr("fill", "#1a1a1a")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);
  });

  // Airport labels
  const labelG = svg.append("g");
  const fontSize = W < 500 ? 8 : 9.5;

  usedCodes.forEach((code) => {
    const ap = AIRPORTS[code];
    if (!ap || !ap.label || !LABEL_ALWAYS.has(code)) return;
    const [x, y] = proj([ap.lng, ap.lat]);
    if (x < 2 || x > W - 2 || y < 2 || y > H - 2) return;

    // White halo then label
    [{ fill: "white", stroke: "white", strokeWidth: 3 }, { fill: "#1a1a1a", stroke: null, strokeWidth: 0 }]
      .forEach(({ fill, stroke, strokeWidth }) => {
        const t = labelG.append("text")
          .attr("x", x + ap.labelDx).attr("y", y + ap.labelDy)
          .attr("text-anchor", ap.labelAnchor)
          .attr("font-family", '"Barlow Condensed", "Arial Narrow", sans-serif')
          .attr("font-size", fontSize)
          .attr("font-weight", "600")
          .attr("letter-spacing", "0.03em")
          .attr("fill", fill)
          .text(ap.label);
        if (stroke) {
          t.attr("stroke", stroke)
           .attr("stroke-width", strokeWidth)
           .attr("stroke-linejoin", "round")
           .attr("paint-order", "stroke");
        }
      });
  });

  // Country name watermarks
  [
    { text: "UNITED STATES", x: W * 0.6,  y: H * 0.25 },
    { text: "MEXICO",        x: W * 0.48, y: H * 0.65 },
  ].forEach(({ text, x, y }) => {
    svg.append("text")
      .attr("x", x).attr("y", y)
      .attr("text-anchor", "middle")
      .attr("font-family", '"Barlow Condensed", sans-serif')
      .attr("font-size", W < 500 ? 7 : 9)
      .attr("font-weight", "500")
      .attr("letter-spacing", "0.2em")
      .attr("fill", "#9a9080")
      .attr("pointer-events", "none")
      .text(text);
  });
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
    requestAnimationFrame(() => setTimeout(() => initMap("all"), 50));
  } catch (err) {
    console.error("Map init failed:", err);
  }

  // Filter dropdown
  const filterEl = document.getElementById("route-filter");
  if (filterEl) {
    filterEl.addEventListener("change", (e) => initMap(e.target.value));
  }

  // Resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    const filterEl = document.getElementById("route-filter");
    const current = filterEl ? filterEl.value : "all";
    resizeTimer = setTimeout(() => initMap(current), 180);
  });
});
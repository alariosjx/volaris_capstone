// marketshare.js
// INM (Instituto Nacional de Migración / AFAC) Mexico airline market share
// Source: AFAC Resumen Estadístico Diciembre 2025
// Domestic = pasajeros transportados vuelos nacionales
// International = pasajeros transportados vuelos internacionales

const MARKET_DATA = {
  domestic: [
    { airline: "Volaris", share: 41.8, color: "#a12985" },
    { airline: "Viva", share: 29.4, color: "#e8820a" },
    { airline: "Aeroméxico", share: 22.1, color: "#003DA5" },
    { airline: "Other", share: 6.7, color: "#c8c2b8" },
  ],
  international: [
    { airline: "Aeroméxico", share: 34.2, color: "#003DA5" },
    { airline: "Volaris", share: 28.6, color: "#a12985" },
    { airline: "Viva", share: 14.9, color: "#e8820a" },
    { airline: "Other", share: 22.3, color: "#c8c2b8" },
  ],
};

const COMBINED = {
  domestic: MARKET_DATA.domestic
    .filter((d) => d.airline !== "Other")
    .slice(0, 2)
    .reduce((s, d) => s + d.share, 0),
  international: MARKET_DATA.international
    .filter((d) => ["Volaris", "Viva"].includes(d.airline))
    .reduce((s, d) => s + d.share, 0),
};

function buildMarketShare() {
  const container = document.getElementById("marketshare-viz");
  if (!container) return;

  container.innerHTML = `
      <div class="ms-panels">
        <div class="ms-panel">
          <div class="ms-panel-title">Domestic Market</div>
          <div class="ms-panel-sub">Share of passengers carried, Mexico, Dec. 2025</div>
          <div class="ms-bars" id="ms-domestic"></div>
          <div class="ms-combined-note">
            <span class="ms-combined-dot"></span>
            Combined Volaris + Viva: <strong>${COMBINED.domestic.toFixed(
              1
            )}%</strong>
          </div>
        </div>
        <div class="ms-panel">
          <div class="ms-panel-title">International Market</div>
          <div class="ms-panel-sub">Share of passengers carried, Mexico, Dec. 2025</div>
          <div class="ms-bars" id="ms-international"></div>
          <div class="ms-combined-note">
            <span class="ms-combined-dot"></span>
            Combined Volaris + Viva: <strong>${COMBINED.international.toFixed(
              1
            )}%</strong>
          </div>
        </div>
      </div>
      <div class="ms-source">Source: AFAC Resumen Estadístico Diciembre 2025 (INM)</div>
    `;

  renderBars("ms-domestic", MARKET_DATA.domestic);
  renderBars("ms-international", MARKET_DATA.international);
}

function renderBars(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;

  data.forEach((d, i) => {
    const row = document.createElement("div");
    row.className = "ms-bar-row";
    row.innerHTML = `
        <div class="ms-label">${d.airline}</div>
        <div class="ms-bar-track">
          <div class="ms-bar-fill" data-share="${d.share}" style="background:${d.color}; width: 0%"></div>
        </div>
        <div class="ms-pct">${d.share}%</div>
      `;
    el.appendChild(row);
  });

  // Animate bars in after a short paint delay
  setTimeout(() => {
    el.querySelectorAll(".ms-bar-fill").forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.share + "%";
      }, i * 120);
    });
  }, 100);
}

document.addEventListener("DOMContentLoaded", buildMarketShare);

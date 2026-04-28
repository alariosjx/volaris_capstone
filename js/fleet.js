// Fleet visualization — dot/square grid style

const FLEET_DATA = [
    { airline: 'volaris',  label: 'Volaris',  count: 155 },
    { airline: 'viva',     label: 'Viva',     count: 96  },
    { airline: 'combined', label: 'Combined', count: 251 }
  ];
  
  function buildFleetViz() {
    const container = document.getElementById('fleet-viz');
    if (!container) return;
  
    FLEET_DATA.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'fleet-row';
  
      const label = document.createElement('div');
      label.className = 'fleet-row-label';
      label.textContent = row.label;
  
      const dots = document.createElement('div');
      dots.className = 'fleet-planes';
  
      for (let i = 0; i < row.count; i++) {
        const dot = document.createElement('span');
        dot.className = `plane-dot ${row.airline}`;
        dots.appendChild(dot);
      }
  
      rowEl.appendChild(label);
      rowEl.appendChild(dots);
      container.appendChild(rowEl);
    });
  
    // Trigger animation on scroll
    const block = document.getElementById('fleet-graphic');
    const allDots = container.querySelectorAll('.plane-dot');
  
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        allDots.forEach((dot, i) => {
          setTimeout(() => dot.classList.add('visible'), i * 5);
        });
        observer.disconnect();
      }
    }, { threshold: 0.15 });
  
    if (block) observer.observe(block);
  }
  
  document.addEventListener('DOMContentLoaded', buildFleetViz);
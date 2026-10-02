import { animateIn } from './animations.js';

// Filtros accesibles: botones con aria-pressed; las tarjetas ocultas usan [hidden].
const bar = document.querySelector('.filter-bar');
const cards = [...document.querySelectorAll('.page-card')];
const status = document.querySelector('#filter-status');
if (bar && cards.length) {
  bar.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-filter]');
    if (!btn) return;
    const filter = btn.dataset.filter;
    bar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const visible = [];
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.hidden = !show;
      if (show) visible.push(card);
    });
    if (status) status.textContent = `${visible.length} ${visible.length === 1 ? 'proyecto mostrado' : 'proyectos mostrados'}`;
    animateIn(visible);
  });
}

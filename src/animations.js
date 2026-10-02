import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Grupos que entran con stagger al hacer scroll. Todo se oculta solo desde JS y solo
// si no hay prefers-reduced-motion, así que sin JS el contenido permanece visible.
const REVEAL_GROUPS = [
  { sel: '.section .eyebrow, .section h2, .heading-aside, .section-heading .text-link, .page-hero .eyebrow, .page-hero h1, .page-hero p, .filter-bar', y: 22, stagger: 0.1 },
  { sel: '.capability, .sector-grid li, .about-facts li, .project-card, .page-card', y: 34, stagger: 0.12 },
  { sel: '.about-copy > *, .contact-layout > *, .approach-section .button, .exp-section .sector-grid', y: 24, stagger: 0.12 },
  { sel: '.cta-banner', y: 30, scale: 0.98, stagger: 0.1 },
];

function reveal(group) {
  const items = gsap.utils.toArray(group.sel);
  if (!items.length) return;
  // transition:none evita que el CSS de hover pelee con el tween; clearProps lo devuelve.
  gsap.set(items, { opacity: 0, y: group.y, scale: group.scale ?? 1, transition: 'none' });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) => gsap.to(batch, {
      opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', stagger: group.stagger,
      clearProps: 'opacity,transform,transition',
    }),
  });
}

function revealSteps() {
  const steps = document.querySelector('.steps');
  if (!steps) return;
  const items = gsap.utils.toArray(steps.children);
  gsap.set(items, { opacity: 0, y: 16, transition: 'none' });
  gsap.timeline({ scrollTrigger: { trigger: steps, start: 'top 85%', once: true } })
    .to(items, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.16, clearProps: 'opacity,transform,transition' });
}

function heroEntrance() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
  tl.from('.hero-copy > *', { y: 26, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: 'opacity,transform' })
    .from('.portrait-frame', { opacity: 0, scale: 1.06, duration: 1.2, clearProps: 'opacity,transform' }, 0.15)
    .from('.portrait-glow', { opacity: 0, duration: 1.4 }, 0.1)
    .from('.experience-stamp, .portrait-note', { x: 24, opacity: 0, duration: 0.7, stagger: 0.12, clearProps: 'opacity,transform' }, 0.5)
    .from('.role-list li', { x: 24, opacity: 0, duration: 0.6, stagger: 0.09, clearProps: 'opacity,transform' }, 0.6);

  // Flotación suave + parallax del brillo del retrato.
  gsap.to('.portrait-glow', { y: -14, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.to('.portrait-frame img', {
    yPercent: 4, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

function countUp() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const state = { n: 0 };
    el.textContent = `0${suffix}`;
    gsap.to(state, {
      n: end, duration: 1.6, ease: 'power2.out', delay: 0.5,
      onUpdate: () => { el.textContent = `${Math.round(state.n)}${suffix}`; },
      onComplete: () => { el.textContent = `${end}${suffix}`; },
    });
  });
}

export function initAnimations() {
  if (reducedMotion) return;
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  heroEntrance();
  countUp();
  REVEAL_GROUPS.forEach(reveal);
  revealSteps();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

// Para contenido que cambia (filtros): anima las tarjetas visibles.
export function animateIn(elements) {
  if (reducedMotion) return;
  gsap.fromTo(elements, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'opacity,transform' });
}

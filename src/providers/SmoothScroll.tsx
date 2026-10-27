import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Позиции ScrollTrigger зависят от высоты страницы: пересчитываем,
  // когда догружаются шрифты или меняется высота документа
  useEffect(() => {
    let timer = 0;
    let lastHeight = document.body.scrollHeight;
    const refresh = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) > 2) {
        lastHeight = h;
        refresh();
      }
    });
    ro.observe(document.body);
    document.fonts?.ready.then(refresh);
    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

/** Скролл к элементу/позиции — через Lenis, если он есть */
export function scrollTo(lenis: Lenis | null, target: string | number | HTMLElement, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, duration: 1.6, offset: 0 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}

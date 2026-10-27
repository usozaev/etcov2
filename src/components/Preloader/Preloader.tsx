import { useRef } from 'react';
import { heroSlides } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import './Preloader.css';

const preload = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });

const WORDS = ['Эталонные', 'концессии'];

type Props = {
  /** Шторка начала подниматься — пора запускать анимации страницы */
  onReveal: () => void;
  /** Прелоадер полностью ушёл — можно размонтировать */
  onDone: () => void;
};

export default function Preloader({ onReveal, onDone }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Ждём первый кадр героя (но не дольше 4 секунд)
      const loaded = Promise.race([preload(heroSlides[0].src), new Promise((r) => setTimeout(r, 4000))]);
      const state = { v: 0 };
      let alive = true;

      const tl = gsap.timeline();
      tl.fromTo('.preloader__char', { yPercent: 120 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.035 })
        .to('.preloader__bar-fill', { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
        .to(
          state,
          {
            v: 100,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(state.v)).padStart(3, '0');
            },
          },
          0,
        )
        .addPause('>', () => {
          loaded.then(() => {
            if (alive) tl.resume();
          });
        })
        .to('.preloader__char', { yPercent: -120, duration: 0.7, ease: 'expo.in', stagger: 0.015 })
        .to('.preloader__meta', { opacity: 0, duration: 0.4 }, '<')
        .add(onReveal, '-=0.1')
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' }, '-=0.1')
        .add(onDone);

      return () => {
        alive = false;
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="preloader" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="preloader__title display">
        {WORDS.map((w) => (
          <span className="preloader__word" key={w}>
            {[...w].map((ch, i) => (
              <span className="preloader__char" key={i}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </div>
      <div className="preloader__meta">
        <span>Инфраструктура ГЧП</span>
        <span className="preloader__count display">
          <span ref={countRef}>000</span>
        </span>
      </div>
      <div className="preloader__bar preloader__meta">
        <div className="preloader__bar-fill" />
      </div>
    </div>
  );
}

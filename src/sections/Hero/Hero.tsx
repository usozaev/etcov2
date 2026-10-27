import { useEffect, useRef, useState } from 'react';
import RevealText from '../../components/RevealText/RevealText';
import { heroSlides } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import { useAppReady } from '../../providers/AppReady';
import { scrollTo, useLenis } from '../../providers/SmoothScroll';
import './Hero.css';

const SLIDE_MS = 5500;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const ready = useAppReady();
  const lenis = useLenis();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  // автосмена слайдов
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => {
      setIndex((i) => {
        setPrev(i);
        return (i + 1) % heroSlides.length;
      });
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [ready]);

  // вступление: медиа раскрывается из «окна» в полный экран
  useGSAP(
    () => {
      gsap.set('.hero__media', { clipPath: 'inset(18% 26% 18% 26% round 24px)' });
      gsap.set('.hero__fade', { opacity: 0, y: 30 });
      if (!ready) return;
      gsap
        .timeline({ delay: 0.15 })
        .to('.hero__media', { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.8, ease: 'expo.inOut' })
        .to('.hero__fade', { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, '-=0.6');
    },
    { scope: ref, dependencies: [ready], revertOnUpdate: true },
  );

  // параллакс при уходе героя
  useGSAP(
    () => {
      const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__media-inner', { yPercent: 25, scale: 1.1, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__content', { yPercent: -40, opacity: 0, ease: 'none', scrollTrigger: st });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="hero">
      <div className="hero__media">
        <div className="hero__media-inner">
          {heroSlides.map((s, i) => (
            <div
              key={s.src}
              className={`hero__slide ${i === index ? 'is-active' : ''} ${i === prev ? 'is-prev' : ''} ${prev === null ? 'no-wipe' : ''}`}
            >
              <img src={s.src} alt={s.caption} />
            </div>
          ))}
        </div>
        <div className="hero__shade" />
      </div>

      <div className="hero__content container">
        <RevealText as="h1" by="char" trigger="ready" delay={0.9} className="display h-xxl hero__title" text={'Эталонные\nконцессии'} />

        <div className="hero__row">
          <p className="hero__lead hero__fade">
            Создаём социальную инфраструктуру на принципах ГЧП — кампусы и детские лагеря от Архангельска до Хабаровска.
          </p>

          <div className="hero__counter hero__fade">
            <div className="hero__counter-top">
              <span className="display">0{index + 1}</span>
              <span>/ 0{heroSlides.length}</span>
            </div>
            <div className="hero__progress">
              <span key={index} style={{ animationDuration: `${SLIDE_MS}ms` }} className={ready ? 'is-running' : ''} />
            </div>
            <span className="hero__caption">{heroSlides[index].caption}</span>
          </div>
        </div>
      </div>

      <button className="hero__scroll hero__fade" onClick={() => scrollTo(lenis, window.innerHeight)} aria-label="Листать вниз">
        <span />
      </button>
    </section>
  );
}

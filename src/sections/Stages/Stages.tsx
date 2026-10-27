import { useRef, useState } from 'react';
import RevealText from '../../components/RevealText/RevealText';
import { stages } from '../../data/site';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import './Stages.css';

/** Этапы проекта: заголовок прилипает слева, справа шкала заполняется по мере скролла */
export default function Stages() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        '.stages__fill',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.stages__list', start: 'top 60%', end: 'bottom 60%', scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>('.stages__item').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="section section--light stages">
      <div className="container stages__grid">
        <div className="stages__aside">
          <span className="eyebrow">Как мы работаем</span>
          <RevealText as="h2" className="display h-l" text={'Шесть\nэтапов\nконцессии'} />
          <div className="stages__big display" aria-hidden>
            <span key={active}>0{active + 1}</span>
          </div>
        </div>

        <ol className="stages__list">
          <span className="stages__rail" aria-hidden>
            <span className="stages__fill" />
          </span>
          {stages.map((s, i) => (
            <li key={s.title} className={`stages__item ${i <= active ? 'is-active' : ''}`}>
              <span className="stages__dot" />
              <h3 className="display h-m">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

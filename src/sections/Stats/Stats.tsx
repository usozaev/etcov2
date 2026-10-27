import { useRef } from 'react';
import Counter from '../../components/Counter/Counter';
import RevealText from '../../components/RevealText/RevealText';
import { stats } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import './Stats.css';

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.stats__line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.6, ease: 'expo.inOut', stagger: 0.12, scrollTrigger: { trigger: '.stats__grid', start: 'top 85%' } },
      );
      gsap.from('.stats__item > *:not(.stats__line)', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: { trigger: '.stats__grid', start: 'top 80%' },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="section section--light stats">
      <div className="container">
        <div className="stats__head">
          <span className="eyebrow">В цифрах</span>
          <RevealText as="h2" className="display h-l" text={'Масштаб,\nкоторый меняет города'} />
        </div>

        <div className="stats__grid">
          {stats.map((s) => (
            <div className="stats__item" key={s.label}>
              <span className="stats__line" />
              <div className="stats__value display">
                <Counter value={s.value} />
                {s.suffix && <span className="accent">{s.suffix}</span>}
              </div>
              <span className="stats__unit">{s.unit}</span>
              <p className="stats__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

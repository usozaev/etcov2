import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import RevealText from '../../components/RevealText/RevealText';
import { projects } from '../../data/projects';
import { gsap, useGSAP } from '../../lib/gsap';
import './ProjectsStack.css';

/** Карточки проектов прилипают к экрану и накрывают друг друга стопкой */
export default function ProjectsStack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.pstack__card');
      cards.forEach((card, i) => {
        const inner = card.querySelector('.pstack__inner');
        const img = card.querySelector('.pstack__img');

        // картинка внутри карточки «въезжает» с лёгким зумом
        gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top top', scrub: true } });

        const next = cards[i + 1];
        if (!next) return;
        // уходящая карточка уменьшается и темнеет, когда следующая наезжает
        gsap.to(inner, {
          scale: 0.86,
          filter: 'brightness(0.35)',
          borderRadius: 32,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="pstack">
      <div className="pstack__head container">
        <span className="eyebrow">Проекты</span>
        <RevealText as="h2" className="display h-xl" text={'Объекты,\nкоторые мы создаём'} />
      </div>

      {projects.map((p, i) => (
        <article className="pstack__card" key={p.slug}>
          <Link to={`/projects/${p.slug}`} className="pstack__inner" data-cursor="Открыть">
            <img className="pstack__img" src={p.cover} alt={p.title} loading="lazy" />
            <div className="pstack__shade" />
            <div className="pstack__info container">
              <div className="pstack__top">
                <span className="pstack__num display">0{i + 1}</span>
                <span className="pstack__region">{p.region}</span>
              </div>
              <div className="pstack__bottom">
                <h3 className="display h-l">{p.title}</h3>
                <dl className="pstack__facts">
                  {p.facts.slice(0, 3).map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>
                        {f.value} <small>{f.unit}</small>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Link>
        </article>
      ))}

      <div className="pstack__more container">
        <Link to="/projects" className="link-arrow" data-cursor="Все">
          Все проекты <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

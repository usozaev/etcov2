import { useRef } from 'react';
import RevealText from '../../components/RevealText/RevealText';
import { services } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import './Services.css';

/** Горизонтальная лента услуг: секция пиннится, лента едет вбок при вертикальном скролле */
export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 861px)', () => {
        const track = ref.current!.querySelector<HTMLElement>('.services__track')!;
        const distance = () => track.scrollWidth - window.innerWidth;

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            scrub: 1,
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });

        gsap.to('.services__bar span', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        });

        // параллакс картинок внутри карточек относительно горизонтального движения
        gsap.utils.toArray<HTMLElement>('.services__card').forEach((card) => {
          gsap.fromTo(
            card.querySelector('img'),
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: move, start: 'left right', end: 'right left', scrub: true },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="services">
      <div className="services__track">
        <div className="services__intro">
          <span className="eyebrow">Что мы делаем</span>
          <RevealText as="h2" className="display h-l" text={'Полный\nцикл\nпроекта'} />
          <p className="services__hint">Листайте — лента движется вбок →</p>
        </div>

        {services.map((s, i) => (
          <article className="services__card" key={s.title}>
            <div className="services__img">
              <img src={s.image} alt="" loading="lazy" />
            </div>
            <div className="services__text">
              <span className="services__num">0{i + 1}</span>
              <h3 className="h-m display">{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="services__bar container" aria-hidden>
        <span />
      </div>
    </section>
  );
}

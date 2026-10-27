import { useRef } from 'react';
import { gallery } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import './Gallery.css';

const COLUMNS = 3;
const SPEEDS = [-18, 14, -26];

/** Три колонки фото едут с разной скоростью, в центре — заголовок */
export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const columns = Array.from({ length: COLUMNS }, (_, c) => gallery.filter((_, i) => i % COLUMNS === c));

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.gallery__col').forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: -SPEEDS[i] / 2 },
          {
            yPercent: SPEEDS[i] / 2,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
      gsap.fromTo(
        '.gallery__title',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'center center', scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="gallery">
      <div className="gallery__grid">
        {columns.map((col, c) => (
          <div className="gallery__col" key={c}>
            {col.map((src) => (
              <div className="gallery__item" key={src}>
                <img src={src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="gallery__overlay">
        <h2 className="gallery__title display h-xxl">
          Города
          <br />
          <span className="accent">знаний</span>
        </h2>
      </div>
    </section>
  );
}

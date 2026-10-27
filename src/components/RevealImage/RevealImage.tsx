import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import './RevealImage.css';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  /** Сила параллакса в процентах (0 — выключен) */
  parallax?: number;
  /** Направление шторки */
  from?: 'bottom' | 'top' | 'left' | 'right';
  delay?: number;
};

const clipFrom = {
  bottom: 'inset(100% 0% 0% 0%)',
  top: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

/** Картинка раскрывается шторкой при скролле и плавает параллаксом */
export default function RevealImage({ src, alt = '', className = '', parallax = 10, from = 'bottom', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 90%' }, delay });
      tl.fromTo(ref.current, { clipPath: clipFrom[from] }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
        .fromTo('img', { scale: 1.4 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.2);

      if (parallax) {
        gsap.fromTo(
          '.reveal-img__inner',
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`reveal-img ${className}`} style={{ ['--px' as string]: `${parallax}%` }}>
      <div className="reveal-img__inner">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

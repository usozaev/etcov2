import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { useLenis } from '../../providers/SmoothScroll';
import './Marquee.css';

type Props = {
  children: ReactNode;
  /** Скорость в % ширины трека за секунду */
  speed?: number;
  reverse?: boolean;
  className?: string;
};

/** Бегущая строка: ускоряется от скорости скролла и меняет направление вместе с ним */
export default function Marquee({ children, speed = 4, reverse = false, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const track = ref.current!.querySelector('.marquee__track')!;
      const wrap = gsap.utils.wrap(-50, 0);
      let x = 0;
      let dir = reverse ? -1 : 1;

      const tick = (_t: number, dt: number) => {
        if (lenis && lenis.direction) dir = (reverse ? -1 : 1) * lenis.direction;
        const boost = 1 + Math.min(Math.abs(lenis?.velocity ?? 0) * 0.15, 6);
        x = wrap(x - (speed * boost * dir * dt) / 1000);
        gsap.set(track, { xPercent: x });
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { scope: ref, dependencies: [lenis] },
  );

  return (
    <div ref={ref} className={`marquee ${className}`}>
      <div className="marquee__track">
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

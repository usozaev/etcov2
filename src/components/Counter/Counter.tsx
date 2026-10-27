import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';

const fmt = new Intl.NumberFormat('ru-RU');

/** Число «накручивается» от нуля при появлении во вьюпорте */
export default function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const state = { v: 0 };
      gsap.to(state, {
        v: value,
        duration: 2.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = fmt.format(Math.round(state.v));
        },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

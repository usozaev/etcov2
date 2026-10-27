import { useRef, type ElementType } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { useAppReady } from '../../providers/AppReady';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Резать по словам или по буквам */
  by?: 'word' | 'char';
  /** scroll — при появлении во вьюпорте, ready — после прелоадера/перехода */
  trigger?: 'scroll' | 'ready';
  delay?: number;
  stagger?: number;
  start?: string;
};

/** Текст выезжает из-под маски построчно/побуквенно. Перенос строки — «\n». */
export default function RevealText({
  text,
  as: Tag = 'div',
  className,
  by = 'word',
  trigger = 'scroll',
  delay = 0,
  stagger,
  start = 'top 88%',
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const ready = useAppReady();

  useGSAP(
    () => {
      const units = ref.current!.querySelectorAll('.split-unit');
      // y: 0 явно — иначе после revert GSAP может прочитать остаточный сдвиг как пиксели
      const hidden = { yPercent: 115, y: 0, rotate: by === 'word' ? 6 : 0 };
      if (trigger === 'ready' && !ready) {
        gsap.set(units, hidden);
        return;
      }

      gsap.fromTo(units, hidden, {
        yPercent: 0,
        y: 0,
        rotate: 0,
        duration: by === 'char' ? 1.3 : 1.15,
        ease: 'expo.out',
        delay,
        stagger: stagger ?? (by === 'char' ? 0.025 : 0.06),
        scrollTrigger: trigger === 'scroll' ? { trigger: ref.current, start } : undefined,
      });
    },
    // анимации по скроллу не зависят от прелоадера — не пересоздаём их
    { scope: ref, dependencies: [trigger === 'ready' && ready], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {text.split('\n').map((line, li) => (
        <span className="split-line" aria-hidden key={li}>
          {line.split(' ').map((word, wi, arr) => (
            <span key={wi}>
              <span className="split-mask">
                {by === 'char' ? (
                  [...word].map((ch, ci) => (
                    <span className="split-unit" key={ci}>
                      {ch}
                    </span>
                  ))
                ) : (
                  <span className="split-unit">{word}</span>
                )}
              </span>
              {wi < arr.length - 1 ? ' ' : null}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

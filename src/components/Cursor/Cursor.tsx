import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import './Cursor.css';

/**
 * Кастомный курсор. Элементы с data-cursor="Текст" раздувают его в круг с подписью,
 * ссылки и кнопки — слегка увеличивают.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [hover, setHover] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const el = ref.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e: MouseEvent) => {
      el.classList.add('is-visible');
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as Element;
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      setLabel(labelled?.dataset.cursor ?? '');
      setHover(!!target.closest('a, button, [role="button"]'));
    };
    const leave = () => el.classList.remove('is-visible');

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  // при смене страницы сбрасываем состояние
  useEffect(() => {
    setLabel('');
    setHover(false);
  }, [pathname]);

  return (
    <div ref={ref} className={`cursor ${label ? 'is-label' : ''} ${hover && !label ? 'is-hover' : ''}`} aria-hidden>
      <div className="cursor__dot">
        <span className="cursor__label">{label}</span>
      </div>
    </div>
  );
}

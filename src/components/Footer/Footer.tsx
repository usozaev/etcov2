import { useRef } from 'react';
import { contacts } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import { scrollTo, useLenis } from '../../providers/SmoothScroll';
import { ArrowIcon } from '../Icons';
import Magnetic from '../Magnetic/Magnetic';
import RevealText from '../RevealText/RevealText';
import './Footer.css';

const GIANT = 'ЭТАЛОН';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      gsap.fromTo(
        '.footer__giant span',
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: { trigger: '.footer__giant', start: 'top bottom', end: 'bottom bottom', scrub: 1 },
        },
      );
      gsap.from('.footer__col', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: '.footer__grid', start: 'top 90%' },
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="footer" id="contacts">
      <div className="footer__cta container">
        <span className="eyebrow">Контакты</span>
        <RevealText as="h2" className="display h-xl footer__title" text={'Создаём\nбудущее вместе'} />
        <Magnetic strength={0.5}>
          <a className="footer__circle" href={`mailto:${contacts.email}`} data-cursor="Написать">
            <span>Обсудить проект</span>
            <ArrowIcon size={26} />
          </a>
        </Magnetic>
      </div>

      <div className="footer__grid container">
        <div className="footer__col">
          <span className="eyebrow">Почта</span>
          <a href={`mailto:${contacts.email}`} className="footer__big">
            {contacts.email}
          </a>
        </div>
        <div className="footer__col">
          <span className="eyebrow">Телефон</span>
          <a href={contacts.phoneHref} className="footer__big">
            {contacts.phone}
          </a>
        </div>
        <div className="footer__col">
          <span className="eyebrow">Офис</span>
          <p>{contacts.address}</p>
        </div>
      </div>

      <div className="footer__giant display" aria-hidden>
        {[...GIANT].map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>

      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} ООО «Эталонные концессии»</span>
        <span>Входит в АФК «Система»</span>
        <button onClick={() => scrollTo(lenis, 0)} className="footer__top">
          Наверх ↑
        </button>
      </div>
    </footer>
  );
}

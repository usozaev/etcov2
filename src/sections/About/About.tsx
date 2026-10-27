import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import RevealImage from '../../components/RevealImage/RevealImage';
import { about } from '../../data/site';
import { gsap, useGSAP } from '../../lib/gsap';
import './About.css';

/** Манифест: слова «загораются» по мере прокрутки, вокруг плавают фото */
export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about__word',
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.about__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>('.about__float').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 120 * (i + 1) },
          { y: -120 * (i + 1), ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="section about container">
      <span className="eyebrow">О компании</span>

      <p className="about__text display">
        {about.split(' ').map((w, i) => (
          <span key={i} className="about__word">
            {w}{' '}
          </span>
        ))}
      </p>

      <div className="about__floats" aria-hidden>
        <div className="about__float about__float--a">
          <RevealImage src="/images/perm5.webp" parallax={0} />
        </div>
        <div className="about__float about__float--b">
          <RevealImage src="/images/shibai_3.webp" parallax={0} from="top" />
        </div>
      </div>

      <div className="about__footer">
        <p>
          Часть экосистемы АФК «Система»: привлекаем компании группы на каждом этапе проекта и управляем рисками
          на всём жизненном цикле — по модели BOT/BOOT.
        </p>
        <Link to="/team" className="link-arrow" data-cursor="Команда">
          Познакомиться с командой <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Bio from '../components/Bio/Bio';
import Footer from '../components/Footer/Footer';
import Marquee from '../components/Marquee/Marquee';
import PageTransition from '../components/PageTransition/PageTransition';
import RevealImage from '../components/RevealImage/RevealImage';
import RevealText from '../components/RevealText/RevealText';
import { team, type TeamMember } from '../data/team';
import { EASE_CURTAIN, gsap, useGSAP } from '../lib/gsap';
import { useAppReady } from '../providers/AppReady';
import { useLenis } from '../providers/SmoothScroll';
import './Team.css';

const EXPERTISE = ['Минфин России', 'Газпром', 'РЖД', 'ВЭБ.РФ', 'Большая четвёрка', 'АФК «Система»', 'Ictas-Astaldi', 'InfraOne'];

export default function Team() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const lenis = useLenis();
  const ready = useAppReady();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) lenis?.stop();
    else if (ready) lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, lenis, ready]);

  useGSAP(
    () => {
      gsap.from('.tcard__meta', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
      });
    },
    { scope: ref },
  );

  return (
    <PageTransition label="Команда">
      <div ref={ref}>
        <section className="team-hero container">
          <span className="eyebrow">Люди</span>
          <RevealText as="h1" by="char" trigger="ready" delay={0.7} className="display h-xxl" text="Команда" />
          <p className="lead">
            Профессионалы, которые строили рынок ГЧП в России: от разработки законодательства до запуска объектов
            в эксплуатацию.
          </p>
        </section>

        <Marquee speed={3} className="team-marquee">
          {EXPERTISE.map((e) => (
            <span className="team-marquee__item display" key={e}>
              {e}
              <i>/</i>
            </span>
          ))}
        </Marquee>

        <section className="section container">
          <div className="team-grid">
            {team.map((m, i) => (
              <button key={m.id} className="tcard" onClick={() => setSelected(m)} data-cursor="Подробнее">
                <motion.div layoutId={`photo-${m.id}`} className="tcard__photo">
                  <RevealImage src={m.photo} alt={m.name} parallax={6} delay={(i % 3) * 0.12} />
                </motion.div>
                <div className="tcard__meta">
                  <span className="tcard__index">0{i + 1}</span>
                  <h2 className="tcard__name">{m.name}</h2>
                  <p className="tcard__role">{m.role}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="tmodal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            onClick={() => setSelected(null)}
          >
            <div className="tmodal__panel" onClick={(e) => e.stopPropagation()}>
              <motion.div layoutId={`photo-${selected.id}`} className="tmodal__photo" transition={{ duration: 0.8, ease: EASE_CURTAIN }}>
                <img src={selected.photo} alt={selected.name} />
              </motion.div>

              <motion.div
                className="tmodal__body"
                data-lenis-prevent
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
              >
                <button className="tmodal__close" onClick={() => setSelected(null)} aria-label="Закрыть">
                  ✕
                </button>
                <span className="eyebrow">{selected.role}</span>
                <h2 className="display h-m">{selected.name}</h2>
                <Bio text={selected.bio} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </PageTransition>
  );
}

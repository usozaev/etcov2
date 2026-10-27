import { AnimatePresence, motion } from 'framer-motion';
import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Marquee from '../components/Marquee/Marquee';
import PageTransition from '../components/PageTransition/PageTransition';
import RevealText from '../components/RevealText/RevealText';
import { categories, projects, type ProjectCategory } from '../data/projects';
import { ScrollTrigger } from '../lib/gsap';
import './Projects.css';

/** Лёгкий 3D-наклон карточки за курсором */
function tilt(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty('--rx', `${-y * 6}deg`);
  el.style.setProperty('--ry', `${x * 8}deg`);
}
function untilt(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg');
  e.currentTarget.style.setProperty('--ry', '0deg');
}

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <PageTransition label="Проекты">
      <section className="projects-hero container">
        <span className="eyebrow">Портфель</span>
        <RevealText as="h1" by="char" trigger="ready" delay={0.7} className="display h-xxl" text="Проекты" />
        <div className="projects-hero__row">
          <p className="lead">
            Кампусы мирового уровня и современные детские лагеря — каждый объект мы создаём и сопровождаем на
            протяжении десятилетий.
          </p>
          <span className="projects-hero__count display">
            {String(projects.length).padStart(2, '0')}
            <small>объектов</small>
          </span>
        </div>
      </section>

      <Marquee speed={2.5} className="projects-marquee">
        {projects.map((p) => (
          <span key={p.slug} className="projects-marquee__item display">
            {p.short}
            <img src={p.cover} alt="" />
          </span>
        ))}
      </Marquee>

      <section className="section container">
        <div className="projects-filter" role="tablist">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              className={`projects-filter__btn ${filter === c.id ? 'is-active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {filter === c.id && (
                <motion.span layoutId="filter-pill" className="projects-filter__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="projects-filter__label">{c.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout" onExitComplete={() => ScrollTrigger.refresh()}>
            {list.map((p, i) => (
              <motion.article
                layout
                key={p.slug}
                className="pcard"
                initial={{ opacity: 0, y: 80, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              >
                <Link to={`/projects/${p.slug}`} className="pcard__link" data-cursor="Открыть" onMouseMove={tilt} onMouseLeave={untilt}>
                  <div className="pcard__media">
                    <img src={p.cover} alt={p.title} loading="lazy" />
                    <span className="pcard__tag">{p.category === 'campus' ? 'Кампус' : 'Детский лагерь'}</span>
                  </div>
                  <div className="pcard__info">
                    <h2 className="display h-m">{p.title}</h2>
                    <span>{p.region}</span>
                  </div>
                  <div className="pcard__facts">
                    {p.facts.slice(0, 2).map((f) => (
                      <span key={f.label}>
                        <b>{f.value}</b> {f.unit}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </PageTransition>
  );
}

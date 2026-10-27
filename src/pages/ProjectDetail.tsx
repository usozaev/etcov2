import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { ArrowIcon } from '../components/Icons';
import PageTransition from '../components/PageTransition/PageTransition';
import RevealImage from '../components/RevealImage/RevealImage';
import RevealText from '../components/RevealText/RevealText';
import { getProject, projects } from '../data/projects';
import { gsap, useGSAP } from '../lib/gsap';
import NotFound from './NotFound';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  // границы перетаскивания галереи
  useEffect(() => {
    const measure = () => {
      if (dragRef.current && trackRef.current) setDragLimit(trackRef.current.scrollWidth - dragRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [slug]);

  useGSAP(
    () => {
      if (!project) return;
      // обложка: при скролле «окно» сжимается в карточку
      gsap.to('.pd-hero__media', {
        clipPath: 'inset(8% 6% 8% 6% round 28px)',
        ease: 'none',
        scrollTrigger: { trigger: '.pd-hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.pd-hero__img', {
        scale: 1.25,
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.pd-hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.fromTo('.pd-hero__media img', { scale: 1.35 }, { scale: 1, duration: 2.2, ease: 'expo.out', delay: 0.5, immediateRender: false });
      gsap.from('.pd-fact', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '.pd-facts', start: 'top 85%' },
      });
    },
    { scope: ref, dependencies: [slug] },
  );

  if (!project) return <NotFound />;

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];
  const [feature, ...rest] = project.gallery;

  return (
    <PageTransition label={project.short}>
      <div ref={ref}>
        <section className="pd-hero">
          <div className="pd-hero__media">
            <div className="pd-hero__img">
              <img src={project.cover} alt={project.title} />
            </div>
          </div>
          <div className="pd-hero__content container">
            <Link to="/projects" className="pd-back">
              ← Все проекты
            </Link>
            <span className="eyebrow">{project.region}</span>
            <RevealText as="h1" trigger="ready" delay={0.8} className="display h-xl" text={project.title} />
          </div>
        </section>

        <section className="section container pd-intro">
          <RevealText as="p" className="pd-lead" text={project.lead} stagger={0.015} />
          <div className="pd-facts">
            {project.facts.map((f) => (
              <div className="pd-fact" key={f.label}>
                <span className="pd-fact__value display">{f.value}</span>
                <span className="pd-fact__unit">{f.unit}</span>
                <span className="pd-fact__label">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="container pd-feature">
          <RevealImage src={feature} className="pd-feature__img" parallax={12} />
        </section>

        <section className="section pd-gallery">
          <div className="container pd-gallery__head">
            <span className="eyebrow">Галерея</span>
            <span className="pd-gallery__hint">Тяните ←→</span>
          </div>
          <div ref={dragRef} className="pd-gallery__viewport" data-cursor="Тяните">
            <motion.div
              ref={trackRef}
              className="pd-gallery__track"
              drag="x"
              dragConstraints={{ left: -dragLimit, right: 0 }}
              dragElastic={0.12}
              dragTransition={{ bounceStiffness: 200, bounceDamping: 24 }}
            >
              {rest.map((src, i) => (
                <motion.div
                  className="pd-gallery__item"
                  key={src}
                  initial={{ opacity: 0, x: 120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                >
                  <img src={src} alt="" draggable={false} loading="lazy" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Link to={`/projects/${next.slug}`} className="pd-next" data-cursor="Далее">
          <img src={next.cover} alt="" className="pd-next__img" />
          <div className="pd-next__content container">
            <span className="eyebrow">Следующий проект</span>
            <span className="display h-xl">{next.title}</span>
            <ArrowIcon size={48} />
          </div>
        </Link>
      </div>
      <Footer />
    </PageTransition>
  );
}

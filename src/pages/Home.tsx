import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import PageTransition from '../components/PageTransition/PageTransition';
import { useAppReady } from '../providers/AppReady';
import { scrollTo, useLenis } from '../providers/SmoothScroll';
import About from '../sections/About/About';
import Gallery from '../sections/Gallery/Gallery';
import Hero from '../sections/Hero/Hero';
import Partners from '../sections/Partners/Partners';
import ProjectsStack from '../sections/ProjectsStack/ProjectsStack';
import Services from '../sections/Services/Services';
import Stages from '../sections/Stages/Stages';
import Stats from '../sections/Stats/Stats';
import TeamPreview from '../sections/TeamPreview/TeamPreview';

export default function Home() {
  const { hash } = useLocation();
  const lenis = useLenis();
  const ready = useAppReady();

  // переход по якорю (/#contacts) — после того как страница встала на место
  useEffect(() => {
    if (!hash || !ready) return;
    const id = setTimeout(() => {
      const el = document.querySelector<HTMLElement>(hash);
      if (el) scrollTo(lenis, el);
    }, 900);
    return () => clearTimeout(id);
  }, [hash, ready, lenis]);

  return (
    <PageTransition label="Главная">
      <Hero />
      <About />
      <Stats />
      <ProjectsStack />
      <Services />
      <Stages />
      <Gallery />
      <TeamPreview />
      <Partners />
      <Footer />
    </PageTransition>
  );
}

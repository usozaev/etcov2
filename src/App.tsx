import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor/Cursor';
import Header from './components/Header/Header';
import Preloader from './components/Preloader/Preloader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Home from './pages/Home';
import { ScrollTrigger } from './lib/gsap';
import { AppReadyContext } from './providers/AppReady';
import { scrollTo, useLenis } from './providers/SmoothScroll';

// Внутренние страницы — отдельными чанками
const loaders = {
  projects: () => import('./pages/Projects'),
  projectDetail: () => import('./pages/ProjectDetail'),
  team: () => import('./pages/Team'),
  notFound: () => import('./pages/NotFound'),
};
const Projects = lazy(loaders.projects);
const ProjectDetail = lazy(loaders.projectDetail);
const Team = lazy(loaders.team);
const NotFound = lazy(loaders.notFound);

const page = (node: ReactNode) => <Suspense fallback={null}>{node}</Suspense>;

export default function App() {
  const location = useLocation();
  const lenis = useLenis();
  const [ready, setReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // После прелоадера тихо подгружаем остальные страницы, чтобы переходы были мгновенными
  useEffect(() => {
    if (ready) Object.values(loaders).forEach((load) => load());
  }, [ready]);

  useEffect(() => {
    if (!lenis) return;
    if (ready) lenis.start();
    else lenis.stop();
  }, [lenis, ready]);

  const onExitComplete = () => {
    scrollTo(lenis, 0, true);
    window.scrollTo(0, 0);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <AppReadyContext.Provider value={ready}>
      {!preloaderDone && <Preloader onReveal={() => setReady(true)} onDone={() => setPreloaderDone(true)} />}
      <div className="grain" aria-hidden />
      <Cursor />
      <ScrollProgress />
      <Header />
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={page(<Projects />)} />
          <Route path="/projects/:slug" element={page(<ProjectDetail />)} />
          <Route path="/team" element={page(<Team />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </AnimatePresence>
    </AppReadyContext.Provider>
  );
}

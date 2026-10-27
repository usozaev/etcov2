import { Link } from 'react-router-dom';
import { ArrowIcon } from '../components/Icons';
import PageTransition from '../components/PageTransition/PageTransition';
import RevealText from '../components/RevealText/RevealText';

export default function NotFound() {
  return (
    <PageTransition label="404">
      <section
        className="container"
        style={{ minHeight: '100svh', display: 'grid', alignContent: 'center', gap: 32, paddingTop: 'var(--header-h)' }}
      >
        <span className="eyebrow">Ошибка 404</span>
        <RevealText as="h1" by="char" trigger="ready" delay={0.7} className="display h-xxl" text={'Здесь\nпока пусто'} />
        <Link to="/" className="link-arrow" style={{ justifySelf: 'start' }}>
          На главную <ArrowIcon />
        </Link>
      </section>
    </PageTransition>
  );
}

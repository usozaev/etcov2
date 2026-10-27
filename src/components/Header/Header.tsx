import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../../data/site';
import { useAppReady } from '../../providers/AppReady';
import { useLenis } from '../../providers/SmoothScroll';
import { Logo } from '../Icons';
import Magnetic from '../Magnetic/Magnetic';
import Menu from './Menu';
import './Header.css';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const lenis = useLenis();
  const ready = useAppReady();

  // прячем шапку при скролле вниз, показываем при скролле вверх
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else if (ready) lenis.start();
  }, [open, lenis, ready]);

  return (
    <>
      <header className={`header ${hidden && !open ? 'is-hidden' : ''} ${ready ? 'is-ready' : ''}`}>
        <Link to="/" className="header__logo" aria-label="На главную">
          <Logo />
          <span className="header__logo-text">
            Эталонные
            <br />
            концессии
          </span>
        </Link>

        <nav className="header__nav">
          {nav.slice(1).map((item) => (
            <NavLink key={item.to} to={item.to} className="header__link">
              <span className="roll">
                <span data-text={item.label}>{item.label}</span>
              </span>
            </NavLink>
          ))}
        </nav>

        <Magnetic>
          <button
            className={`header__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span />
            <span />
          </button>
        </Magnetic>
      </header>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

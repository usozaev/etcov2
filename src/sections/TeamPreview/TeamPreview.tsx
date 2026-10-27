import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import RevealText from '../../components/RevealText/RevealText';
import { team } from '../../data/team';
import { EASE_CURTAIN } from '../../lib/gsap';
import './TeamPreview.css';

/** Список имён: наведение на строку показывает портрет */
export default function TeamPreview() {
  const [active, setActive] = useState(0);
  const member = team[active];

  return (
    <section className="section tpreview container">
      <div className="tpreview__head">
        <span className="eyebrow">Команда</span>
        <RevealText as="h2" className="display h-xl" text={'Люди\nза проектами'} />
      </div>

      <div className="tpreview__body">
        <ul className="tpreview__list">
          {team.map((m, i) => (
            <li key={m.id}>
              <Link
                to="/team"
                className={`tpreview__row ${i === active ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="Команда"
              >
                <span className="tpreview__name">{m.name}</span>
                <span className="tpreview__role">{m.role}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="tpreview__photo">
          <AnimatePresence initial={false}>
            <motion.img
              key={member.id}
              src={member.photo}
              alt={member.name}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.2 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.2 } }}
              transition={{ duration: 0.9, ease: EASE_CURTAIN }}
            />
          </AnimatePresence>
        </div>
      </div>

      <Link to="/team" className="link-arrow tpreview__cta">
        Вся команда <ArrowIcon />
      </Link>
    </section>
  );
}

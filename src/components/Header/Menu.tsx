import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contacts, nav } from '../../data/site';
import { EASE_CURTAIN } from '../../lib/gsap';

const ORIGIN = 'calc(100% - 56px) 42px';

export default function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu"
          initial={{ clipPath: `circle(0% at ${ORIGIN})` }}
          animate={{ clipPath: `circle(150% at ${ORIGIN})` }}
          exit={{ clipPath: `circle(0% at ${ORIGIN})`, transition: { duration: 0.7, ease: EASE_CURTAIN, delay: 0.15 } }}
          transition={{ duration: 0.9, ease: EASE_CURTAIN }}
        >
          <div className="menu__preview">
            <AnimatePresence initial={false}>
              <motion.img
                key={nav[active].preview}
                src={nav[active].preview}
                alt=""
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
          </div>

          <nav className="menu__nav">
            {nav.map((item, i) => (
              <div className="menu__item" key={item.to}>
                <motion.div
                  initial={{ y: '110%' }}
                  animate={{ y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.07 } }}
                  exit={{ y: '-110%', transition: { duration: 0.45, ease: EASE_CURTAIN, delay: i * 0.03 } }}
                >
                  <Link
                    to={item.to}
                    className="menu__link display"
                    onMouseEnter={() => setActive(i)}
                    onClick={onClose}
                  >
                    <span className="menu__index">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              </div>
            ))}
          </nav>

          <motion.div
            className="menu__footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            <a href={contacts.phoneHref}>{contacts.phone}</a>
            <span>{contacts.address}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_CURTAIN } from '../../lib/gsap';
import './PageTransition.css';

const DURATION = 0.8;

/**
 * Обёртка страницы: при уходе шторка поднимается снизу и закрывает экран,
 * при входе — уезжает вверх, показывая название новой страницы.
 */
export default function PageTransition({ children, label }: { children: ReactNode; label: string }) {
  return (
    <>
      {/* без initial: transform на предке сломал бы pin у ScrollTrigger */}
      <motion.main
        className="page"
        exit={{ y: -120, transition: { duration: DURATION, ease: EASE_CURTAIN } }}
      >
        {children}
      </motion.main>

      <motion.div
        className="curtain curtain--enter"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: DURATION, ease: EASE_CURTAIN }}
      />

      <motion.div
        className="curtain curtain--leave"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: DURATION, ease: EASE_CURTAIN, delay: 0.35 } }}
        exit={{ scaleY: 0 }}
      >
        <motion.span
          className="curtain__label display"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -60, transition: { duration: 0.5, ease: EASE_CURTAIN, delay: 0.2 } }}
        >
          {label}
        </motion.span>
      </motion.div>
    </>
  );
}

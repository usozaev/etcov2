import Marquee from '../../components/Marquee/Marquee';
import { partners } from '../../data/site';
import './Partners.css';

export default function Partners() {
  return (
    <section className="partners" aria-label="Партнёры">
      <span className="eyebrow container">Партнёры и экосистема</span>
      <Marquee speed={3} className="partners__row">
        {partners.map((p) => (
          <span className="partners__item display" key={p}>
            {p}
            <i className="partners__star">✦</i>
          </span>
        ))}
      </Marquee>
      <Marquee speed={2} reverse className="partners__row partners__row--ghost">
        {partners.map((p) => (
          <span className="partners__item display" key={p}>
            {p}
            <i className="partners__star">✦</i>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

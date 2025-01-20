import Link from 'next/link';
import styles from './Footer.module.scss';

interface NavLink {
  name: string;
  slug: string;
}

export default function Footer({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <div className={styles.container}>
      <p className={styles.credit}>
        Designed & developed with 🤍 by Palina Karzhenka @2025
      </p>
    </div>
  );
}

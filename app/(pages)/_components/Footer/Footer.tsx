import Link from 'next/link';
import styles from './Footer.module.scss';

interface NavLink {
  name: string;
  slug: string;
}

export default function Footer({ navLinks }: { navLinks: NavLink[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <div className={styles.description}>
          <h2>Seanema World</h2>
          <p>
          Inspired by the world of cinematogrpahy, 
          this website is a great way to share your thoughts and reactions to films.
          As a beginner project, this was a learning opportunity to build an interactive application
          using existing sites, such as IMDb and Letterboxd, as our model.
          </p>
        </div>
        <div className={styles.navigation}>
          <div className={styles.learn_more}>
            <h2>Site Links</h2>
            <div className={styles.learn_more_links}>
              {navLinks.map((link) => {
                return (
                  <Link key={link.slug} href={link.slug}>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.projects}>
            <h2>Learn More</h2>
            <div className={styles.project_link_columns}>
              <div>
                {/* Should be done with a loop */}
                <Link href="/project/1">Project 1</Link>
                <Link href="/project/2">Project 2</Link>
                <Link href="/project/3">Project 3</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.credit}>
        Designed & developed with 🤍 by Palina Karzhenka and #include at Davis @2025
      </p>
    </div>
  );
}

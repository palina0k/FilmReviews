import styles from './About.module.scss';
import Image from 'next/image';


export default function Contact() {
    return(
        <div className={styles.container}>
            <Image src="/index/movie_theater.jpg" fill alt="movie theater" style={{ objectFit: 'cover', opacity: '0.9' }} />
            <div className={styles.main}>
                <div className={styles.first}>
                    <h1>What is Cinema World about?</h1>
                    <p>Create a profile, create playlists of your favorite movies, rate and review any movie you've added!</p>
                </div>
                <div className={styles.first}>
                    <h1>What inspired Cinema World?</h1>
                    <p>Web sites, such as as Letterboxd and IMDb, were the main inspiration for a movie review application.</p>
                </div>
                <div className={styles.first}>
                    <h1>Our Future Plans: </h1>
                    <p>Features such as adding movie posters, creating playlist covers, and customizing User Profile are coming soon!</p>
                </div>
            </div>
        </div>
    );
}
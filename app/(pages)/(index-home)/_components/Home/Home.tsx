import styles from './Home.module.scss';
import Image from 'next/image';


export default function Landing() {
    return(
        <div className={styles.container}>
            <Image src="/index/movie_theater.jpg" fill alt="movie theater" style={{ objectFit: 'cover', opacity: '0.9' }} />
            <div className={styles.text_header}>
                <h3>Welcome to</h3>
                <h1>Cinema World!</h1>
            </div>
            <div className={styles.body_container}>
                <a href="../../profile" className={styles.button}>Start Creating</a>
                <a href="../../search" className={styles.button}>See What Others Made</a>
                <a href="../../about" className={styles.button}>Learn More</a>
            </div>
        </div>
    );
}
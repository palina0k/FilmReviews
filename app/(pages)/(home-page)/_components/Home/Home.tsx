import styles from './Home.module.scss';

export default function Hero() {
    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Welcome to Seanema World</h1>
                <p>Rate, review, and create playlists of your favorite movies.</p>
            </main>
        </div>
    );
}
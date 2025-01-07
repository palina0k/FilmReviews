import styles from './Search.module.scss';

export default function Hero() {
    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Search Movies</h1>
                <p> Use the search bar to find your favorite movies.</p>
            </main>
        </div>
    );
}
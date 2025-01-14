import styles from './Playlists.module.scss';

export default function Lists() {
    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Here are your playlists:</h1>
                <p>^^List of playlists^^</p>
            </main>
        </div>
    );
}
import styles from './About.module.scss';


export default function Contact() {
    return(
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>Here's a bit about this application:</h1>
                <p>Create a profile, create playlists, add a movie to a playlist by rating it.</p>
            </main>
        </div>
    );
}
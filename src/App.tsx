import styles from './App.module.css';

function App() {
    return (
        <div className={styles.mainContainer}>
            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <img
                        className={styles.logo}
                        src="/images/logo.png"
                        alt="BeranaVis Logo"
                    />
                    <div className={styles.logoTitles}>
                        <h1 className={styles.logoTitle}>BeranaVis</h1>
                        <h2 className={styles.logoSubTitle}>
                            Data Structures and Algorithms Visualizer
                        </h2>
                    </div>
                </div>
                <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                        <img
                            className={styles.github}
                            src="/images/user-avatar.svg"
                            alt="Github Icon"
                        />
                    </div>
                    <div className={styles.avatar}>
                        <a
                            href="https://github.com/kalibetre/berana-vis"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                className={styles.github}
                                src="/images/github-icon.png"
                                alt="Github Icon"
                            />
                        </a>
                    </div>
                </div>
            </header>
            <main className={styles.main}></main>
            <footer className={styles.footer}>
                Copy right &#169; Kalkidan Betre
            </footer>
        </div>
    );
}

export default App;

import { GitHubIcon, UserAvatarIcon } from '../../icons';
import styles from './AppBar.module.css';

const AppBar = () => {
    return (
        <header>
            <div className={styles.content}>
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
                    <span className={styles.icon}>
                        <UserAvatarIcon />
                    </span>
                    <span className={styles.icon}>
                        <a
                            href="https://github.com/kalibetre/berana-vis"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon />
                        </a>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default AppBar;

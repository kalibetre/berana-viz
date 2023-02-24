import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
import { signOut } from '../../auth/auth';
import useAuth from '../../hooks/useAuth';
import { GitHubIcon, UserAvatarIcon } from '../../icons';
import styles from './AppBar.module.css';

const AppBar = () => {
    const { checkingUser, user } = useAuth();

    return (
        <header>
            <div className={styles.content}>
                <Link to="/" className={styles.logoContainer}>
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
                </Link>
                <div className={styles.avatarContainer}>
                    {!checkingUser && (
                        <Menu
                            menuButton={
                                <div className={styles.icon}>
                                    {user ? (
                                        <span className={styles.avatar}>
                                            {user?.email
                                                ?.slice(0, 1)
                                                .toUpperCase()}
                                        </span>
                                    ) : (
                                        <UserAvatarIcon />
                                    )}
                                </div>
                            }
                            transition
                        >
                            {user ? (
                                <MenuItem onClick={signOut}>Log Out</MenuItem>
                            ) : (
                                <MenuItem>
                                    <Link to="/auth/signin">Sign In</Link>
                                </MenuItem>
                            )}
                        </Menu>
                    )}
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

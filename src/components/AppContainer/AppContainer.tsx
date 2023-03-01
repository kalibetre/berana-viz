import { ReactNode } from 'react';
import AppBar from '../AppBar/AppBar';
import styles from './AppContainer.module.css';

interface AppContainerProps {
    children: ReactNode;
}

export const AppContainer = (props: AppContainerProps) => {
    return (
        <div className={styles.mainContainer}>
            <AppBar />
            <main className={styles.main}>{props.children}</main>
            <footer>
                <span className={styles.footer}>
                    &#169; {new Date().getFullYear()} Kalkidan Betre
                </span>
            </footer>
        </div>
    );
};

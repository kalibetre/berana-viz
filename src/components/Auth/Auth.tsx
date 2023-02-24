import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import styles from './Auth.module.css';

interface AuthProps {
    children: ReactNode;
    title: string;
}

const Auth = (props: AuthProps) => {
    const navigate = useNavigate();
    const { checkingUser } = useAuth((user) => {
        if (user) navigate('/', { replace: true });
    });

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <header>
                    <img
                        className={styles.logo}
                        src="/images/logo.png"
                        alt="BeranaVis Logo"
                    />
                    <div className={styles.logoTitles}>
                        <h1 className={styles.logoTitle}>BeranaVis</h1>
                        <h2 className={styles.logoSubTitle}>{props.title}</h2>
                    </div>
                </header>
                {checkingUser ? (
                    <div className={styles.loading}>
                        Please wait, checking ....
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </div>
    );
};

export default Auth;

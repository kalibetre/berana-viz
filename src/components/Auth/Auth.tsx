import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../auth/firebase';
import styles from './Auth.module.css';

interface AuthProps {
    children: ReactNode;
    title: string;
}

const Auth = (props: AuthProps) => {
    const navigate = useNavigate();
    const [checkingUser, setCheckingUser] = useState<boolean>(true);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            setCheckingUser(false);
            if (user) navigate('/', { replace: true });
        });
    }, [navigate]);

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

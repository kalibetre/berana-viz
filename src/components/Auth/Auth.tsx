import styles from './Auth.module.css';

export const Auth = () => {
    return (
        <div className={styles.modalContainer}>
            <header>BeranaViz</header>
            <form>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="" className={styles.inputLabel}></label>
                        <input type="text" className={styles.input} />
                    </div>
                </div>
            </form>
        </div>
    );
};

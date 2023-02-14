import styles from './App.module.css';
import { AppBar } from './components';

function App() {
    return (
        <div className={styles.mainContainer}>
            <AppBar />
            <main className={styles.main}></main>
            <footer className={styles.footer}>
                Copy right &#169; Kalkidan Betre
            </footer>
        </div>
    );
}

export default App;

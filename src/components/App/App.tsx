import { AppBar, Canvas, DocumentSideBar, VisualizationSideBar } from '..';
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.mainContainer}>
            <AppBar />
            <main className={styles.main}>
                <Canvas />
                <div className={styles.leftToolBox}>
                    <DocumentSideBar />
                </div>
                <div className={styles.rightToolBox}>
                    <VisualizationSideBar />
                </div>
            </main>
            <footer>
                <span className={styles.footer}>
                    Copy right &#169; Kalkidan Betre
                </span>
            </footer>
        </div>
    );
};

export default App;

import { Provider } from 'react-redux';
import { AppBar, Canvas, DocumentSideBar, VisualizationSideBar } from '..';
import { store } from '../../store/store';
import { ModalProvider } from '../Providers';
import styles from './App.module.css';

const App = () => {
    return (
        <Provider store={store}>
            <ModalProvider>
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
            </ModalProvider>
        </Provider>
    );
};

export default App;

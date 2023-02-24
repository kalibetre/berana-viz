import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Canvas, DocumentSideBar, VisualizationSideBar } from '..';
import { store } from '../../store/store';
import { AppContainer } from '../AppContainer/AppContainer';
import { Auth } from '../Auth/Auth';
import ErrorPage from '../ErrorPage/ErrorPage';
import { ModalProvider } from '../Providers';
import styles from './App.module.css';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <AppContainer>
                    <Canvas />
                    <div className={styles.leftToolBox}>
                        <DocumentSideBar />
                    </div>
                    <div className={styles.rightToolBox}>
                        <VisualizationSideBar />
                    </div>
                </AppContainer>
            ),
            errorElement: (
                <AppContainer>
                    <ErrorPage />
                </AppContainer>
            ),
        },
        {
            path: '/auth',
            element: (
                <AppContainer>
                    <Auth />
                </AppContainer>
            ),
        },
    ]);
    return (
        <Provider store={store}>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </Provider>
    );
};

export default App;

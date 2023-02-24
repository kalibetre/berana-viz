import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Canvas, DocumentSideBar, VisualizationSideBar } from '..';
import { store } from '../../store/store';
import { AppContainer } from '../AppContainer/AppContainer';
import SignIn from '../Auth/SignInForm';
import SignUp from '../Auth/SignUpForm';
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
            path: '/auth/signin',
            element: (
                <AppContainer>
                    <SignIn />
                </AppContainer>
            ),
        },
        {
            path: '/auth/signup',
            element: (
                <AppContainer>
                    <SignUp />
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

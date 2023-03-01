import { useRouteError } from 'react-router-dom';
import { ErrorIcon } from '../../icons';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
    const error: any = useRouteError();

    return (
        <div className={styles.container}>
            <span className={styles.icon}>
                <ErrorIcon />
            </span>
            <h1>Oops!</h1>
            <p>Error occurred in acquiring the resource you requested</p>
            <p>
                <i>{error.statusText}</i>
            </p>
        </div>
    );
};

export default ErrorPage;

import { ReactNode } from 'react';
import { CloudDataIcon, TemporaryDocIcon } from '../../../icons';
import styles from './DocumentItem.module.css';

interface DocumentItemProps {
    onClick?: () => void;
    children: ReactNode;
    savedToCloud?: boolean;
}

const DocumentItem = (props: DocumentItemProps) => {
    return (
        <div className={styles.document} onClick={props.onClick}>
            <div className={styles.info}>
                <span className={styles.title}>{props.children}</span>
                <span className={styles.subtitle}>Feb 12, 2023</span>
            </div>
            <span className={styles.icon}>
                {props.savedToCloud ? <CloudDataIcon /> : <TemporaryDocIcon />}
            </span>
        </div>
    );
};

DocumentItem.defaultProps = {
    savedToCloud: false,
};

export default DocumentItem;

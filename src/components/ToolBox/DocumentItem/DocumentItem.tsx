import { Document } from '../../../types';
import styles from './DocumentItem.module.css';

interface DocumentItemProps {
    onClick?: () => void;
    document: Document;
    isSelected: boolean;
}

const DocumentItem = (props: DocumentItemProps) => {
    return (
        <div
            className={
                props.isSelected ? styles.selectedDocument : styles.document
            }
            onClick={props.onClick}
        >
            <div className={styles.info}>
                <span className={styles.title}>{props.document.title}</span>
                <span className={styles.subtitle}>
                    {props.document.modified}
                </span>
            </div>
        </div>
    );
};

DocumentItem.defaultProps = {
    isSelected: false,
};

export default DocumentItem;

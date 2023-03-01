import { Document } from '../../../types';
import styles from './DocumentItem.module.css';

interface DocumentItemProps {
    onClick?: () => void;
    document: Document;
    isSelected: boolean;
}

const DocumentItem = (props: DocumentItemProps) => {
    const getFormattedDate = () => {
        const date = new Date(props.document.modified ?? '');
        return date.toLocaleDateString('en-us', {
            hour: 'numeric',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div
            className={
                props.isSelected ? styles.selectedDocument : styles.document
            }
            onClick={props.onClick}
        >
            <div className={styles.info}>
                <span className={styles.title}>{props.document.title}</span>
                <span className={styles.subtitle}>{getFormattedDate()}</span>
            </div>
        </div>
    );
};

DocumentItem.defaultProps = {
    isSelected: false,
};

export default DocumentItem;

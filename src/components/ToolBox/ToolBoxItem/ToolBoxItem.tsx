import { ReactNode } from 'react';
import styles from './ToolBoxItem.module.css';

interface ToolBoxItemProps {
    onClick?: () => void;
    children: ReactNode;
}

const ToolBoxItem = (props: ToolBoxItemProps) => {
    return (
        <button className={styles.button} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default ToolBoxItem;

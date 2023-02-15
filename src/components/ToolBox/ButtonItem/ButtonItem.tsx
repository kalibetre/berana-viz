import { ReactNode } from 'react';
import styles from './ButtonItem.module.css';

interface ButtonItemProps {
    onClick?: () => void;
    children: ReactNode;
}

const ButtonItem = (props: ButtonItemProps) => {
    return (
        <button className={styles.button} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default ButtonItem;

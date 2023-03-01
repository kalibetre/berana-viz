import { ReactNode } from 'react';
import styles from './ButtonItem.module.css';

interface ButtonItemProps {
    onClick?: () => void;
    children: ReactNode;
    disabled?: boolean;
}

const ButtonItem = (props: ButtonItemProps) => {
    return (
        <button
            disabled={props.disabled}
            className={styles.button}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

ButtonItem.defaultProps = {
    disabled: false,
};

export default ButtonItem;

import styles from './RadioButton.module.css';

interface RadioButtonProps {
    onClick?: () => void;
    name: string;
    value: string;
    label: string;
    checked?: boolean;
    disabled?: boolean;
}

const RadioButton = (props: RadioButtonProps) => {
    return (
        <div className={styles.radioContainer}>
            <label htmlFor={props.value}>{props.label}</label>
            <input
                type="radio"
                id={props.value}
                disabled={props.disabled}
                className={styles.radio}
                onClick={props.onClick}
                name={props.name}
                value={props.value}
                checked={props.checked}
            />
        </div>
    );
};

RadioButton.defaultProps = {
    disabled: false,
    checked: false,
};

export default RadioButton;

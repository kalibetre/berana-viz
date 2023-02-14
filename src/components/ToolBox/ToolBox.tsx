import { ReactNode, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../../icons';
import styles from './ToolBox.module.css';

interface ToolBoxProps {
    title: string;
    icon?: ReactNode;
    expanded?: boolean;
    children: ReactNode;
}

const ToolBox = (props: ToolBoxProps) => {
    const [contentOpen, setContentOpen] = useState(props.expanded);

    const handleToggleClick = () => {
        setContentOpen((prev) => !prev);
    };

    return (
        <section className={styles.container}>
            <header className={styles.header} onClick={handleToggleClick}>
                <div className={styles.headerTitle}>
                    {props.icon && (
                        <span className={styles.icon}>{props.icon}</span>
                    )}
                    {props.title}
                </div>
                <span className={styles.arrowDown}>
                    {contentOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
            </header>
            {contentOpen && (
                <div className={styles.content}>{props.children}</div>
            )}
        </section>
    );
};

ToolBox.defaultProps = {
    expanded: true,
};

export default ToolBox;

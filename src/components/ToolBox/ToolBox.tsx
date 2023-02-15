import { ReactNode, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../../icons';
import styles from './ToolBox.module.css';

interface ToolBoxProps {
    title: string;
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
                <span className={styles.arrowDown}>
                    {contentOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
                <div className={styles.headerTitle}>{props.title}</div>
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

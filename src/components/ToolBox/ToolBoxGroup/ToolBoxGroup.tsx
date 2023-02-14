import { ReactNode } from 'react';
import styles from './ToolBoxGroup.module.css';

interface ToolBoxGroupProps {
    title: string;
    children?: ReactNode;
}

const ToolBoxGroup = (props: ToolBoxGroupProps) => {
    return (
        <section>
            <header className={styles.title}>{props.title}</header>
            <div className={styles.content}>{props.children}</div>
        </section>
    );
};

export default ToolBoxGroup;

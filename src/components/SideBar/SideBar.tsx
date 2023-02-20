import { ReactNode, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import styles from './SideBar.module.css';

interface SideBarProps {
    title: string;
    expanded?: boolean;
    children: ReactNode;
    width?: string;
    height?: string;
    side?: 'left' | 'right';
}

const SideBar = (props: SideBarProps) => {
    const [contentOpen, setContentOpen] = useState(props.expanded);

    const handleToggleClick = () => {
        setContentOpen((prev) => !prev);
    };

    const toolbarToggleIcon = () => {
        if (props.side === 'left') {
            return contentOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />;
        } else {
            return contentOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />;
        }
    };

    const ToolBarHeader = (
        <header
            className={
                props.side === 'left' ? styles.leftHeader : styles.rightHeader
            }
            onClick={handleToggleClick}
        >
            <span className={styles.arrowDown}>{toolbarToggleIcon()}</span>
            <div className={styles.headerTitle}>{props.title}</div>
        </header>
    );

    return (
        <section style={{ height: props.height }} className={styles.container}>
            {props.side === 'right' && ToolBarHeader}
            {contentOpen && (
                <div style={{ width: props.width }} className={styles.content}>
                    {props.children}
                </div>
            )}
            {props.side === 'left' && ToolBarHeader}
        </section>
    );
};

SideBar.defaultProps = {
    expanded: true,
    width: '300px',
    height: '100%',
    side: 'left',
};

export default SideBar;

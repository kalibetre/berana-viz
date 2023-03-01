import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useWindowResize } from '../../hooks';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import styles from './SideBar.module.css';

interface SideBarProps {
    title: string;
    children: ReactNode;
    width?: string;
    height?: string;
    side?: 'left' | 'right';
    collapsed?: boolean;
}

const SideBar = (props: SideBarProps) => {
    const [contentOpen, setContentOpen] = useState<boolean | null>(null);
    const [contentOpenDefault, setContentOpenDefault] = useState<boolean>(true);

    const size = useWindowResize();

    const handleToggleClick = () => {
        setContentOpen((prev) => (prev === null ? !contentOpenDefault : !prev));
    };

    const toolbarToggleIcon = () => {
        const open = contentOpen ?? contentOpenDefault;
        if (props.side === 'left') {
            return open ? <ChevronLeftIcon /> : <ChevronRightIcon />;
        } else {
            return open ? <ChevronRightIcon /> : <ChevronLeftIcon />;
        }
    };

    const setDefault = useCallback(() => {
        const sz = size ?? {
            width: window.innerWidth,
            height: window.innerWidth,
        };
        if (contentOpen === null && sz.width < 650) {
            setContentOpenDefault(false);
            setContentOpen(false);
        }
    }, [size, contentOpen]);

    useEffect(() => {
        setDefault();
    }, [setDefault]);

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
            {!props.collapsed && (contentOpen ?? contentOpenDefault) && (
                <div style={{ width: props.width }} className={styles.content}>
                    {props.children}
                </div>
            )}
            {props.side === 'left' && ToolBarHeader}
        </section>
    );
};

SideBar.defaultProps = {
    width: '300px',
    height: '100%',
    side: 'left',
    collapsed: false,
};

export default SideBar;

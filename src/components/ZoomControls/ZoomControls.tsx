import { ResetIcon, ZoomInIcon, ZoomOutIcon } from '../../icons';
import styles from './ZoomControls.module.css';

interface ZoomControlsProps {
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleZoomExtents: () => void;
}

const ZoomControls = (props: ZoomControlsProps) => {
    return (
        <div className={styles.zoomControls}>
            <button className={styles.zoomBtn} onClick={props.handleZoomIn}>
                <span>
                    <ZoomInIcon />
                </span>
                Zoom In
            </button>
            <button className={styles.zoomBtn} onClick={props.handleZoomOut}>
                <span>
                    <ZoomOutIcon />
                </span>
                Zoom Out
            </button>
            <button
                className={styles.zoomBtn}
                onClick={props.handleZoomExtents}
            >
                <span>
                    <ResetIcon />
                </span>
                Reset
            </button>
        </div>
    );
};

export default ZoomControls;

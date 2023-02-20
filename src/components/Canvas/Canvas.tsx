import { ArrayGraphic, TreeGraphic } from '..';
import { useAppSelector } from '../../store/store';
import { DSAType } from '../../types';
import styles from './Canvas.module.css';

const Canvas = () => {
    const dsaType = useAppSelector((state) => state.canvas.dsaType);
    return (
        <div className={styles.container}>
            {dsaType === DSAType.ARRAY ? <ArrayGraphic /> : <TreeGraphic />}
        </div>
    );
};

export default Canvas;

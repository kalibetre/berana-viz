import { useEffect, useRef } from 'react';
import styles from './Canvas.module.css';

const Canvas = () => {
    const canvasRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        console.log(canvasRef?.current?.getBoundingClientRect());
    }, []);

    return (
        <svg ref={canvasRef} className={styles.canvas}>
            Canvas
        </svg>
    );
};

export default Canvas;

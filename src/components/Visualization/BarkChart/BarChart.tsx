import chroma from 'chroma-js';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { useWindowResize } from '../../../hooks';
import { Bar, Size } from '../../../types';
import { CHART_COLOR_RANGE } from '../../../utils/constants';
import styles from './BarChart.module.css';

import { useSelector } from 'react-redux';
import { Node } from '../../../store/slices/arraySlice';
import { arraySelectors } from '../../../store/store';

const NODE_RECT: Size = { width: 40, height: 25 };

const BarChart = () => {
    const nodes: Node[] = useSelector(arraySelectors.selectAll);

    const [bars, setBars] = useState<Bar[]>([]);
    const canvasRef = useRef<SVGSVGElement>(null);
    const size = useWindowResize();

    useEffect(() => {
        if (nodes.length === 0) return;
        const data = nodes.map((node) => node.value);
        const rect = canvasRef.current?.getBoundingClientRect();
        const midPoint = {
            x: rect ? rect.width / 2 : 0,
            y: rect ? rect.height / 2 : 0,
        };
        const { low, mid, high } = CHART_COLOR_RANGE;

        const colors = chroma.scale([low, mid, high]).mode('hsl');
        const xScale = d3
            .scaleBand()
            .range([0, data.length * NODE_RECT.width])
            .padding(0.1);
        const yScale = d3
            .scaleLinear()
            .range([(rect ? rect?.height : 0) - 50, 50]);
        const colorScale = d3.scaleLinear();

        xScale.domain(data.map((value, i) => `${i}-${value.toString()}`));
        yScale.domain([0, Math.max(...data)]);
        colorScale.domain([Math.min(...data), Math.max(...data)]);

        const stPtX = midPoint.x - (data.length * 1.05 * NODE_RECT.width) / 2;
        const newBars = data.map((d: number, i: number) => {
            let xPt = stPtX + (xScale(`${i}-${d.toString()}`) || 0);
            let yPt = yScale(d);

            return {
                value: d,
                x: xPt,
                y: yPt,
                width: xScale.bandwidth(),
                height: yScale(0) - yPt,
                color: colors(colorScale(d)),
            };
        });

        console.log(newBars);
        setBars(newBars);
    }, [nodes, size]);

    return (
        <svg ref={canvasRef} className={styles.canvas} scale={0.5}>
            {bars.map((bar, i) => (
                <g key={`g-${i}`}>
                    <rect
                        key={`rect-bs-${i}`}
                        x={bar.x}
                        y={bar.y + bar.height - NODE_RECT.height}
                        width={bar.width}
                        height={bar.width}
                        fill={'none'}
                        stroke="black"
                        strokeWidth="1px"
                    />
                    <rect
                        className={styles.bar}
                        key={`rect-${i}`}
                        x={bar.x}
                        y={bar.y - 3 - NODE_RECT.height}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                    />
                    <text
                        key={`text-${i}`}
                        x={bar.x + bar.width / 2}
                        y={
                            bar.y +
                            bar.height +
                            bar.width / 2 -
                            NODE_RECT.height
                        }
                        textAnchor="middle"
                        alignmentBaseline="central"
                    >
                        {bar.value}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default BarChart;

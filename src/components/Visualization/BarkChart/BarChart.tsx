import chroma from 'chroma-js';
import * as d3 from 'd3';
import panzoom, { PanZoom } from 'panzoom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowResize } from '../../../hooks';
import { Node, nodeSelected } from '../../../store/slices/arraySlice';
import { AppDispatch, arraySelectors, RootState } from '../../../store/store';
import { Bar, Size } from '../../../types';
import { CHART_COLOR_RANGE } from '../../../utils/constants';
import styles from './BarChart.module.css';

const NODE_RECT: Size = { width: 40, height: 25 };

const BarChart = () => {
    const nodes: Node[] = useSelector(arraySelectors.selectAll);
    const svgRef = useRef<SVGGElement>(null);
    const selectedNodeId = useSelector<RootState>(
        (state) => state.array.selectedId
    );
    const [panZoom, setPanZoom] = useState<PanZoom | null>(null);
    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const [bars, setBars] = useState<Bar[]>([]);
    const canvasRef = useRef<SVGSVGElement>(null);
    const size = useWindowResize();

    useEffect(() => {
        draw(nodes);
        const handleKeyDown = (_e: KeyboardEvent) => dispatch(nodeSelected(''));
        window.addEventListener('keydown', handleKeyDown);
        if (svgRef.current && panZoom === null) {
            setPanZoom(panzoom(svgRef.current));
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            panZoom?.dispose();
        };
    }, [nodes, size, dispatch, panZoom]);

    const draw = (nodes: Node[]) => {
        if (nodes.length === 0) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        const midPoint = {
            x: rect ? rect.width / 2 : 0,
            y: rect ? rect.height / 2 : 0,
        };
        const { low, mid, high } = CHART_COLOR_RANGE;

        const colors = chroma.scale([low, mid, high]).mode('hsl');
        const xScale = d3
            .scaleBand()
            .range([0, nodes.length * NODE_RECT.width])
            .padding(0.1);
        const yScale = d3
            .scaleLinear()
            .range([(rect ? rect?.height : 0) - 50, 50]);
        const colorScale = d3.scaleLinear();

        xScale.domain(nodes.map((node) => node.id));

        const values = nodes.map((node) => node.value);
        yScale.domain([0, Math.max(...values)]);
        colorScale.domain([Math.min(...values), Math.max(...values)]);

        const stPtX = midPoint.x - (nodes.length * 1.05 * NODE_RECT.width) / 2;
        const newBars = nodes.map((node: Node, i: number) => {
            let xPt = stPtX + (xScale(node.id) || 0);
            let yPt = yScale(node.value);

            return {
                id: node.id,
                value: node.value,
                x: xPt,
                y: yPt,
                width: xScale.bandwidth(),
                height: yScale(0) - yPt,
                color: colors(colorScale(node.value)),
            };
        });

        setBars(newBars);
    };

    const handleNodeClick = (id: string) => {
        dispatch(nodeSelected(id));
    };

    return (
        <svg ref={canvasRef} className={styles.canvas}>
            <g ref={svgRef}>
                {bars.map((bar) => (
                    <g key={bar.id} onClick={() => handleNodeClick(bar.id)}>
                        <rect
                            className={
                                bar.id === selectedNodeId
                                    ? styles.activeNode
                                    : ''
                            }
                            key={`rect-bs-${bar.id}`}
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
                            key={`rect-${bar.id}`}
                            x={bar.x}
                            y={bar.y - 3 - NODE_RECT.height}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                        />
                        <text
                            className={styles.nodeText}
                            key={`text-${bar.id}`}
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
            </g>
        </svg>
    );
};

export default BarChart;

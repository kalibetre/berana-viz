import chroma from 'chroma-js';
import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowResize } from '../../../hooks';
import { nodeSelected } from '../../../store/slices/nodesSlice';
import {
    AppDispatch,
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { Bar, Node, NodeStatus, Size } from '../../../types';
import { CHART_COLOR_RANGE } from '../../../utils/constants';
import ZoomControls from '../../ZoomControls/ZoomControls';
import styles from './ArrayGraphic.module.css';

const NODE_RECT: Size = { width: 40, height: 25 };

interface ArrayGraphicProps {
    margin: number;
}

const ArrayGraphic = (props: ArrayGraphicProps) => {
    let nodes: Node[] = useAppSelector(selectAllNodes);
    const svgContentRef = useRef<SVGGElement>(null);

    const selectedNodeId = useAppSelector((state) => state.nodes.selectedId);
    const dispatch: AppDispatch = useAppDispatch();

    const [bars, setBars] = useState<Bar[]>([]);

    const canvasRef = useRef<SVGSVGElement>(null);
    const size = useWindowResize();

    const zoomHandler = useCallback(
        () =>
            d3.zoom().on('zoom', (e: any) => {
                d3.select(svgContentRef.current).attr('transform', e.transform);
            }) as any,
        []
    );

    const draw = useCallback(
        () => (nodes: Node[]) => {
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
                .range([
                    (rect ? rect?.height : 0) - props.margin,
                    props.margin,
                ]);
            const colorScale = d3.scaleLinear();

            xScale.domain(nodes.map((node) => node.id));

            const values = nodes.map((node) => node.value);
            yScale.domain([0, Math.max(...values)]);
            colorScale.domain([Math.min(...values), Math.max(...values)]);

            const stPtX =
                midPoint.x - (nodes.length * 1.05 * NODE_RECT.width) / 2;
            const newBars = nodes.map((node: Node, i: number) => {
                let xPt = stPtX + (xScale(node.id) || 0);
                let yPt = yScale(node.value);

                return {
                    id: node.id,
                    value: node.value,
                    status: node.status,
                    x: xPt,
                    y: yPt,
                    width: xScale.bandwidth(),
                    height: yScale(0) - yPt,
                    color: colors(colorScale(node.value)),
                };
            });

            setBars(newBars);
            d3.select(canvasRef.current).call(zoomHandler());
        },
        [zoomHandler, props.margin]
    );

    const handleNodeClick = (id: string) => {
        dispatch(nodeSelected(id));
    };

    const handleZoomExtents = () => {
        d3.select(canvasRef.current)
            .transition()
            .duration(300)
            .call(zoomHandler().transform, d3.zoomIdentity);
    };

    const handleZoomIn = () => {
        d3.select(canvasRef.current)
            .transition()
            .duration(300)
            .call(zoomHandler().scaleBy, 1.2);
    };

    const handleZoomOut = () => {
        d3.select(canvasRef.current)
            .transition()
            .duration(300)
            .call(zoomHandler().scaleBy, 0.8);
    };

    useEffect(() => {
        draw()(nodes);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') dispatch(nodeSelected(''));
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nodes, size, dispatch, draw]);

    return (
        <div className={styles.graphicContent}>
            <div className={styles.zoomControlsBox}>
                <ZoomControls
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleZoomExtents={handleZoomExtents}
                />
            </div>
            <svg ref={canvasRef} className={styles.canvas}>
                <g ref={svgContentRef}>
                    {bars.map((bar) => {
                        const classes = [];
                        if (bar.id === selectedNodeId)
                            classes.push(styles.active);
                        else {
                            if (bar.status === NodeStatus.ACTIVE)
                                classes.push(styles.active);
                            else if (bar.status === NodeStatus.VISITED)
                                classes.push(styles.visited);
                        }
                        return (
                            <g
                                key={bar.id}
                                onClick={() => handleNodeClick(bar.id)}
                            >
                                <rect
                                    className={classes.join(' ')}
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
                                    className={classes.join(' ')}
                                    key={`rect-${bar.id}`}
                                    x={bar.x}
                                    y={
                                        bar.y -
                                        3 -
                                        NODE_RECT.height +
                                        props.margin
                                    }
                                    width={bar.width}
                                    height={
                                        bar.height > props.margin
                                            ? bar.height - props.margin
                                            : 0
                                    }
                                    fill={bar.color}
                                />
                                <text
                                    className={classes.join(' ')}
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
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

ArrayGraphic.defaultProps = {
    margin: 50,
};

export default ArrayGraphic;

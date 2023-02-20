import * as d3 from 'd3';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ZoomControls } from '../..';
import { useWindowResize } from '../../../hooks';
import { nodeSelected } from '../../../store/slices/arraySlice';
import {
    AppDispatch,
    arraySelectors,
    RootState,
    useAppDispatch,
} from '../../../store/store';
import { Node, TreeNode } from '../../../types';
import { convertToTree } from '../../../utils/tree-converter';
import styles from './TreeGraphic.module.css';

const TREE_NODE: number = 70;

interface TreeGraphicProps {
    margin: number;
}

const TreeGraphic = (props: TreeGraphicProps) => {
    const nodes: Node[] = useSelector(arraySelectors.selectAll);
    const [treeNodes, setTreeNodes] = useState<
        d3.HierarchyPointNode<TreeNode>[]
    >([]);
    const [treeLinks, setTreeLinks] = useState<
        d3.HierarchyPointLink<TreeNode>[]
    >([]);
    const [offsetX, setOffsetX] = useState<number>(0);

    const svgContentRef = useRef<SVGGElement>(null);
    const selectedNodeId = useSelector<RootState>(
        (state) => state.array.selectedId
    );
    const dispatch: AppDispatch = useAppDispatch();

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
            const treeData: TreeNode | null = convertToTree(nodes);
            if (treeData) {
                const rect = canvasRef.current?.getBoundingClientRect();
                const treemap = d3
                    .tree<TreeNode>()
                    .nodeSize([TREE_NODE, TREE_NODE]);
                const treeNodeHy = d3.hierarchy<TreeNode>(
                    treeData,
                    (d) => d.children
                );
                const treeMap = treemap(treeNodeHy);
                setTreeNodes([...treeMap.descendants()]);
                setTreeLinks([...treeMap.links()]);

                if (rect) setOffsetX(rect?.width / 2);
                d3.select(canvasRef.current).call(zoomHandler());
            }
        },
        [zoomHandler]
    );

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

    const handleNodeClick = (id: string) => {
        dispatch(nodeSelected(id));
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
                    {treeLinks.map((link) => (
                        <path
                            className={styles.link}
                            x={TREE_NODE / 2}
                            y={TREE_NODE / 2}
                            d={`M${link.source.x + offsetX} ${
                                link.source.y + props.margin
                            } ${link.target.x + offsetX} ${
                                link.target.y + props.margin
                            }`}
                        />
                    ))}
                    {treeNodes.map((node) => (
                        <g
                            key={node.data.id}
                            onClick={() => handleNodeClick(node.data.id)}
                        >
                            <circle
                                className={
                                    node.data.id === selectedNodeId
                                        ? styles.activeNode
                                        : styles.node
                                }
                                cx={node.x + offsetX}
                                cy={node.y + props.margin}
                            />
                            <text
                                className={styles.nodeText}
                                x={node.x + offsetX}
                                y={node.y + props.margin}
                                textAnchor="middle"
                                alignmentBaseline="central"
                            >
                                {node.data.value}
                            </text>
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
};

TreeGraphic.defaultProps = {
    margin: 75,
};

export default TreeGraphic;

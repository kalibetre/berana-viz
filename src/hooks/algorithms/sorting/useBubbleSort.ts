import { useCallback, useEffect } from 'react';
import { nodeSelected, nodesUpdated } from '../../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { Node, NodeStatus } from '../../../types';

const useBubbleSort = () => {
    let nodes: Node[] = useAppSelector(selectAllNodes);
    const dispatch = useAppDispatch();

    const resetNodeStatus = useCallback(() => {
        dispatch(nodeSelected(''));
        let updates = nodes.map((node) => {
            return { id: node.id, changes: { status: NodeStatus.NORMAL } };
        });
        dispatch(nodesUpdated(updates));
    }, [dispatch, nodes]);

    function* bubbleSort(): Generator<void> {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes.length - i; j++) {
                dispatch(nodeSelected(nodes[j].id));
                yield;
                if (nodes[j].value > nodes[j + 1].value) {
                    const temp = nodes[j].value;
                    const updates = [
                        {
                            id: nodes[j].id,
                            changes: { value: nodes[j + 1].value },
                        },
                        {
                            id: nodes[j + 1].id,
                            changes: { value: temp },
                        },
                    ];
                    dispatch(nodesUpdated(updates));
                    yield;
                }
            }
        }
    }

    useEffect(() => {
        resetNodeStatus();

        return () => {
            resetNodeStatus();
        };
    }, [resetNodeStatus]);

    return bubbleSort();
};

export default useBubbleSort;

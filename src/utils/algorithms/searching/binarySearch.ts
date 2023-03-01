import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node, NodeStatus } from '../../../types';

export default function* binarySearchIterator(
    nodes: Node[],
    value: number | null
): AlgoGenerator {
    if (value) {
        let left: number = 0,
            right: number = nodes.length - 1,
            mid: number;
        let updates: Update<Node>[] = [];

        while (left <= right) {
            mid = Math.round((left + right) / 2);

            if (nodes[mid].value < value) {
                for (let i = left; i <= mid; i++)
                    updates.push({
                        id: nodes[i].id,
                        changes: { status: NodeStatus.VISITED },
                    });
                left = mid + 1;
            } else if (nodes[mid].value > value) {
                for (let i = mid; i <= right; i++)
                    updates.push({
                        id: nodes[i].id,
                        changes: { status: NodeStatus.VISITED },
                    });
                right = mid - 1;
            }
            yield {
                selectedId: nodes[mid].id,
                updates,
                found: nodes[mid].value === value,
            };
        }
    }
}

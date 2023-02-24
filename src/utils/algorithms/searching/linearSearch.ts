import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node, NodeStatus } from '../../../types';

export default function* linearSearchIterator(
    nodes: Node[],
    value: number | null
): AlgoGenerator {
    if (value) {
        let updates: Update<Node>[] = [];
        for (let i = 0; i < nodes.length; i++) {
            updates.forEach(
                (update) => (update.changes = { status: NodeStatus.VISITED })
            );
            updates.push({
                id: nodes[i].id,
                changes: { status: NodeStatus.ACTIVE },
            });
            yield {
                selectedId: nodes[i].id,
                updates,
                found: nodes[i].value === value,
            };
        }
    }
}

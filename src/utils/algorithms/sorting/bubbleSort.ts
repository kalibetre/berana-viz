import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node } from '../../../types';

export default function* bubbleSortIterator(nodes: Node[]): AlgoGenerator {
    const values = nodes.map((node) => node.value);
    for (let i = 0; i < values.length; i++) {
        let updates: Update<Node>[] = [];
        for (let j = 0; j < values.length - i; j++) {
            yield { selectedId: nodes[j].id, updates };
            if (updates.length > 0) updates = [];

            if (values[j] > values[j + 1]) {
                updates = [
                    {
                        id: nodes[j].id,
                        changes: { value: values[j + 1] },
                    },
                    {
                        id: nodes[j + 1].id,
                        changes: { value: values[j] },
                    },
                ];
                [values[j], values[j + 1]] = [values[j + 1], values[j]];
            }
        }
    }
}

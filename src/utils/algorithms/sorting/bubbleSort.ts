import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node } from '../../../types';

export default function* bubbleSortIterator(nodes: Node[]): AlgoGenerator {
    const values = nodes.map((node) => node.value);
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length - i; j++) {
            let updates: Update<Node>[] = [];
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
            yield { selectedId: nodes[j].id, updates: updates };
        }
    }
}

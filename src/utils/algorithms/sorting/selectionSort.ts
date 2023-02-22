import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node } from '../../../types';

export default function* selectionSortIterator(nodes: Node[]): AlgoGenerator {
    const values = nodes.map((node) => node.value);
    let min_idx: number;

    if (values.length === 0) return;

    for (let i = 0; i < values.length; i++) {
        yield { selectedId: nodes[i].id, updates: [] };
        min_idx = i;
        for (let j = i + 1; j < values.length; j++) {
            if (values[min_idx] > values[j]) min_idx = j;
        }
        if (min_idx !== i) {
            let updates: Update<Node>[] = [
                {
                    id: nodes[min_idx].id,
                    changes: { value: values[i] },
                },
                {
                    id: nodes[i].id,
                    changes: { value: values[min_idx] },
                },
            ];
            [values[min_idx], values[i]] = [values[i], values[min_idx]];
            yield { selectedId: nodes[i].id, updates };
        }
    }
}

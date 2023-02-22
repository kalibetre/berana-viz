import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node } from '../../../types';

export default function* insertionSortIterator(nodes: Node[]): AlgoGenerator {
    const values = nodes.map((node) => node.value);
    let i = 1;
    while (i < values.length) {
        let j = i;
        yield { selectedId: nodes[i].id, updates: [] };
        while (j >= 0 && values[j - 1] > values[j]) {
            let updates: Update<Node>[] = [
                {
                    id: nodes[j].id,
                    changes: { value: values[j - 1] },
                },
                {
                    id: nodes[j - 1].id,
                    changes: { value: values[j] },
                },
            ];
            [values[j], values[j - 1]] = [values[j - 1], values[j]];
            yield { selectedId: nodes[j - 1].id, updates };
            j--;
        }
        i++;
    }
    yield { selectedId: '', updates: [] };
}

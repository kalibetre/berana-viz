import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node } from '../../../types';

function* mergeArray(
    nodes: Node[],
    values: number[],
    low: number,
    m: number,
    high: number
) {
    let cpyValues: number[] = [...values];
    let i: number = low,
        j: number = m + 1;
    let updates: Update<Node>[] = [];

    for (let k = low; k <= high; k++) {
        if (i <= m && (j > high || values[i] < values[j]))
            cpyValues[k] = values[i++];
        else cpyValues[k] = values[j++];

        updates = [
            {
                id: nodes[k].id,
                changes: { value: cpyValues[k] },
            },
        ];
    }

    cpyValues.forEach((value, i) => (values[i] = value));
    updates = cpyValues.map((value, idx) => {
        return {
            id: nodes[idx].id,
            changes: { value: value },
        };
    });
    yield { selectedId: nodes[m].id, updates: updates };
}

function* mergeSortIteratorRecursive(
    nodes: Node[],
    values: number[],
    low: number,
    high: number
): AlgoGenerator {
    if (high - low >= 1) {
        let m = Math.floor((low + high) / 2);

        yield* mergeSortIteratorRecursive(nodes, values, low, m);
        yield* mergeSortIteratorRecursive(nodes, values, m + 1, high);
        yield* mergeArray(nodes, values, low, m, high);
    }
}

export default function* mergeSortIterator(nodes: Node[]): AlgoGenerator {
    const values: number[] = nodes.map((node) => node.value);
    if (values.length > 0)
        yield* mergeSortIteratorRecursive(nodes, values, 0, values.length - 1);
}

import { Update } from '@reduxjs/toolkit';
import { AlgoGenerator, Node } from '../../../types';

function* sortWithPartition(
    nodes: Node[],
    values: number[],
    low: number,
    high: number
): AlgoGenerator {
    let pvt: number = high,
        i: number = low - 1;
    let updates: Update<Node>[] = [];

    for (let j = low; j < high; j++) {
        if (values[j] <= values[pvt]) {
            i++;
            updates = [
                {
                    id: nodes[i].id,
                    changes: { value: values[j] },
                },
                {
                    id: nodes[j].id,
                    changes: { value: values[i] },
                },
            ];
            [values[i], values[j]] = [values[j], values[i]];
        }
        yield { selectedId: nodes[j].id, updates };
    }

    updates = [
        {
            id: nodes[i + 1].id,
            changes: { value: values[pvt] },
        },
        {
            id: nodes[pvt].id,
            changes: { value: values[i + 1] },
        },
    ];
    [values[i + 1], values[pvt]] = [values[pvt], values[i + 1]];
    yield { selectedId: nodes[pvt].id, updates };
    return i + 1;
}

function* quickSortWithLomuto(
    nodes: Node[],
    values: number[],
    low: number,
    high: number
): AlgoGenerator {
    let pvt: number;
    if (low < high) {
        pvt = yield* sortWithPartition(nodes, values, low, high);
        console.log(pvt);
        yield* quickSortWithLomuto(nodes, values, low, pvt - 1);
        yield* quickSortWithLomuto(nodes, values, pvt + 1, high);
    }
}

export default function* quickSortIterator(nodes: Node[]): AlgoGenerator {
    const values = nodes.map((node) => node.value);
    if (values.length > 0)
        yield* quickSortWithLomuto(nodes, values, 0, values.length - 1);
}

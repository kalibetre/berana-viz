import { AlgoGenerator, Node, SortingAlgo } from '../../types';
import bubbleSortIterator from './sorting/bubbleSort';
import insertionSortIterator from './sorting/insertionSort';

const SORTING_ITERATORS = new Map<
    SortingAlgo,
    (nodes: Node[]) => AlgoGenerator
>([
    [SortingAlgo.BUBBLE, (nodes) => bubbleSortIterator(nodes)],
    [SortingAlgo.INSERTION, (nodes) => insertionSortIterator(nodes)],
]);

export default SORTING_ITERATORS;

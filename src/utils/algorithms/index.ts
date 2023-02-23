import { AlgoGenerator, Node, SearchAlgo, SortingAlgo } from '../../types';
import linearSearchIterator from './searching/linearSearch';
import bubbleSortIterator from './sorting/bubbleSort';
import insertionSortIterator from './sorting/insertionSort';
import mergeSortIterator from './sorting/mergeSort';
import quickSortIterator from './sorting/quickSort';
import selectionSortIterator from './sorting/selectionSort';

export const SORTING_ITERATORS = new Map<
    SortingAlgo,
    (nodes: Node[]) => AlgoGenerator
>([
    [SortingAlgo.BUBBLE, (nodes) => bubbleSortIterator(nodes)],
    [SortingAlgo.INSERTION, (nodes) => insertionSortIterator(nodes)],
    [SortingAlgo.SELECTION, (nodes) => selectionSortIterator(nodes)],
    [SortingAlgo.QUICK, (nodes) => quickSortIterator(nodes)],
    [SortingAlgo.MERGE, (nodes) => mergeSortIterator(nodes)],
]);

export const SEARCH_ITERATORS = new Map<
    SearchAlgo,
    (nodes: Node[], value: number | null) => AlgoGenerator
>([[SearchAlgo.LINEAR, (nodes, value) => linearSearchIterator(nodes, value)]]);

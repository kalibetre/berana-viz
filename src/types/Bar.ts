import { Node, Size } from '.';

interface Bar extends Size, Node {
    x: number;
    y: number;
    color: any;
}

export default Bar;

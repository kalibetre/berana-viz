import { NodeBase, Size } from '.';

interface Bar extends Size, NodeBase {
    x: number;
    y: number;
    color: any;
}

export default Bar;

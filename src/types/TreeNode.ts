import { Node } from '.';

interface TreeNode extends Node {
    children: TreeNode[];
}

export default TreeNode;

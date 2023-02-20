import { Node } from '.';

interface TreeNode extends Node {
    parent: TreeNode | null;
    children: TreeNode[];
}

export default TreeNode;

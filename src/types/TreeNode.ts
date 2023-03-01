import { NodeBase } from '.';

interface TreeNode extends NodeBase {
    children: TreeNode[];
}

export default TreeNode;

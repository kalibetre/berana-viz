import { Node, NodeStatus, TreeNode } from '../types';

export const convertToTree = (
    array: Node[],
    i: number = 0
): TreeNode | null => {
    if (array.length === 0 || i >= array.length) return null;

    const node: TreeNode = {
        id: array[i].id,
        value: array[i].value,
        status: NodeStatus.NORMAL,
        children: [],
    };

    const leftNode = convertToTree(array, 2 * i + 1);
    if (leftNode) node.children[0] = leftNode;

    const rightNode = leftNode ? convertToTree(array, 2 * i + 2) : null;
    if (rightNode) node.children[1] = rightNode;

    return node;
};

export enum NodeStatus {
    NORMAL,
    VISITED,
    ACTIVE,
}

export interface NodeBase {
    id: string;
    value: number;
    status: NodeStatus;
}

interface Node extends NodeBase {
    time: number;
}

export default Node;

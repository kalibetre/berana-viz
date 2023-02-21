export enum NodeStatus {
    NORMAL,
    VISITED,
    ACTIVE,
}

interface Node {
    id: string;
    value: number;
    status: NodeStatus;
}

export default Node;

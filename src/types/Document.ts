interface DocumentContent {
    nodes: number[];
}

interface Document {
    uid?: string;
    title: string;
    description: string;
    modified?: string;
    created?: string;
    content: DocumentContent;
}

export default Document;

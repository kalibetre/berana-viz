import uuid from 'react-uuid';
import { DocumentItem, SideBar, ToolBox, ToolBoxGroup } from '..';
import useAuth from '../../hooks/useAuth';
import {
    useGetDocumentsQuery,
    useSaveDocumentMutation,
} from '../../services/beranavizApi';
import { documentSelected } from '../../store/slices/documentSlice';
import { nodesLoaded } from '../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../store/store';
import { Document, Node, NodeStatus } from '../../types';
import DocumentActions from './DocumentActions/DocumentActions';
import styles from './DocumentsSideBar.module.css';
import NodeActions from './NodeActions/NodeActions';

const DocumentsSideBar = () => {
    const { checkingUser, user } = useAuth();
    const { selectedDocument, isSample } = useAppSelector(
        (state) => state.document
    );
    const dispatch = useAppDispatch();
    const [saveDocument, saveDocStatus] = useSaveDocumentMutation();
    const nodes: Node[] = useAppSelector(selectAllNodes);

    const {
        data: documents,
        isError,
        isLoading,
    } = useGetDocumentsQuery({
        skip: user === null,
    });

    const handelSelectionChanged = (doc: Document) => {
        if (isDirty()) save();
        handelDocumentSelection(doc);
    };

    const getNodesFromDocument = (doc: Document) => {
        const nodes: Node[] = doc.content.nodes.map((node) => ({
            id: uuid(),
            value: node,
            status: NodeStatus.NORMAL,
            time: new Date().getTime(),
        }));
        return nodes;
    };

    const handelDocumentSelection = (doc: Document) => {
        dispatch(documentSelected(doc));
        dispatchNodes(doc);
    };

    const dispatchNodes = (doc: Document) => {
        const nodes = getNodesFromDocument(doc);
        dispatch(nodesLoaded(nodes));
    };

    const save = async () => {
        const nodeValues = nodes.map((node) => node.value);
        await saveDocument({
            uid: selectedDocument?.uid ?? '',
            content: { nodes: nodeValues },
        });
    };

    const isDirty = () => {
        const nodeValues = nodes.map((node) => node.value).join('');
        return selectedDocument?.content.nodes.join('') !== nodeValues;
    };

    if (nodes.length === 0 && isSample && selectedDocument) {
        dispatchNodes(selectedDocument);
    } else if (documents && documents.length > 0 && isSample)
        handelDocumentSelection(documents[0]);

    return (
        <SideBar width="300px" height="100%" title="Documents">
            <NodeActions />
            <DocumentActions />
            <ToolBox title="Documents">
                {checkingUser || user === null ? (
                    <span className={styles.loginMessage}>
                        Login to see your documents here..
                    </span>
                ) : isLoading ? (
                    <span className={styles.loginMessage}>
                        Loading your documents ...
                    </span>
                ) : isError ? (
                    <span className={styles.loginMessage}>
                        Error fetching your documents ...
                    </span>
                ) : (
                    <ToolBoxGroup title="My Documents" striped>
                        {documents &&
                            (documents as Document[]).map((doc) => (
                                <DocumentItem
                                    key={doc.uid}
                                    document={doc}
                                    isSelected={
                                        selectedDocument?.uid === doc.uid
                                    }
                                    onClick={() => handelSelectionChanged(doc)}
                                />
                            ))}
                    </ToolBoxGroup>
                )}
            </ToolBox>
        </SideBar>
    );
};

export default DocumentsSideBar;

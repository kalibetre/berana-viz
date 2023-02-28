import { ButtonItem, ToolBox, ToolBoxGroup } from '../..';
import useAuth from '../../../hooks/useAuth';
import {
    DeleteFileIcon,
    LoadingIcon,
    NewFileIcon,
    SaveFileIcon,
} from '../../../icons';
import {
    useCreateDocumentMutation,
    useDeleteDocumentMutation,
    useGetDocumentsQuery,
    useSaveDocumentMutation,
} from '../../../services/beranavizApi';
import styles from './DocumentActions.module.css';

import { documentSelected } from '../../../store/slices/documentSlice';
import { nodesLoaded } from '../../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { Document, Node } from '../../../types';

const DocumentActions = () => {
    const { checkingUser, user } = useAuth();
    const [createDocument, newDocStatus] = useCreateDocumentMutation();
    const [saveDocument, saveDocStatus] = useSaveDocumentMutation();
    const [deleteDocument, delDocStatus] = useDeleteDocumentMutation();
    const dispatch = useAppDispatch();

    const { selectedDocument, isSample } = useAppSelector(
        (state) => state.document
    );
    const { data: documents } = useGetDocumentsQuery({
        skip: user === null,
    });

    const nodes: Node[] = useAppSelector(selectAllNodes);

    const handleNew = async () => {
        const nodeValues = nodes.map((node) => node.value);
        const doc: Document = {
            title: 'my first doc',
            description: '',
            content: { nodes: nodeValues },
        };
        await createDocument(doc);
        dispatch(documentSelected(documents[0]));
    };

    const handleSave = async () => {
        if (isSample) handleNew();
        const nodeValues = nodes.map((node) => node.value);
        await saveDocument({
            uid: selectedDocument.uid ?? '',
            content: { nodes: nodeValues },
        });
    };

    const handleDelete = async () => {
        await deleteDocument(selectedDocument.uid ?? '');
        console.log(documents);
        if (documents.length > 0 && documents[0].uid !== selectedDocument.uid)
            dispatch(documentSelected(documents[0]));
        else dispatch(nodesLoaded([]));
    };

    return (
        <ToolBox title="Document Actions">
            <ToolBoxGroup title="">
                {(newDocStatus.isError ||
                    saveDocStatus.isError ||
                    delDocStatus.isError) && (
                    <div className={styles.error}>
                        Error occurred. Please try again.
                    </div>
                )}
                <div className={styles.options}>
                    <ButtonItem
                        disabled={
                            checkingUser ||
                            user === null ||
                            newDocStatus.isLoading
                        }
                        onClick={handleNew}
                    >
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        New
                        {newDocStatus.isLoading && (
                            <span className={styles.loading}>
                                <LoadingIcon />
                            </span>
                        )}
                    </ButtonItem>
                    <ButtonItem
                        disabled={checkingUser || user === null}
                        onClick={handleSave}
                    >
                        <span className={styles.icon}>
                            <SaveFileIcon />
                        </span>
                        Save
                        {saveDocStatus.isLoading && (
                            <span className={styles.loading}>
                                <LoadingIcon />
                            </span>
                        )}
                    </ButtonItem>
                    <ButtonItem
                        disabled={checkingUser || user === null}
                        onClick={handleDelete}
                    >
                        <span className={styles.icon}>
                            <DeleteFileIcon />
                        </span>
                        Delete
                        {delDocStatus.isLoading && (
                            <span className={styles.loading}>
                                <LoadingIcon />
                            </span>
                        )}
                    </ButtonItem>
                </div>
            </ToolBoxGroup>
        </ToolBox>
    );
};

export default DocumentActions;

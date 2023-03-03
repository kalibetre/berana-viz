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
    useSaveDocumentMutation,
} from '../../../services/beranavizApi';
import styles from './DocumentActions.module.css';

import { useContext } from 'react';
import uuid from 'react-uuid';
import { documentSelected } from '../../../store/slices/documentSlice';
import { nodesLoaded } from '../../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { Document, Modal, Node } from '../../../types';
import { AlertModal, AlertType } from '../../Modals';
import AddDocumentModal from '../../Modals/AddDocumentModal';
import { ModalContext } from '../../Providers';

const DocumentActions = () => {
    const { checkingUser, user } = useAuth();
    const [createDocument, newDocStatus] = useCreateDocumentMutation();
    const [saveDocument, saveDocStatus] = useSaveDocumentMutation();
    const [deleteDocument, delDocStatus] = useDeleteDocumentMutation();
    const dispatch = useAppDispatch();
    const { showModal, hideModal } = useContext(ModalContext);

    const { selectedDocument, isSample } = useAppSelector(
        (state) => state.document
    );
    const nodes: Node[] = useAppSelector(selectAllNodes);

    const addNewDocument = async (
        title: string,
        description: string,
        nodeValues?: number[]
    ) => {
        const doc: Document = {
            title,
            description,
            content: { nodes: nodeValues ? [...nodeValues] : [] },
        };
        const result = await createDocument(doc);
        if (newDocStatus) {
            const { data }: any = result;
            dispatch(documentSelected(data as Document));
        }
    };

    const handleNew = (nodeValues?: number[]) => {
        const id = uuid();
        const addDocModal: Modal = {
            id: id,
            tag: 'ADD_NEW_DOC',
            component: (
                <AddDocumentModal
                    onClose={() => hideModal(id)}
                    onConfirm={(title, description) =>
                        addNewDocument(title, description, nodeValues)
                    }
                    key={id}
                />
            ),
        };
        showModal(addDocModal);
    };

    const handleSave = async () => {
        const nodeValues = nodes.map((node) => node.value);
        if (isSample) handleNew(nodeValues);
        else
            await saveDocument({
                uid: selectedDocument?.uid ?? '',
                content: { nodes: nodeValues },
            });
    };

    const performDelete = async () => {
        await deleteDocument(selectedDocument?.uid ?? '');
        dispatch(documentSelected(null));
        dispatch(nodesLoaded([]));
    };

    const handleDelete = () => {
        const id = uuid();
        const alertModal: Modal = {
            id: id,
            tag: 'ALERT_MODAL',
            component: (
                <AlertModal
                    type={AlertType.CONFIRMATION}
                    title="Delete Document"
                    confirmButtonLabel="Yes"
                    cancelButtonLabel="Cancel"
                    message="Are you sure you want to delete this document?"
                    onClose={() => hideModal(id)}
                    onConfirm={() => {
                        performDelete();
                        hideModal(id);
                    }}
                    key={id}
                />
            ),
        };
        showModal(alertModal);
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
                        onClick={() => handleNew()}
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
                        disabled={
                            checkingUser ||
                            user === null ||
                            selectedDocument === null
                        }
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
                        disabled={
                            checkingUser ||
                            user === null ||
                            selectedDocument === null
                        }
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

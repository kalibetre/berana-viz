import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { ToolBox } from '../..';
import { GenerateIcon, NewFileIcon, ShuffleIcon } from '../../../icons';
import DeleteAllIcon from '../../../icons/DeleteAllIcon';
import { nodeDeleteAll, nodesUpdated } from '../../../store/slices/nodesSlice';
import {
    AppDispatch,
    RootState,
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { Modal, Node } from '../../../types';
import {
    AddNodeModal,
    AlertModal,
    AlertType,
    EditNodeModal,
    GenerateModal,
} from '../../Modals';
import { ModalContext } from '../../Providers';
import ButtonItem from '../../ToolBox/ButtonItem/ButtonItem';
import ToolBoxGroup from '../../ToolBox/ToolBoxGroup/ToolBoxGroup';
import styles from './NodeActions.module.css';

const NodeActions = () => {
    let nodes: Node[] = useAppSelector(selectAllNodes);
    const animRunning = useAppSelector((state) => state.canvas.animRunning);
    const dispatch: AppDispatch = useAppDispatch();

    const { showModal, hideModal } = useContext(ModalContext);
    const [addBtnDisabled, setAddBtnDisabled] = useState(false);
    const [editBtnDisabled, setEditBtnDisabled] = useState(false);

    const selectedNodeId = useSelector<RootState>(
        (state) => state.nodes.selectedId
    );

    const handleAddNode = () => {
        const id = uuid();
        const addNodeModal: Modal = {
            id: id,
            tag: 'ADD_NEW_NODE',
            component: (
                <AddNodeModal
                    onClose={() => {
                        hideModal(id);
                        setAddBtnDisabled(false);
                    }}
                />
            ),
        };
        showModal(addNodeModal);
        setAddBtnDisabled(true);
    };

    const handleEditNode = () => {
        const id = uuid();
        const editNodeModal: Modal = {
            id: id,
            tag: 'EDIT_NODE',
            component: (
                <EditNodeModal
                    onClose={() => {
                        hideModal(id);
                        setEditBtnDisabled(false);
                    }}
                />
            ),
        };
        showModal(editNodeModal);
        setEditBtnDisabled(true);
    };

    const handleShuffle = () => {
        const values: number[] = nodes
            .map((node) => node.value)
            .sort(() => Math.random() - 0.5);

        const updates = [];
        for (let i = 0; i < values.length; i++) {
            updates.push({
                id: nodes[i].id,
                changes: { value: values[i] },
            });
        }
        dispatch(nodesUpdated(updates));
    };

    const handleGenerate = () => {
        const id = uuid();
        const genNodeModal: Modal = {
            id: id,
            tag: 'ADD_NEW_NODE',
            component: (
                <GenerateModal
                    onClose={() => {
                        hideModal(id);
                        setAddBtnDisabled(false);
                    }}
                />
            ),
        };
        showModal(genNodeModal);
        setAddBtnDisabled(true);
    };

    const handleDeleteAll = () => {
        const id = uuid();
        const alertModal: Modal = {
            id: id,
            tag: 'ALERT_MODAL',
            component: (
                <AlertModal
                    type={AlertType.CONFIRMATION}
                    title="Delete All"
                    confirmButtonLabel="Yes"
                    cancelButtonLabel="Cancel"
                    message="Are you sure you want to delete all data?"
                    onClose={() => hideModal(id)}
                    onConfirm={() => {
                        deleteAllData();
                        hideModal(id);
                    }}
                />
            ),
        };
        showModal(alertModal);
    };

    const deleteAllData = () => {
        dispatch(nodeDeleteAll());
    };

    return (
        <ToolBox title="Node Actions">
            <ToolBoxGroup title="">
                <div className={styles.options}>
                    <ButtonItem
                        disabled={addBtnDisabled || animRunning}
                        onClick={handleAddNode}
                    >
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        Add Nodes
                    </ButtonItem>
                    <ButtonItem
                        disabled={
                            selectedNodeId === '' ||
                            editBtnDisabled ||
                            animRunning
                        }
                        onClick={handleEditNode}
                    >
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        Edit Nodes
                    </ButtonItem>
                    <ButtonItem onClick={handleShuffle} disabled={animRunning}>
                        <span className={styles.icon}>
                            <ShuffleIcon />
                        </span>
                        Shuffle
                    </ButtonItem>
                    <ButtonItem onClick={handleGenerate} disabled={animRunning}>
                        <span className={styles.icon}>
                            <GenerateIcon />
                        </span>
                        Generate
                    </ButtonItem>
                    <ButtonItem
                        onClick={handleDeleteAll}
                        disabled={animRunning}
                    >
                        <span className={styles.icon}>
                            <DeleteAllIcon />
                        </span>
                        Delete All
                    </ButtonItem>
                </div>
            </ToolBoxGroup>
        </ToolBox>
    );
};

export default NodeActions;

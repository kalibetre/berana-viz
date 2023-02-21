import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { AddNodeModal, ToolBox } from '../..';
import { NewFileIcon, ShuffleIcon } from '../../../icons';
import { nodesUpdated } from '../../../store/slices/nodesSlice';
import {
    AppDispatch,
    RootState,
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { Modal, Node } from '../../../types';
import { ModalContext } from '../../Providers';
import ButtonItem from '../../ToolBox/ButtonItem/ButtonItem';
import ToolBoxGroup from '../../ToolBox/ToolBoxGroup/ToolBoxGroup';
import EditNodeModal from '../../Visualization/Modals/EditNodeModal';
import styles from './NodeActions.module.css';

const NodeActions = () => {
    let nodes: Node[] = useAppSelector(selectAllNodes);
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

    return (
        <ToolBox title="Node Actions">
            <ToolBoxGroup title="">
                <div className={styles.options}>
                    <ButtonItem
                        disabled={addBtnDisabled}
                        onClick={handleAddNode}
                    >
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        Add Nodes
                    </ButtonItem>
                    <ButtonItem
                        disabled={selectedNodeId === '' || editBtnDisabled}
                        onClick={handleEditNode}
                    >
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        Edit Nodes
                    </ButtonItem>
                    <ButtonItem onClick={handleShuffle}>
                        <span className={styles.icon}>
                            <ShuffleIcon />
                        </span>
                        Shuffle
                    </ButtonItem>
                </div>
            </ToolBoxGroup>
        </ToolBox>
    );
};

export default NodeActions;

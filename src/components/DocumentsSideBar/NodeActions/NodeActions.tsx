import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { AddNodeModal, ToolBox } from '../..';
import { NewFileIcon } from '../../../icons';
import { RootState } from '../../../store/store';
import { Modal } from '../../../types';
import { ModalContext } from '../../Providers';
import ButtonItem from '../../ToolBox/ButtonItem/ButtonItem';
import ToolBoxGroup from '../../ToolBox/ToolBoxGroup/ToolBoxGroup';
import EditNodeModal from '../../Visualization/Modals/EditNodeModal';
import styles from './NodeActions.module.css';

const NodeActions = () => {
    const { showModal, hideModal } = useContext(ModalContext);
    const [addBtnDisabled, setAddBtnDisabled] = useState(false);
    const [editBtnDisabled, setEditBtnDisabled] = useState(false);

    const selectedNodeId = useSelector<RootState>(
        (state) => state.nodes.selectedId
    );

    const handleAddNode = () => {
        const id = uuid();
        const addNodeModal: Modal = {
            id: uuid(),
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
                </div>
            </ToolBoxGroup>
        </ToolBox>
    );
};

export default NodeActions;

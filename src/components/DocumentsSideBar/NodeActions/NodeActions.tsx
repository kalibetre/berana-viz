import { useContext, useState } from 'react';
import uuid from 'react-uuid';
import { AddNodeModal, ToolBox } from '../..';
import { NewFileIcon } from '../../../icons';
import { Modal } from '../../../types';
import { ModalContext } from '../../Providers';
import ButtonItem from '../../ToolBox/ButtonItem/ButtonItem';
import ToolBoxGroup from '../../ToolBox/ToolBoxGroup/ToolBoxGroup';
import styles from './NodeActions.module.css';

const NodeActions = () => {
    const { showModal, hideModal } = useContext(ModalContext);
    const [addBtnDisabled, setAddBtnDisabled] = useState(false);

    const handleShowModal = () => {
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

    return (
        <ToolBox title="Node Actions">
            <ToolBoxGroup title="">
                <div className={styles.options}>
                    <ButtonItem
                        disabled={addBtnDisabled}
                        onClick={handleShowModal}
                    >
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        Add Nodes
                    </ButtonItem>
                    <ButtonItem onClick={() => {}}>
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

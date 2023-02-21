import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    nodeDeleted,
    nodeSelected,
    nodeUpdated,
} from '../../../store/slices/nodesSlice';
import {
    AppDispatch,
    RootState,
    selectNodeById,
    useAppSelector,
} from '../../../store/store';
import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

interface EditArrayModalProps {
    onClose?: () => void;
}

interface EditArrayModalInput {
    value: number;
}

const EditNodeModal = (props: EditArrayModalProps) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const selectedNodeId: string = useSelector(
        (state: RootState) => state.nodes.selectedId
    );
    const selectedNode = useAppSelector((state: RootState) =>
        selectNodeById(state, selectedNodeId)
    );
    const valueRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EditArrayModalInput>();

    const { ref, ...rest } = register('value', {
        required: 'Value Required',
        max: {
            value: 999,
            message: 'Value Should be less 999',
        },
        min: {
            value: 0,
            message: 'Value Should be greater than 0',
        },
    });

    const onSubmit = (data: any) => {
        dispatch(
            nodeUpdated({ id: selectedNodeId, changes: { value: data.value } })
        );
        dispatch(nodeSelected(''));
        if (valueRef && valueRef.current) valueRef.current.value = '';
    };

    useEffect(() => {
        if (selectedNode) reset({ value: selectedNode.value });
    }, [selectedNode, reset]);

    const handleDelete = () => {
        dispatch(nodeDeleted(selectedNodeId));
        dispatch(nodeSelected(''));
        if (valueRef && valueRef.current) valueRef.current.value = '';
    };

    return (
        <Modal title="Edit Node" onClose={props.onClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={modalStyles.form}
            >
                <div className={modalStyles.inputGroup}>
                    <div className={modalStyles.inputRow}>
                        <label htmlFor="value">Value</label>
                        <input
                            id="value"
                            type="number"
                            className={modalStyles.input}
                            {...rest}
                            ref={(e) => {
                                ref(e);
                                valueRef.current = e;
                            }}
                        />
                    </div>
                    <p className={modalStyles.error}>{errors.value?.message}</p>
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Delete"
                        onClick={handleDelete}
                        disabled={selectedNodeId === ''}
                    />
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Update"
                        disabled={selectedNodeId === ''}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default EditNodeModal;

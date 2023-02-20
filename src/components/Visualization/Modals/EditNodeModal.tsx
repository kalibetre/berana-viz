import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    nodeDeleted,
    nodeSelected,
    nodeUpdated,
} from '../../../store/slices/nodesSlice';
import { AppDispatch, nodesSelectors, RootState } from '../../../store/store';
import Modal from '../../Modal/Modal';
import styles from './AddNodeModal.module.css';

interface EditArrayModalProps {
    onClose?: () => void;
}

interface EditArrayModalInput {
    value: number;
}

const EditNodeModal = (props: EditArrayModalProps) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const selectedNodeId: string = useSelector(
        (state: RootState) => state.array.selectedId
    );
    const selectedNode = useSelector((state: RootState) =>
        nodesSelectors.selectById(state, selectedNodeId)
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
        <Modal
            title="Edit Array"
            onClose={props.onClose}
            width={250}
            height={180}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.inputGroup}>
                    <div className={styles.inputRow}>
                        <label htmlFor="value">Value</label>
                        <input
                            id="value"
                            type="number"
                            className={styles.input}
                            {...rest}
                            ref={(e) => {
                                ref(e);
                                valueRef.current = e;
                            }}
                        />
                    </div>
                    <p className={styles.error}>{errors.value?.message}</p>
                </div>
                <div className={styles.btnContainer}>
                    <input
                        className={styles.btn}
                        type="button"
                        value="Delete"
                        onClick={handleDelete}
                        disabled={selectedNodeId === ''}
                    />
                    <input
                        className={styles.btn}
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

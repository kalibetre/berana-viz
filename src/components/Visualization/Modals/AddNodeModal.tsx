import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { nodeAdded } from '../../../store/slices/arraySlice';
import { AppDispatch } from '../../../store/store';
import { Node } from '../../../types';
import Modal from '../../Modal/Modal';
import styles from './AddNodeModal.module.css';

interface EditArrayModalProps {
    onClose?: () => void;
}

interface EditArrayModalInput {
    value: number;
}

const AddNodeModal = (props: EditArrayModalProps) => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditArrayModalInput>();

    const onSubmit = (data: any) => {
        const node: Node = { id: uuid(), value: data.value };
        dispatch(nodeAdded(node));
    };

    const handleOnRandom = () => {
        setValue('value', Math.floor(Math.random() * 1000));
    };

    return (
        <Modal
            title="Add Array Values"
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
                            {...register('value', {
                                required: 'Value Required',
                                max: {
                                    value: 999,
                                    message: 'Value Should be less 999',
                                },
                                min: {
                                    value: 0,
                                    message: 'Value Should be greater than 0',
                                },
                            })}
                        />
                    </div>
                    <p className={styles.error}>{errors.value?.message}</p>
                </div>
                <div className={styles.btnContainer}>
                    <input
                        className={styles.btn}
                        type="button"
                        value="Random"
                        onClick={handleOnRandom}
                    />
                    <input
                        className={styles.btn}
                        type="submit"
                        value="Add Value"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddNodeModal;

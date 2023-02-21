import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { nodeAdded } from '../../../store/slices/nodesSlice';
import { AppDispatch } from '../../../store/store';
import { Node, NodeStatus } from '../../../types';
import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

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
        const node: Node = {
            id: uuid(),
            value: data.value,
            status: NodeStatus.NORMAL,
            time: new Date().getTime(),
        };
        dispatch(nodeAdded(node));
    };

    const handleOnRandom = () => {
        setValue('value', Math.floor(Math.random() * 1000));
    };

    return (
        <Modal title="Add Node" onClose={props.onClose}>
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
                    <p className={modalStyles.error}>{errors.value?.message}</p>
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Random"
                        onClick={handleOnRandom}
                    />
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Add Value"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddNodeModal;

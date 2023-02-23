import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';
import { nodeAdded } from '../../../store/slices/nodesSlice';
import { useAppDispatch } from '../../../store/store';
import { Node, NodeStatus } from '../../../types';
import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

interface GenerateModalProps {
    onClose?: () => void;
}

interface GenerateModalInput {
    count: number;
}

const GenerateModal = (props: GenerateModalProps) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GenerateModalInput>({
        defaultValues: {
            count: 20,
        },
    });

    const onSubmit = (data: any) => {
        for (let i = 0; i < parseInt(data.count); i++) {
            const node: Node = {
                id: uuid(),
                value: Math.round(Math.random() * 1000),
                status: NodeStatus.NORMAL,
                time: new Date().getTime(),
            };
            dispatch(nodeAdded(node));
        }
    };

    return (
        <Modal title="Generate Nodes" onClose={props.onClose}>
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
                            {...register('count', {
                                required: 'Count is required',
                                max: {
                                    value: 100,
                                    message: 'Count Should be less 100',
                                },
                                min: {
                                    value: 0,
                                    message: 'Count Should be greater than 0',
                                },
                            })}
                        />
                    </div>
                    <p className={modalStyles.error}>{errors.count?.message}</p>
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Cancel"
                        onClick={props.onClose}
                    />
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Generate"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default GenerateModal;

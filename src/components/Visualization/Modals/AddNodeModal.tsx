import { useForm } from 'react-hook-form';
import Modal from '../../Modal/Modal';
import styles from './AddNodeModal.module.css';

interface EditArrayModalProps {
    onClose?: () => void;
}

interface EditArrayModalInput {
    value: number;
}

const AddNodeModal = (props: EditArrayModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditArrayModalInput>();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Modal title="Array" onClose={props.onClose} width={250} height={180}>
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
                            })}
                        />
                    </div>
                    <p className={styles.error}>{errors.value?.message}</p>
                </div>
                <div className={styles.btnContainer}>
                    <input
                        className={styles.btn}
                        type="submit"
                        value="Add Node"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddNodeModal;

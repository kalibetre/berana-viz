import { useForm } from 'react-hook-form';
import { useBubbleSort } from '../../../hooks';
import { SortingAlgo } from '../../../types';
import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

interface SortingModalProps {
    onClose?: () => void;
    algo: SortingAlgo;
}

interface SortingModalInput {
    algo: SortingAlgo;
    animTime: number;
}

const SortingModal = (props: SortingModalProps) => {
    const iterator: Generator<void> = useBubbleSort();
    const { register, handleSubmit } = useForm<SortingModalInput>({
        defaultValues: {
            algo: props.algo,
            animTime: 200,
        },
    });

    const onSubmit = (data: any) => {
        console.log('Auto');
    };

    const onStep = (e: React.MouseEvent) => {
        e.preventDefault();
        if (iterator) {
            let crtFrame = iterator.next();
            if (crtFrame.done) return;
        }
    };

    return (
        <Modal title="Sorting" onClose={props.onClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={modalStyles.form}
            >
                <div className={modalStyles.inputGroup}>
                    <div className={modalStyles.inputRow}>
                        <label htmlFor="value">Algorithm</label>
                        <input
                            disabled
                            className={modalStyles.input}
                            {...register('algo', {
                                required: 'Algo Type Required',
                            })}
                        />
                    </div>
                    <div className={modalStyles.inputRow}>
                        <label htmlFor="value">Anim. Speed</label>
                        <select
                            className={modalStyles.input}
                            {...register('animTime')}
                        >
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                            <option value={400}>400</option>
                        </select>
                    </div>
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Auto"
                    />
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Step"
                        onClick={onStep}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default SortingModal;

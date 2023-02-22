import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { nodeSelected, nodesUpdated } from '../../../store/slices/nodesSlice';
import { useAppDispatch } from '../../../store/store';
import { AlgoGenerator, SortingAlgo } from '../../../types';
import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

interface SortingModalProps {
    onClose?: () => void;
    algo: SortingAlgo;
    iterator: AlgoGenerator | null;
}

interface SortingModalInput {
    algo: SortingAlgo;
    animTime: number;
}

const SortingModal = (props: SortingModalProps) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<SortingModalInput>({
        defaultValues: {
            algo: props.algo,
            animTime: 50,
        },
    });
    const [animFinished, setAnimFinished] = useState(false);

    const animDelay = (delay: number) =>
        new Promise((resolve) => setTimeout(resolve, delay));

    const onSubmit = async (data: any) => {
        if (props.iterator) {
            let result = props.iterator.next();
            while (!result.done) {
                if (result.value.updates.length > 0)
                    dispatch(nodesUpdated(result.value.updates));
                dispatch(nodeSelected(result.value.selectedId));
                result = props.iterator.next();
                await animDelay(data.animTime);
            }
            setAnimFinished(true);
        }
    };

    const onStep = (e: React.MouseEvent) => {
        e.preventDefault();
        if (props.iterator) {
            let result = props.iterator.next();
            if (result.done) {
                setAnimFinished(true);
                return;
            }

            if (result.value.updates.length > 0)
                dispatch(nodesUpdated(result.value.updates));
            dispatch(nodeSelected(result.value.selectedId));
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
                        <input
                            type="number"
                            className={modalStyles.input}
                            min={0}
                            max={1000}
                            {...register('animTime')}
                        />
                    </div>
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Auto"
                        disabled={animFinished}
                    />
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Step"
                        onClick={onStep}
                        disabled={animFinished}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default SortingModal;

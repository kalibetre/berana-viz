import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { nodeSelected, nodesUpdated } from '../../store/slices/nodesSlice';
import { useAppDispatch } from '../../store/store';
import { AlgoGenerator, SortingAlgo } from '../../types';
import Modal from './Modal';
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
    const animRunning = useRef<boolean>(false);
    const [disableClose, setDisableClose] = useState(false);

    const onSubmit = async (data: any) => {
        setDisableClose(true);
        animRunning.current = true;
        startAnimation(data.animTime);
    };

    const startAnimation = (delay: number) => {
        function playAnimation() {
            runStep();
            if (animRunning.current)
                setTimeout(() => requestAnimationFrame(playAnimation), delay);
        }
        requestAnimationFrame(playAnimation);
    };

    const stopAnimation = () => {
        animRunning.current = false;
        setDisableClose(false);
    };

    const onStep = (e: React.MouseEvent) => {
        e.preventDefault();
        runStep();
    };

    const runStep = () => {
        if (props.iterator) {
            let result = props.iterator.next();
            if (result.done) {
                stopAnimation();
            } else if (result.value) {
                if (result.value.updates.length > 0)
                    dispatch(nodesUpdated(result.value.updates));
                dispatch(nodeSelected(result.value.selectedId));
            }
        }
    };

    return (
        <Modal title="Sorting" onClose={props.onClose} stayOpen={disableClose}>
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
                        <label htmlFor="value">Speed(ms)</label>
                        <input
                            type="number"
                            className={modalStyles.input}
                            min={0}
                            max={999}
                            {...register('animTime', {
                                required: 'Speed Required',
                            })}
                        />
                    </div>
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Auto"
                        disabled={animRunning.current}
                    />
                    <div className={modalStyles.hrSpacer} />
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Pause"
                        onClick={stopAnimation}
                        disabled={!animRunning.current}
                    />
                    <div className={modalStyles.hrSpacer} />
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Step"
                        onClick={onStep}
                        disabled={animRunning.current}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default SortingModal;

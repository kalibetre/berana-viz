import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ResetIcon } from '../../../icons';
import { nodeSelected, nodesUpdated } from '../../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import { AlgoGenerator, Node, NodeStatus, SearchAlgo } from '../../../types';
import { SEARCH_ITERATORS } from '../../../utils/algorithms';
import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

interface SearchingModalProps {
    onClose?: () => void;
    algo: SearchAlgo;
}

interface SearchingModalInput {
    algo: SearchAlgo;
    value: number;
    animTime: number;
}

const SearchingModal = (props: SearchingModalProps) => {
    const nodes: Node[] = useAppSelector(selectAllNodes);

    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<SearchingModalInput>({
        defaultValues: {
            algo: props.algo,
            animTime: 50,
        },
    });
    const [animRunning, setAnimRunning] = useState(false);
    const [valueFound, setValueFound] = useState<boolean | null>(null);
    const valueRef = useRef<HTMLInputElement | null>(null);

    const [iterator, setIterator] = useState<AlgoGenerator>();

    const animDelay = (delay: number) =>
        new Promise((resolve) => setTimeout(resolve, delay));

    const onSubmit = async (data: any) => {
        setAnimRunning(true);
        while (runStep()) {
            await animDelay(data.animTime);
        }
        if (animRunning) setAnimRunning(false);
    };

    const onStep = (e: React.MouseEvent) => {
        e.preventDefault();
        runStep();
    };

    const runStep = (): boolean => {
        if (iterator) {
            let result = iterator.next();
            if (result.done) {
                setAnimRunning(false);
                setValueFound(false);
                return false;
            }

            if (result.value.updates.length > 0)
                dispatch(nodesUpdated(result.value.updates));
            dispatch(nodeSelected(result.value.selectedId));

            if (result.value.found) {
                setAnimRunning(false);
                setValueFound(true);
                return false;
            }
        }
        return true;
    };

    const handelOnChange = (e: any) => {
        initIterator(parseInt(e.target.value));
    };

    const resetNodeStatus = () => {
        dispatch(nodeSelected(''));
        let updates = nodes.map((node) => {
            return { id: node.id, changes: { status: NodeStatus.NORMAL } };
        });
        dispatch(nodesUpdated(updates));
    };

    const handleRest = (e: React.MouseEvent) => {
        resetNodeStatus();
        setAnimRunning(false);
        setValueFound(null);
        if (valueRef.current) initIterator(parseInt(valueRef.current?.value));
    };

    const { ref, ...rest } = register('value', {
        onChange: handelOnChange,
    });

    const initIterator = (value: number) => {
        const iterator = SEARCH_ITERATORS.get(props.algo);
        if (iterator) setIterator(iterator(nodes, value));
    };

    return (
        <Modal title="Searching" onClose={props.onClose} stayOpen={animRunning}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={modalStyles.form}
            >
                <div className={modalStyles.inputGroup}>
                    <div className={modalStyles.inputRow}>
                        <label htmlFor="algo">Algorithm</label>
                        <input
                            disabled
                            className={modalStyles.input}
                            {...register('algo', {
                                required: 'Algo Type Required',
                            })}
                        />
                    </div>
                    <div className={modalStyles.inputRow}>
                        <label htmlFor="value">Search Value</label>
                        <input
                            type="number"
                            className={modalStyles.input}
                            min={0}
                            max={1000}
                            {...rest}
                            ref={(e) => {
                                ref(e);
                                valueRef.current = e;
                            }}
                        />
                    </div>
                    <div className={modalStyles.inputRow}>
                        <label htmlFor="animTime">Anim. Speed</label>
                        <input
                            type="number"
                            className={modalStyles.input}
                            min={0}
                            max={1000}
                            {...register('animTime')}
                        />
                    </div>
                    {valueFound !== null && (
                        <div className={modalStyles.resultRow}>
                            <p
                                className={
                                    valueFound
                                        ? modalStyles.resultMsgPos
                                        : modalStyles.resultMsgNeg
                                }
                            >
                                {valueFound ? 'Value Found' : 'Value Not Found'}
                            </p>
                            <button
                                className={modalStyles.circularBtn}
                                onClick={handleRest}
                            >
                                <ResetIcon />
                            </button>
                        </div>
                    )}
                </div>
                <div className={modalStyles.btnContainer}>
                    <input
                        className={modalStyles.btn}
                        type="submit"
                        value="Auto"
                        disabled={animRunning}
                    />
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value="Step"
                        onClick={onStep}
                        disabled={animRunning}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default SearchingModal;

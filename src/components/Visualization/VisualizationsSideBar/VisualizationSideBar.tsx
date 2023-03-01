import { useContext } from 'react';
import uuid from 'react-uuid';
import { ButtonItem, RadioButton, SideBar, ToolBox, ToolBoxGroup } from '../..';
import {
    animRunningChanged,
    dsaChanged,
} from '../../../store/slices/canvasSlice';
import { nodeSelected, nodesUpdated } from '../../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../../store/store';
import {
    DSAType,
    Modal,
    Node,
    NodeStatus,
    SearchAlgo,
    SortingAlgo,
} from '../../../types';
import { SORTING_ITERATORS } from '../../../utils/algorithms';
import { AlertModal, SearchingModal, SortingModal } from '../../Modals';
import { ModalContext } from '../../Providers';

const VisualizationSideBar = () => {
    const nodes: Node[] = useAppSelector(selectAllNodes);
    const dsaType = useAppSelector((state) => state.canvas.dsaType);
    const animRunning = useAppSelector((state) => state.canvas.animRunning);

    const dispatch = useAppDispatch();
    const { showModal, hideModal } = useContext(ModalContext);

    const resetNodeStatus = () => {
        dispatch(nodeSelected(''));
        let updates = nodes.map((node) => {
            return { id: node.id, changes: { status: NodeStatus.NORMAL } };
        });
        dispatch(nodesUpdated(updates));
    };

    const handelEmptyNodes = () => {
        const id = uuid();
        const alertModal: Modal = {
            id: id,
            tag: 'ALERT_MODAL',
            component: (
                <AlertModal
                    title="No Data"
                    message="There is no data. Try adding nodes."
                    onClose={() => hideModal(id)}
                    key={id}
                />
            ),
        };
        showModal(alertModal);
    };

    const handleSorting = (algo: SortingAlgo) => {
        if (nodes.length === 0) {
            handelEmptyNodes();
            return;
        }
        const iterator = SORTING_ITERATORS.get(algo);
        const id = uuid();
        const sortingModal: Modal = {
            id: id,
            tag: 'SORTING_ALGO_MODAL',
            component: (
                <SortingModal
                    algo={algo}
                    onClose={() => {
                        hideModal(id);
                        dispatch(animRunningChanged(false));
                        resetNodeStatus();
                    }}
                    iterator={iterator ? iterator(nodes) : null}
                    key={id}
                />
            ),
        };
        dispatch(animRunningChanged(true));
        resetNodeStatus();
        showModal(sortingModal);
    };

    const handleSearching = (algo: SearchAlgo) => {
        if (nodes.length === 0) {
            handelEmptyNodes();
            return;
        }
        if (algo === SearchAlgo.BINARY && !isDataSorted()) {
            const id = uuid();
            const alertModal: Modal = {
                id: id,
                tag: 'ALERT_MODAL',
                component: (
                    <AlertModal
                        title="Sorting"
                        message="Data is not sorted. Binary search requires sorting."
                        onClose={() => hideModal(id)}
                    />
                ),
            };
            showModal(alertModal);
        } else {
            const id = uuid();
            const searchingModal: Modal = {
                id: id,
                tag: 'SEARCHING_ALGO_MODAL',
                component: (
                    <SearchingModal
                        algo={algo}
                        onClose={() => {
                            hideModal(id);
                            dispatch(animRunningChanged(false));
                            resetNodeStatus();
                        }}
                        key={id}
                    />
                ),
            };
            dispatch(animRunningChanged(true));
            resetNodeStatus();
            showModal(searchingModal);
        }
    };

    const isDataSorted = (): boolean => {
        const values = nodes.map((node) => node.value);
        for (let i = 0; i < values.length - 2; i++) {
            if (values[i] > values[i + 1]) return false;
        }
        return true;
    };

    return (
        <>
            <SideBar
                side="right"
                width="300px"
                height="100%"
                title="Visualizations"
                collapsed={animRunning}
            >
                <ToolBox title="Data Structures">
                    <ToolBoxGroup title="">
                        <RadioButton
                            name="data structure"
                            value="dsa_array"
                            label="Show As Array"
                            disabled={animRunning}
                            checked={dsaType === DSAType.ARRAY}
                            onClick={() => dispatch(dsaChanged(DSAType.ARRAY))}
                        />
                        <RadioButton
                            name="data structure"
                            value="dsa_bin_tree"
                            label="Show As Binary Tree"
                            disabled={animRunning}
                            checked={dsaType === DSAType.BIN_TREE}
                            onClick={() =>
                                dispatch(dsaChanged(DSAType.BIN_TREE))
                            }
                        />
                    </ToolBoxGroup>
                </ToolBox>
                <ToolBox title="Algorithms">
                    <ToolBoxGroup title="Sorting">
                        {Object.values(SortingAlgo).map((key) => (
                            <ButtonItem
                                disabled={
                                    animRunning || dsaType === DSAType.BIN_TREE
                                }
                                key={key}
                                onClick={() => handleSorting(key)}
                            >
                                {key}
                            </ButtonItem>
                        ))}
                    </ToolBoxGroup>
                    <ToolBoxGroup title="Searching">
                        {Object.values(SearchAlgo).map((key) => (
                            <ButtonItem
                                disabled={
                                    animRunning || dsaType === DSAType.BIN_TREE
                                }
                                key={key}
                                onClick={() => handleSearching(key)}
                            >
                                {key}
                            </ButtonItem>
                        ))}
                    </ToolBoxGroup>
                </ToolBox>
            </SideBar>
        </>
    );
};

export default VisualizationSideBar;

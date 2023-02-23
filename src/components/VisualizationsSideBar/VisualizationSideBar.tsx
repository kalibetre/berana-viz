import { useContext, useState } from 'react';
import uuid from 'react-uuid';
import {
    ButtonItem,
    RadioButton,
    SearchingModal,
    SideBar,
    SortingModal,
    ToolBox,
    ToolBoxGroup,
} from '..';
import { animRunningChanged, dsaChanged } from '../../store/slices/canvasSlice';
import { nodeSelected, nodesUpdated } from '../../store/slices/nodesSlice';
import {
    selectAllNodes,
    useAppDispatch,
    useAppSelector,
} from '../../store/store';
import {
    DSAType,
    Modal,
    Node,
    NodeStatus,
    SearchAlgo,
    SortingAlgo,
} from '../../types';
import { SORTING_ITERATORS } from '../../utils/algorithms';
import { ModalContext } from '../Providers';
import AlertModal from '../Visualization/Modals/AlertModal';

const VisualizationSideBar = () => {
    const nodes: Node[] = useAppSelector(selectAllNodes);
    const dsaType = useAppSelector((state) => state.canvas.dsaType);

    const dispatch = useAppDispatch();
    const { showModal, hideModal } = useContext(ModalContext);
    const [btnsDisabled, setBtnsDisabled] = useState(false);

    const resetNodeStatus = () => {
        dispatch(nodeSelected(''));
        let updates = nodes.map((node) => {
            return { id: node.id, changes: { status: NodeStatus.NORMAL } };
        });
        dispatch(nodesUpdated(updates));
    };

    const handleSorting = (algo: SortingAlgo) => {
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
                        setBtnsDisabled(false);
                        dispatch(animRunningChanged(false));
                        resetNodeStatus();
                    }}
                    iterator={iterator ? iterator(nodes) : null}
                />
            ),
        };
        dispatch(animRunningChanged(true));
        resetNodeStatus();
        showModal(sortingModal);
        setBtnsDisabled(true);
    };

    const handleSearching = (algo: SearchAlgo) => {
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
                            setBtnsDisabled(false);
                            dispatch(animRunningChanged(false));
                            resetNodeStatus();
                        }}
                    />
                ),
            };
            dispatch(animRunningChanged(true));
            resetNodeStatus();
            showModal(searchingModal);
            setBtnsDisabled(true);
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
            >
                <ToolBox title="Data Structures">
                    <ToolBoxGroup title="">
                        <RadioButton
                            name="data structure"
                            value="dsa_array"
                            label="Show As Array"
                            disabled={btnsDisabled}
                            checked={dsaType === DSAType.ARRAY}
                            onClick={() => dispatch(dsaChanged(DSAType.ARRAY))}
                        />
                        <RadioButton
                            name="data structure"
                            value="dsa_bin_tree"
                            label="Show As Binary Tree"
                            disabled={btnsDisabled}
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
                                disabled={btnsDisabled}
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
                                disabled={btnsDisabled}
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

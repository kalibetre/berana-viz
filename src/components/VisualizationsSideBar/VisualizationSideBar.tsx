import { useContext, useState } from 'react';
import uuid from 'react-uuid';
import {
    ButtonItem,
    RadioButton,
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
import { DSAType, Modal, Node, NodeStatus, SortingAlgo } from '../../types';
import SORTING_ITERATORS from '../../utils/algorithms';
import { ModalContext } from '../Providers';

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
                        <ButtonItem disabled={btnsDisabled}>
                            Linear Search
                        </ButtonItem>
                        <ButtonItem disabled={btnsDisabled}>
                            Binary Search
                        </ButtonItem>
                        <ButtonItem disabled={btnsDisabled}>
                            Jump Search
                        </ButtonItem>
                        <ButtonItem disabled={btnsDisabled}>
                            Interpolation Search
                        </ButtonItem>
                    </ToolBoxGroup>
                </ToolBox>
            </SideBar>
        </>
    );
};

export default VisualizationSideBar;

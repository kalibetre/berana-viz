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
import { dsaChanged } from '../../store/slices/canvasSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DSAType, Modal, SortingAlgo } from '../../types';
import { ModalContext } from '../Providers';

const VisualizationSideBar = () => {
    const dsaType = useAppSelector((state) => state.canvas.dsaType);
    const dispatch = useAppDispatch();
    const { showModal, hideModal } = useContext(ModalContext);
    const [btnsDisabled, setBtnsDisabled] = useState(false);

    const handleSorting = (algo: SortingAlgo) => {
        const id = uuid();
        const addNodeModal: Modal = {
            id: id,
            tag: 'SORTING_ALGO_MODAL',
            component: (
                <SortingModal
                    algo={algo}
                    onClose={() => {
                        hideModal(id);
                        setBtnsDisabled(false);
                    }}
                />
            ),
        };
        showModal(addNodeModal);
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
                            checked={dsaType === DSAType.ARRAY}
                            onClick={() => dispatch(dsaChanged(DSAType.ARRAY))}
                        />
                        <RadioButton
                            name="data structure"
                            value="dsa_bin_tree"
                            label="Show As Binary Tree"
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
                        <ButtonItem>Linear Search</ButtonItem>
                        <ButtonItem>Binary Search</ButtonItem>
                        <ButtonItem>Jump Search</ButtonItem>
                        <ButtonItem>Interpolation Search</ButtonItem>
                    </ToolBoxGroup>
                </ToolBox>
            </SideBar>
        </>
    );
};

export default VisualizationSideBar;

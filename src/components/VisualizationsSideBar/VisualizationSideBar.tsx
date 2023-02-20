import { ButtonItem, RadioButton, SideBar, ToolBox, ToolBoxGroup } from '..';
import { dsaChanged } from '../../store/slices/canvasSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DSAType } from '../../types';

const VisualizationSideBar = () => {
    const dsaType = useAppSelector((state) => state.canvas.dsaType);
    const dispatch = useAppDispatch();

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
                        <ButtonItem>Bubble Sort</ButtonItem>
                        <ButtonItem>Selection Sort</ButtonItem>
                        <ButtonItem>Insertion Sort</ButtonItem>
                        <ButtonItem>Merge Sort</ButtonItem>
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

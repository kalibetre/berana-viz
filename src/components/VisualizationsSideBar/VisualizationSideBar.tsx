import { ButtonItem, SideToolBox, ToolBox, ToolBoxGroup } from '..';

const VisualizationSideBar = () => {
    return (
        <SideToolBox
            side="right"
            width="300px"
            height="100%"
            title="Visualizations"
        >
            <ToolBox title="Data Structures">
                <ToolBoxGroup title="">
                    <ButtonItem>Array</ButtonItem>
                    <ButtonItem>Singly Linked List</ButtonItem>
                    <ButtonItem>Doubly Linked List</ButtonItem>
                    <ButtonItem>Hash Table</ButtonItem>
                    <ButtonItem>Binary Search Tree</ButtonItem>
                </ToolBoxGroup>
            </ToolBox>
            <ToolBox title="Algorithms">
                <ToolBoxGroup title="Sorting">
                    <ButtonItem>Bubble Sort</ButtonItem>
                    <ButtonItem>Selection Table</ButtonItem>
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
        </SideToolBox>
    );
};

export default VisualizationSideBar;

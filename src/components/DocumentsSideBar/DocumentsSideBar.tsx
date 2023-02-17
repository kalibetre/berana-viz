import { DocumentItem, SideBar, ToolBox, ToolBoxGroup } from '..';
import DocumentActions from './DocumentActions/DocumentActions';
import NodeActions from './NodeActions/NodeActions';

const DocumentsSideBar = () => {
    return (
        <SideBar width="300px" height="100%" title="Documents">
            <NodeActions />
            <DocumentActions />
            <ToolBox title="Documents">
                <ToolBoxGroup title="My Documents" striped>
                    <DocumentItem savedToCloud>
                        Singly Linked List Searching Singly Linked List
                        Searching Singly Linked List Searching
                    </DocumentItem>
                </ToolBoxGroup>
                <ToolBoxGroup title="Sample Documents" striped>
                    <DocumentItem>Self Balancing Tree</DocumentItem>
                    <DocumentItem>Hash of Tsf File</DocumentItem>
                    <DocumentItem>Hash of Tsf File</DocumentItem>
                </ToolBoxGroup>
            </ToolBox>
        </SideBar>
    );
};

export default DocumentsSideBar;

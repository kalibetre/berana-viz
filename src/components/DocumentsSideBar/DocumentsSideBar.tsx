import { DocumentItem, SideBar, ToolBox, ToolBoxGroup } from '..';
import useAuth from '../../hooks/useAuth';
import DocumentActions from './DocumentActions/DocumentActions';
import styles from './DocumentsSideBar.module.css';
import NodeActions from './NodeActions/NodeActions';

const DocumentsSideBar = () => {
    const { checkingUser, user } = useAuth();

    return (
        <SideBar width="300px" height="100%" title="Documents">
            <NodeActions />
            <DocumentActions />
            <ToolBox title="Documents">
                {checkingUser || user === null ? (
                    <span className={styles.loginMessage}>
                        Login to see your documents here..
                    </span>
                ) : (
                    <ToolBoxGroup title="My Documents" striped>
                        <DocumentItem savedToCloud>
                            Singly Linked List Searching Singly Linked List
                            Searching Singly Linked List Searching
                        </DocumentItem>
                    </ToolBoxGroup>
                )}
            </ToolBox>
        </SideBar>
    );
};

export default DocumentsSideBar;

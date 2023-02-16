import {
    ButtonItem,
    DocumentItem,
    SideToolBox,
    ToolBox,
    ToolBoxGroup,
} from '..';
import {
    DeleteFileIcon,
    ExportIcon,
    NewFileIcon,
    SaveFileIcon,
} from '../../icons';

import styles from './DocumentsSideBar.module.css';

const DocumentsSideBar = () => {
    return (
        <SideToolBox width="300px" height="100%" title="Documents">
            <ToolBox title="Actions">
                <ToolBoxGroup title="">
                    <div className={styles.options}>
                        <ButtonItem>
                            <span className={styles.icon}>
                                <NewFileIcon />
                            </span>
                            New
                        </ButtonItem>
                        <ButtonItem>
                            <span className={styles.icon}>
                                <SaveFileIcon />
                            </span>
                            Save
                        </ButtonItem>
                        <ButtonItem>
                            <span className={styles.icon}>
                                <DeleteFileIcon />
                            </span>
                            Delete
                        </ButtonItem>
                        <ButtonItem>
                            <span className={styles.icon}>
                                <ExportIcon />
                            </span>
                            Export
                        </ButtonItem>
                    </div>
                </ToolBoxGroup>
            </ToolBox>
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
        </SideToolBox>
    );
};

export default DocumentsSideBar;

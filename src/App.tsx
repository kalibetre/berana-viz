import styles from './App.module.css';
import {
    AppBar,
    ButtonItem,
    DocumentItem,
    SideToolBox,
    ToolBox,
    ToolBoxGroup,
} from './components';
import { DeleteFileIcon, ExportIcon, NewFileIcon, SaveFileIcon } from './icons';

function App() {
    return (
        <div className={styles.mainContainer}>
            <AppBar />
            <main className={styles.main}>
                <div className={styles.leftToolBox}>
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
                                    Singly Linked List Searching Singly Linked
                                    List Searching Singly Linked List Searching
                                </DocumentItem>
                            </ToolBoxGroup>
                            <ToolBoxGroup title="Sample Documents" striped>
                                <DocumentItem>Self Balancing Tree</DocumentItem>
                                <DocumentItem>Hash of Tsf File</DocumentItem>
                                <DocumentItem>Hash of Tsf File</DocumentItem>
                            </ToolBoxGroup>
                        </ToolBox>
                    </SideToolBox>
                </div>
                <div className={`canvas ${styles.canvas}`}></div>
                <div className={styles.rightToolBox}>
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
                </div>
            </main>
            <footer>
                <span className={styles.footer}>
                    Copy right &#169; Kalkidan Betre
                </span>
            </footer>
        </div>
    );
}

export default App;

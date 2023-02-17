import { ButtonItem, ToolBox, ToolBoxGroup } from '../..';
import {
    DeleteFileIcon,
    ExportIcon,
    NewFileIcon,
    SaveFileIcon,
} from '../../../icons';
import styles from './DocumentActions.module.css';

const DocumentActions = () => {
    return (
        <ToolBox title="Document Actions">
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
    );
};

export default DocumentActions;

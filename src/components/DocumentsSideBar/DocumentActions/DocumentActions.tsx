import { ButtonItem, ToolBox, ToolBoxGroup } from '../..';
import useAuth from '../../../hooks/useAuth';
import {
    DeleteFileIcon,
    ExportIcon,
    NewFileIcon,
    SaveFileIcon,
} from '../../../icons';
import styles from './DocumentActions.module.css';

const DocumentActions = () => {
    const { checkingUser, user } = useAuth();

    return (
        <ToolBox title="Document Actions">
            <ToolBoxGroup title="">
                <div className={styles.options}>
                    <ButtonItem disabled={checkingUser || user === null}>
                        <span className={styles.icon}>
                            <NewFileIcon />
                        </span>
                        New
                    </ButtonItem>
                    <ButtonItem disabled={checkingUser || user === null}>
                        <span className={styles.icon}>
                            <SaveFileIcon />
                        </span>
                        Save
                    </ButtonItem>
                    <ButtonItem disabled={checkingUser || user === null}>
                        <span className={styles.icon}>
                            <DeleteFileIcon />
                        </span>
                        Delete
                    </ButtonItem>
                    <ButtonItem disabled={checkingUser || user === null}>
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

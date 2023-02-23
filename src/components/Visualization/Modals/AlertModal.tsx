import Modal from '../../Modal/Modal';
import modalStyles from './Modal.module.css';

export enum AlertType {
    CONFIRMATION,
    WARNING,
    ERROR,
}

interface AlertModalProps {
    title: string;
    message: string;
    type: AlertType;
    confirmButtonLabel: string;
    cancelButtonLabel: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
}

const AlertModal = (props: AlertModalProps) => {
    return (
        <Modal title={props.title}>
            <div className={modalStyles.alertContent}>
                <p>{props.message}</p>
            </div>
            <div
                className={
                    props.type !== AlertType.CONFIRMATION
                        ? modalStyles.btnContainerOneBtn
                        : modalStyles.btnContainer
                }
            >
                {props.type === AlertType.CONFIRMATION && (
                    <input
                        className={modalStyles.btn}
                        type="button"
                        value={props.confirmButtonLabel}
                        onClick={() => {
                            if (props.onCancel) props.onCancel();
                            if (props.onClose) props.onClose();
                        }}
                    />
                )}
                <input
                    className={modalStyles.btn}
                    type="button"
                    value={props.cancelButtonLabel}
                    onClick={() => {
                        if (props.onConfirm) props.onConfirm();
                        if (props.onClose) props.onClose();
                    }}
                />
            </div>
        </Modal>
    );
};

AlertModal.defaultProps = {
    type: AlertType.WARNING,
    confirmButtonLabel: 'Ok',
    cancelButtonLabel: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {},
};

export default AlertModal;

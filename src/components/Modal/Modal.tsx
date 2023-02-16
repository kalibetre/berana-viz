import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import { CloseIcon } from '../../icons';
import styles from './Modal.module.css';

interface ModalProps {
    width?: number;
    height?: number;
    title?: string;
    children: ReactNode;
}

const Modal = (props: ModalProps) => {
    const [showModal, setShowModal] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        const top = height / 2 - (props.height ? props.height : 0) / 2;
        const left = width / 2 - (props.width ? props.width : 0) / 2;
        if (modalRef.current) {
            modalRef.current.style.top = `${top}px`;
            modalRef.current.style.left = `${left}px`;
        }
    }, [props.width, props.height, modalRef]);

    const modal = (
        <Draggable handle=".handle">
            <div
                ref={modalRef}
                style={{ width: props.width, height: props.height }}
                className={styles.modalContainer}
            >
                <div className={`handle ${styles.titleBar}`}>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        <CloseIcon />
                    </button>
                    {props.title}
                </div>
                <div className={styles.modal}>{props.children}</div>
            </div>
        </Draggable>
    );
    return <>{showModal && createPortal(modal, document.body)}</>;
};

Modal.defaultProps = {
    width: 300,
    height: 300,
    title: 'BeranaVis',
};

export default Modal;

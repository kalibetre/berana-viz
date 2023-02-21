import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import { CloseIcon } from '../../icons';
import styles from './Modal.module.css';

interface ModalProps {
    title?: string;
    children: ReactNode;
    onClose?: () => void;
}

const Modal = (props: ModalProps) => {
    const [showModal, setShowModal] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setShowModal(false);
        if (props.onClose) props.onClose();
    };

    useEffect(() => {
        if (modalRef.current) {
            const winW = document.body.clientWidth;
            const winH = document.body.clientHeight;
            const divW = modalRef.current.clientWidth;
            const divH = modalRef.current.clientHeight;
            modalRef.current.style.top = `${winH / 2 - divH / 2}px`;
            modalRef.current.style.left = `${winW / 2 - divW / 2}px`;
        }
    }, [modalRef]);

    const modal = (
        <Draggable handle=".handle">
            <div ref={modalRef} className={styles.modalContainer}>
                <div className={`handle ${styles.titleBar}`}>
                    <button className={styles.closeBtn} onClick={handleClose}>
                        <CloseIcon />
                    </button>
                    {props.title}
                </div>
                {props.children}
            </div>
        </Draggable>
    );
    return <>{showModal && createPortal(modal, document.body)}</>;
};

Modal.defaultProps = {
    title: 'BeranaVis',
};

export default Modal;

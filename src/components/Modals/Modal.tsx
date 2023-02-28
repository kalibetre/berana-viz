import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import { CloseIcon } from '../../icons';
import styles from './Modal.module.css';

interface ModalProps {
    title?: string;
    children: ReactNode;
    onClose?: () => void;
    stayOpen: boolean;
}

const Modal = (props: ModalProps) => {
    const [showModal, setShowModal] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        console.log('Close');
        if (!props.stayOpen) {
            setShowModal(false);
            if (props.onClose) props.onClose();
        }
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
                <div className={styles.titleBar}>
                    <button
                        className={styles.closeBtn}
                        onClick={handleClose}
                        onTransitionEnd={handleClose}
                        disabled={props.stayOpen}
                    >
                        <span className={styles.closeBtnIcon}>
                            <CloseIcon />
                        </span>
                    </button>
                    <div className={`handle ${styles.handle}`}>
                        {props.title}
                    </div>
                </div>
                {props.children}
            </div>
        </Draggable>
    );
    return <>{showModal && createPortal(modal, document.body)}</>;
};

Modal.defaultProps = {
    title: 'BeranaVis',
    stayOpen: false,
};

export default Modal;

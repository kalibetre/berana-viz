import { createContext, ReactNode, useState } from 'react';
import { Modal } from '../../types';

export interface ModalContextType {
    showModal: (modal: Modal) => void;
    hideModal: (id: String) => void;
}

export const ModalContext = createContext({
    showModal: () => {},
    hideModal: () => {},
} as ModalContextType);

interface ModalProviderProps {
    children: ReactNode;
}

const ModalProvider = (props: ModalProviderProps) => {
    const [modals, setModals] = useState<Modal[]>([]);

    const showModal = (modal: Modal) => {
        if (modals.findIndex((value) => value.tag === modal.tag) !== -1) return;
        setModals([...modals, modal]);
    };

    const hideModal = (id: String) => {
        const idx = modals.findIndex((value) => value.id === id);
        setModals([...modals.slice(0, idx), ...modals.slice(idx + 1)]);
    };

    return (
        <>
            <ModalContext.Provider value={{ showModal, hideModal }}>
                {props.children}
            </ModalContext.Provider>
            {modals.map((modal) => modal.component)}
        </>
    );
};

export default ModalProvider;

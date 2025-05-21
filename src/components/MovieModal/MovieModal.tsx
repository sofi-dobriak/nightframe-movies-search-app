import Modal from 'react-modal';
import type { Styles } from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import styles from './MovieModal.module.css';
import { ReactNode } from 'react';

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

    maxWidth: '90vw',
    width: 'fit-content',
    maxHeight: '80vh',
    overflowY: 'auto',

    padding: '40px 20px 20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

Modal.setAppElement('#root');

interface MovieModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const MovieModal = ({ modalIsOpen, closeModal, children }: MovieModalProps) => {
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <IoMdClose className={styles.closeButton} onClick={closeModal} />
        {children}
      </Modal>
    </div>
  );
};

export default MovieModal;

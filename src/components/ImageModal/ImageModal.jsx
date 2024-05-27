import Modal from 'react-modal';
import css from './ImageModal.module.css';

export default function ImageModal({ isOpen, onClose, imageUrl, imageAlt, customStyles }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button onClick={onClose} className={css.closeButton}>×</button>
      <img src={imageUrl} alt={imageAlt} className={css.modalImage} />
    </Modal>
  );
}

import React from 'react';
import ReactDom from 'react-dom';
import styles from './modal.module.css';

export default function Modal({
  open, children, onClose, currentGame,
}) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.modal}>
        <div className={styles.modal_header}>
          <h3>{currentGame.name}</h3>
          <button type="button" className={styles.button} onClick={onClose}>X</button>
        </div>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </>,
    document.getElementById('root-modal'),
  );
}

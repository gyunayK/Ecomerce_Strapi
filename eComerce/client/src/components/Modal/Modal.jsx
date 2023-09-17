// Updated Modal.jsx
import "./Modal.scss";

function Modal({ open, onClose, children }) {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <div className={`modal-wrapper ${open ? "modal-open" : ""}`}>
      <section
        role="dialog"
        aria-labelledby="modal-title"
        className={`modal ${open ? "modal-visible" : "modal-hidden"}`}
      >
        <button
          className="close"
          onClick={handleClose}
          aria-label="Close Modal"
        >
          Close
        </button>
        <div id="modal-title" className="content">
          {children}
        </div>
      </section>
    </div>
  );
}

export default Modal;

import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.scss";

function Modal({ open, onClose, children }) {
  const handleClose = () => {
    onClose && onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleClickOutsideModal = (e) => {
      if (e.target.classList.contains("modal-wrapper")) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("click", handleClickOutsideModal);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Reset the overflow property
    };
  });

  return (
    <div className={`modal-wrapper ${open ? "modal-open" : ""}`}>
      <section
        role="dialog"
        aria-labelledby="modal-title"
        className={`modal ${open ? "modal-visible" : "modal-hidden"}`}
      >
        <button
          className="closeIcon"
          onClick={handleClose}
          aria-label="Close Modal"
        >
          <CloseIcon />
        </button>
        <div id="modal-title" className="content">
          {children}
        </div>
      </section>
    </div>
  );
}

export default Modal;

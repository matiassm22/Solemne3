import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
}: ConfirmModalProps) {
  
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <div className="confirm-modal">
        <div className="confirm-modal__header">
          <AlertTriangle className="confirm-modal__icon" />
          <h2 id="confirm-modal-title" className="confirm-modal__title">{title}</h2>
        </div>
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__footer">
          <button
            type="button"
            onClick={onCancel}
            className="confirm-modal__btn confirm-modal__btn--cancel"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="confirm-modal__btn confirm-modal__btn--confirm"
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

import Modal from "./Modal";
import Button from "./Button";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
}

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDanger = false,
}: ConfirmModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
            <div className="confirm-modal-content" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                    {message}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                    <Button variant="secondary" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={isDanger ? "secondary" : "primary"}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        style={isDanger ? { backgroundColor: "var(--danger)", color: "white", border: "none" } : undefined}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;

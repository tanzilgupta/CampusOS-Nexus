import { useState } from "react";
import { X } from "lucide-react";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (message: string) => void;
    isSubmitting: boolean;
}

const ApplicationModal = ({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting,
}: ApplicationModalProps) => {

    const [message, setMessage] = useState("");

    if (!isOpen) {
        return null;
    }


    const handleSubmit = () => {

        if (!message.trim()) {
            return;
        }

        onSubmit(message.trim());

        setMessage("");
    };


    return (

        <div className="modal-overlay">

            <div className="modal-card">


                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    <X size={20}/>
                </button>


                <h2>
                    Apply to join project
                </h2>


                <p>
                    Tell the project owner why you want to contribute.
                </p>



                <textarea
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    placeholder="Write your application message..."
                    rows={5}
                />



                <div className="modal-actions">


                    <button
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>



                    <button
                        className="auth-submit"
                        disabled={
                            isSubmitting ||
                            !message.trim()
                        }
                        onClick={handleSubmit}
                    >

                        {
                            isSubmitting
                            ? "Sending..."
                            : "Send Application"
                        }

                    </button>


                </div>


            </div>

        </div>

    );

};


export default ApplicationModal;
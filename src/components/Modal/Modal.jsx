import { useEffect } from "react"
import "./Modal.css"

function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "medium"
}) {

    useEffect(() => {

        function handleEscape(event) {
            if (event.key === "Escape") {
                onClose?.()
            }
        }

        if (isOpen) {
            document.addEventListener(
                "keydown",
                handleEscape
            )
        }

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape
            )
        }

    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    function handleBackgroundClick(event) {
        if (event.target === event.currentTarget) {
            onClose?.()
        }
    }

    return (
        <div
            className="modal-overlay"
            onClick={handleBackgroundClick}
        >

            <div className={`modal modal-${size}`}>

                <div className="modal-header">

                    <h2>
                        {title}
                    </h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="modal-content">
                    {children}
                </div>

            </div>

        </div>
    )
}

export default Modal
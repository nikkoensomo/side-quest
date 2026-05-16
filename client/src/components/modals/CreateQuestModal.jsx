import { useRef, useEffect } from "react";
import QuestForm from "../forms/QuestForm.jsx";

const CreateQuestModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [onClose]);

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"> 
                    <div className="flex flex-col justify-center items-center mb-4 gap-4"> 
                        <h2 className="text-black text-2xl font-semibold mb-4">Create A Quest</h2>

                        <QuestForm 
                            onSuccess={onClose}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default CreateQuestModal;
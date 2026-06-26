import { useRef, useEffect } from "react";
import QuestForm from "../forms/QuestForm.jsx";

const CreateQuestModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (!isOpen) return;

            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                ref={modalRef}
                className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
            >
                <div className="mb-6 border-b border-gray-200 pb-4">
                    <span className="text-xs font-medium uppercase text-gray-400">
                        New Quest
                    </span>

                    <h2 className="mt-1 text-2xl font-semibold text-zinc-950">
                        Create a quest
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Add the pickup details, delivery location, and reward so other users can accept it.
                    </p>
                </div>

                <QuestForm onSuccess={onClose} />
            </div>
        </div>
    );
};

export default CreateQuestModal;
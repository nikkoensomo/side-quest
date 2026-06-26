import { useEffect, useRef } from 'react';
import EditQuestForm from "../forms/EditQuestForm";

const EditQuestModal = ({ isOpen, onClose, quest, onSuccess }) => {
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

    if (!isOpen || !quest) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                ref={modalRef}
                className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
            >
                <div className="mb-6 border-b border-gray-200 pb-4">
                    <span className="text-xs font-medium uppercase text-gray-400">
                        Edit Quest
                    </span>

                    <h2 className="mt-1 text-2xl font-semibold text-zinc-950">
                        Update quest details
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Change the quest information while it is still available to edit.
                    </p>
                </div>

                <EditQuestForm
                    onSuccess={onSuccess}
                    onClose={onClose}
                    quest={quest}
                />
            </div>
        </div>
    );
};

export default EditQuestModal;
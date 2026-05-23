import { useEffect, useRef } from 'react';
import EditQuestForm from "../forms/EditQuestForm";

const EditQuestModal = ({ isOpen, onClose, onEdit, quest }) => {
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

    console.log('from modal:', quest?.title);

    if (!isOpen || !quest) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div ref={modalRef} className="w-full max-w-md bg-white rounded-lg p-6">
                    <div className="flex flex-col gap-4 items-center">
                        <h2 className="text-black text-2xl">Edit Here</h2>
                        <EditQuestForm
                            onSuccess={onClose}
                            quest={quest}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditQuestModal;
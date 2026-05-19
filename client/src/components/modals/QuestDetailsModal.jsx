import { useRef, useEffect, useState } from 'react';

const QuestDetailsModal = ({ isOpen, onClose, quest }) => {
    if (!isOpen || !quest) return null;

    const modalRef = useState(null);

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
                <div ref={modalRef} className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
                    <span className="text-gray-300 text-sm">Quest Details</span>
                    <span className="text-gray-300 text-sm">{quest.title}</span>
                </div>
            </div>
        </>
    )
}

export default QuestDetailsModal;
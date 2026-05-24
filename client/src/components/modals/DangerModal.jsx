import { useEffect, useRef } from 'react';
import DangerButton from "../buttons/DangerButton";

const DangerModal = ({ type, quest, isOpen, onClose, onDelete, isLoading }) => {
    const modalRef = useRef();

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

    if (!isOpen || !quest) return null;

    console.log('from danger modal: ', quest._id);

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-6 z-50">
                <div ref={modalRef} className="w-full bg-white max-w-md rounded-lg shadow-lg">
                    <div className="flex flex-col justify-center items-center gap-4 px-4 py-2">
                        <h2 className="text-black text-2xl">Are you sure you want to delete this quest?</h2>

                        <DangerButton 
                            label={isLoading ? 'Deleting...' : 'Delete'}
                            type='button'
                            disabled={isLoading}
                            onClick={() => onDelete(quest._id)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DangerModal;
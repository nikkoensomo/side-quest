import { useEffect, useRef } from 'react';
import DangerButton from "../buttons/DangerButton";

const DangerModal = ({ type, quest, isOpen, onClose, onDelete, isLoading, onConfirm, buttonType }) => {
    const modalRef = useRef();

    const types = {
        danger: 'delete',
        confirm: 'accept'
    };

    const typeActions = {
        danger: 'Deleting...',
        confirm: 'Accepting...'
    }

    const capitalize = (str = '') => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

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
    console.log(types[type]);

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-6 z-50">
                <div ref={modalRef} className="w-full bg-white max-w-md rounded-lg shadow-lg">
                    <div className="flex flex-col justify-center items-center gap-4 px-4 py-2">
                        <h2 className="text-black text-2xl">Are you sure you want to {types[type]} this quest?</h2>

                        <DangerButton
                            label={isLoading ? `${typeActions[type]}` : `${capitalize(types[type])}`}
                            buttonType={buttonType}
                            type={type}
                            disabled={isLoading}
                            onClick={() => {
                                console.log('confirm quest id:', quest._id);
                                console.log('onConfirm:', onConfirm);
                                onConfirm(quest._id);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DangerModal;
import { useEffect } from 'react';
import BigBlackButton from '../buttons/BigBlackButton';

const ConfirmationModal = ({ isOpen, onClose, onClick }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                    <div className="flex flex-col gap-4 px-4 py-2 justify-center items-center">
                        <span>Are you sure you want to logout?</span>

                        <BigBlackButton 
                            label='Logout'
                            onClick={onClick}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal;
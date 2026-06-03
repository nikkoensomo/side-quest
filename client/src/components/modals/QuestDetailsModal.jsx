import { useRef, useEffect, useState } from 'react';
import ConfirmButton from '../buttons/ConfirmButton';

const QuestDetailsModal = ({
    isOpen,
    onClose,
    quest,
    onAccept,
    onComplete,
    onCancel,
    isLoading,
    isDisabled,
    isOwner,
    disableOutsideClose
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (disableOutsideClose) return;

        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [onClose, disableOutsideClose]);

    if (!isOpen || !quest) return null;

    console.log('is it the user:', isOwner);

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div ref={modalRef} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                    <div className="flex flex-col gap-1 border-b border-gray-200 pb-4">
                        <span className="text-xs font-medium uppercase text-gray-400">
                            Quest Details
                        </span>
                        <h2 className="text-xl font-semibold text-zinc-900">
                            {quest.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {quest.description}
                        </p>
                    </div>

                    <div className="mt-5 grid gap-3">
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <span className="text-xs font-medium text-gray-500">Pickup Location</span>
                            <p className="mt-1 text-sm font-medium text-zinc-900">{quest.pickupLocation}</p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <span className="text-xs font-medium text-gray-500">Delivery Location</span>
                            <p className="mt-1 text-sm font-medium text-zinc-900">{quest.deliveryLocation}</p>
                        </div>

                        <div className="flex justify-between rounded-lg border border-amber-100 bg-amber-50 p-4">
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-amber-700">Reward</span>
                                <p className="mt-1 text-lg font-semibold text-amber-950">{quest.reward}</p>
                            </div>

                        </div>
                    </div>
                    {!isOwner && quest.status === 'open' && (
                        <ConfirmButton
                            type="button"
                            label="Accept"
                            onClick={() => onAccept(quest)}
                        />
                    )}

                    {!isOwner && quest.status === 'in-progress' && (


                        <div className="flex justify-between items-center mt-4">
                            <ConfirmButton
                                type="button"
                                label="Complete"
                                onClick={() => onAccept(quest)}
                            />

                            <ConfirmButton
                                type="button"
                                label="Cancel"
                                onClick={() => onCancel(quest)}
                            />
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}

export default QuestDetailsModal;
import { useRef, useEffect } from 'react';
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
        function handleClickOutside(e) {
            if (!isOpen || disableOutsideClose) return;

            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose, disableOutsideClose]);

    if (!isOpen || !quest) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                ref={modalRef}
                className="w-full max-w-2xl rounded-lg bg-white shadow-lg"
            >
                <div className="border-b border-gray-200 px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <span className="text-xs font-medium uppercase text-gray-400">
                                Quest Details
                            </span>

                            <h2 className="mt-1 text-2xl font-semibold text-zinc-950">
                                {quest.title}
                            </h2>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                            {quest.status}
                        </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        {quest.description}
                    </p>
                </div>

                <div className="grid gap-4 px-6 py-5">
                    <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                        <span className="text-xs font-medium text-amber-700">
                            Reward
                        </span>

                        <p className="mt-1 text-2xl font-semibold text-amber-950">
                            ₱{quest.reward}
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <span className="text-xs font-medium text-gray-500">
                                Pickup Location
                            </span>

                            <p className="mt-1 text-sm font-medium text-zinc-900">
                                {quest.pickupLocation}
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <span className="text-xs font-medium text-gray-500">
                                Delivery Location
                            </span>

                            <p className="mt-1 text-sm font-medium text-zinc-900">
                                {quest.deliveryLocation}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-gray-200 px-6 py-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Close
                    </button>

                    {!isOwner && quest.status === 'open' && (
                        <ConfirmButton
                            type="button"
                            label={isLoading ? "Accepting..." : "Accept Quest"}
                            onClick={() => onAccept(quest)}
                            disabled={isLoading || isDisabled}
                        />
                    )}

                    {!isOwner && quest.status === 'in-progress' && (
                        <>
                            <button
                                type="button"
                                onClick={() => onCancel(quest._id)}
                                disabled={isLoading}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <ConfirmButton
                                type="button"
                                label={isLoading ? "Completing..." : "Complete"}
                                onClick={() => onComplete(quest._id)}
                                disabled={isLoading}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestDetailsModal;
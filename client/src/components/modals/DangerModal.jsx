import { useEffect, useRef } from 'react';
import DangerButton from "../buttons/DangerButton";

const DangerModal = ({
    type,
    quest,
    isOpen,
    onClose,
    onDelete,
    isLoading,
    onConfirm,
    buttonType = "button"
}) => {
    const modalRef = useRef(null);

    const types = {
        delete: {
            action: 'delete',
            title: 'Delete this quest?',
            description: 'This action cannot be undone. The quest will be removed from your list.',
            loadingLabel: 'Deleting...',
            variant: 'danger'
        },
        confirm: {
            action: 'accept',
            title: 'Accept this quest?',
            description: 'This quest will move to your taken quests once accepted.',
            loadingLabel: 'Accepting...',
            variant: 'confirm'
        }
    };

    const modalContent = types[type] || types.confirm;

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

    const handleAction = () => {
        if (type === 'delete') {
            onDelete?.(quest._id);
            return;
        }

        onConfirm?.(quest._id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div
                ref={modalRef}
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            >
                <div className="text-center">
                    <div
                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${type === 'danger'
                                ? 'bg-red-50 text-red-600'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                    >
                        <span className="text-lg font-bold">
                            {type === 'danger' ? '!' : '✓'}
                        </span>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-zinc-950">
                        {modalContent.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {modalContent.description}
                    </p>

                    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-left">
                        <p className="text-xs font-medium text-gray-500">
                            Quest
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-zinc-950">
                            {quest.title}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <DangerButton
                        label={isLoading ? modalContent.loadingLabel : modalContent.action}
                        buttonType={buttonType}
                        type={type}
                        disabled={isLoading}
                        onClick={handleAction}
                    />
                </div>
            </div>
        </div>
    );
};

export default DangerModal;
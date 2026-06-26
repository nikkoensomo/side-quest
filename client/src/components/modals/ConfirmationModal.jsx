import BigBlackButton from '../buttons/BigBlackButton';

const ConfirmationModal = ({ isOpen, onClose, onClick, label, text, quest, isLoading }) => {
    if (!isOpen || !quest) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        <span className="text-lg font-bold">✓</span>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-zinc-950">
                        Complete quest?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {text}
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

                    <BigBlackButton
                        label={isLoading ? 'Completing...' : label}
                        onClick={() => onClick(quest._id)}
                        isDisabled={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
import BigBlackButton from '../buttons/BigBlackButton';

const LogoutConfirmationModal = ({ isOpen, onClose, onClick, label, text }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-zinc-950">
                        Confirm logout
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {text}
                    </p>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <BigBlackButton
                        label={label}
                        onClick={onClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirmationModal;
const DeleteAccountModal = ({ label, text, onClick, onClose, isOpen, user }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 itmes-center justify-center z-50">
                <div className="w-full bg-white rounded-lg shadow-lg max-w-md p-6">
                    <div className="flex flex-col gap-4 px-4 py-2">
                        <span className="text-black text-medium">{text}</span>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DeleteAccountModal;
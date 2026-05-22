const EditQuestModal = ({ isOpen, onClose, onEdit }) => {
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="w-full max-w-md bg-white rounded-lg p-6">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-black text-2xl">Edit Here</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditQuestModal;
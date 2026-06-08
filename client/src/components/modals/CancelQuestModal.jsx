import BigBlackButton from "../buttons/BigBlackButton";

const CancelQuestModal = ({ isOpen, type, quest, label, text, onClick, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 justify-center items-center z-50">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                    <div className="flex flex-col justify-center items-center px-4 py-2 ">
                        <span>{text}</span>

                        <BigBlackButton 
                            label={label}
                            onClick={() => onClick(quest._id)}
                        />
                    </div>  
                </div>
            </div>
        </>
    )
}

export default CancelQuestModal;
const BigBlackButton = ({ label, onClick, isDisabled }) => {
    return (
        <>
            <button
                className="bg-black text-gray-200 rounded-lg px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={onClick}
                disabled={isDisabled}
            >
                {label}
            </button>
        </>
    );
}

export default BigBlackButton;
const DangerButton = ({ label, type, onClick, disabled }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:cursor-not-allowed hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:hover:bg-red-400"
            >
                {label}
            </button>
        </>
    );
}

export default DangerButton;
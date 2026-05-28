const DangerButton = ({ label, buttonType, type, onClick, disabled }) => {
    return (
        <>
            <button
                type={buttonType}
                onClick={onClick}
                disabled={disabled}
                className={type === 'danger' ? `bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:cursor-not-allowed hover:bg-red-600 cursor-pointer disabled:opacity-50 disabled:hover:bg-red-400`
                    : `bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50 disabled:hover:bg-gray-300`}
            >
                {label}
            </button>
        </>
    );
}

export default DangerButton;
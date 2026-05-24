const DangerButton = ({ label, type, onClick }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
                {label}
            </button>
        </>
    );
}

export default DangerButton;
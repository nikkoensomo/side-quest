const RedButton = ({ type, label, onClick }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className="bg-red-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600"
            >
                {label}
            </button>
        </>
    )
}

export default RedButton;
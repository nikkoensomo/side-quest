const ViewCardButton = ({ type, label }) => {
    return (
        <>
            <button
                type={type}
                className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:ring items-center text-sm text-gray-700 font-medium cursor-pointer hover:bg-gray-200 transition-300"
            >
                {label}
            </button>
        </>
    )
}

export default ViewCardButton;
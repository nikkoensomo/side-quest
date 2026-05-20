const LogoutButton = ({ label, icon: Icon, type }) => {
    return (
        <>
            <button
                type={type}
                className="w-full flex text-gray-500 gap-3 bg-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-200"
            >
                {Icon && <Icon size={20}/>}
                <span className="text-sm font-medium">{label}</span>
            </button>
        </>
    )
}

export default LogoutButton;
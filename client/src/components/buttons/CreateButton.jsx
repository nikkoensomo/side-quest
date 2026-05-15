const CreateButton = ({
    label,
    onClick,
    type = 'button',
    variant = 'create',
    disabled = false,
    isLoading = false,
    icon: Icon = null,
}) => {
    const variants = {
        create: 'bg-black text-white hover:bg-gray-800',
        confirm: ''
    }

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled || isLoading}
                className={`px-4 py-2 rounded-lg cursor-pointer ${variants[variant]}`}
            >
                Create Quest
            </button>
        </>
    )
}

export default CreateButton;
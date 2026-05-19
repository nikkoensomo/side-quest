const ConfirmButton = ({ label, type, onClick, disabled }) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
                {label}
            </button>
        </>
    );
}

export default ConfirmButton;
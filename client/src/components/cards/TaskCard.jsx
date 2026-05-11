const TaskCard = ({ title, description, status }) => {
    const statusStyles = {
        'pending': 'bg-yellow-100 text-yellow-700',
        'in-progress': 'bg-blue-100 text-blue-700',
        'completed': 'bg-green-100 text-green-700'
    };

    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-4 shadow-sm hover:shadow-md transition-shadow duration-200">

                <div className="flex justify-between items-start mb-3">
                    <p className="font-semibold text-gray-800">{title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[status]}`}>
                        {status}
                    </span>
                </div>

                {description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
                )}

            </div>
        </>
    )
}

export default TaskCard;
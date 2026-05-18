const QuestCard = ({ 
    title, 
    description, 
    status, 
    postedBy,
    pickupLocation,
    deliveryLocation,
    reward
}) => {
    return (
        <>
            <div className="w-full bg-white px-4 py-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <p className="text-black font-semibold text-2xl">{title}</p>
                    <span className="text-gray-400 font-medium">{pickupLocation}</span>

                    <hr className="w-full border-gray-300"></hr>
                    <div className="flex justify-between gap-8">
                        <span className="text-black font-medium">{postedBy.username}</span>
                        <span className="text-black font-medium">{status}</span>
                    </div>

                    <span className="text-black font-medium">{reward}</span>
                </div>
            </div>
        </>
    );
}

export default QuestCard;
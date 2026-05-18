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
                    <p className="text-black font-semibold text-2xl">Title</p>
                    <span className="text-gray-400 font-medium">Pickup Location</span>

                    <hr></hr>
                    <div className="flex justify-between items-center">
                        <span className="text-black font-medium">Posted By</span>
                        <span className="text-black font-medium">Status</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestCard;
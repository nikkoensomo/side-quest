const QuestCard = ({ 
    title, 
    description, 
    status, 
    postedBy,
    location,
    reward
}) => {
    return (
        <>
            <div className="w-full bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <p className="text-black font-semibold text-2xl">Title</p>

                    
                </div>
            </div>
        </>
    );
}

export default QuestCard;
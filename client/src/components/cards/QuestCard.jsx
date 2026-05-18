import StatusBadge from "../badges/StatusBadge";

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
            <div className="w-full bg-white px-6 py-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col gap-4 justify-center">
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-zinc-900 font-semibold text-lg">{title}</span>
                            <p className="text-gray-500 font-medium text-xs">{description}</p>
                        </div>

                        <StatusBadge 
                            status={status}
                        />
                    </div>

                    <div className="w-full bg-amber-50 border border-amber-100 rounded-lg px-4 py-2">
                        <div className="flex flex-col">
                            <span className="text-amber-700 font-medium text-xs">Given Reward</span>
                            <span className="text-amber-950 font-semibold text-xl">{reward}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuestCard;
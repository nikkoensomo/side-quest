import QuestCard from "./QuestCard";

const QuestList = ({ quests }) => {
    if (!quests) return null;

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {quests.map((quest) => (
                    <QuestCard
                        key={quest._id}
                        title={quest.title}
                        description={quest.description}
                        status={quest.status}
                        postedBy={quest.postedBy}
                        pickupLocation={quest.locatio}
                        deliveryLocation={quest.deliveryLocation}
                        reward={quest.reward}
                    />
                ))}
            </div>
        </>
    )
}

export default QuestList;
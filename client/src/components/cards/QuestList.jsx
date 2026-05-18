import QuestCard from "./QuestCard";

const QuestList = ({ quests }) => {
    return (
        <>
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
        </>
    )
}

export default QuestList;
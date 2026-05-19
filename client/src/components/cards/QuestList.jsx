import QuestCard from "./QuestCard";

const QuestList = ({ quests, viewCard }) => {
    if (!quests) return null;

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {quests.map((quest) => (
                    <QuestCard
                        key={quest._id}
                        quest={quest}
                        viewCard={viewCard}
                    />
                ))}
            </div>
        </>
    )
}

export default QuestList;
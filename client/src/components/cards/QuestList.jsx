import QuestCard from "./QuestCard";

const QuestList = ({ quests, viewCard, onEdit, onDelete, isOwner }) => {
    if (!quests) return null;

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {quests.map((quest) => (
                    <QuestCard
                        key={quest._id}
                        quest={quest}
                        viewCard={viewCard}
                        variant={isOwner}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    )
}

export default QuestList;
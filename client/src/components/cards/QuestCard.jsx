import StatusBadge from "../badges/StatusBadge";
import ViewCardButton from "../buttons/ViewCardButton";
import BigBlackButton from "../buttons/BigBlackButton";
import DangerButton from "../buttons/DangerButton";

const QuestCard = ({
    quest,
    viewCard,
    variant,
    onEdit,
    onDelete
}) => {
    return (
        <>
            <div className="w-full bg-white px-6 py-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col gap-4 justify-center">
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-zinc-900 font-semibold text-lg">{quest.title}</span>
                            <p className="text-gray-500 font-medium text-xs">{quest.description}</p>
                        </div>

                        <StatusBadge
                            status={quest.status}
                        />
                    </div>

                    <div className="w-full flex justify-between bg-amber-50 border border-amber-100 rounded-lg px-4 py-2">
                        <div className="flex flex-col">
                            <span className="text-amber-700 font-medium text-xs">Given Reward</span>
                            <span className="text-amber-950 font-semibold text-xl">{quest.reward}</span>
                        </div>

                        <ViewCardButton
                            type='button'
                            label='View Card'
                            onClick={() => viewCard(quest)}
                        />

                    </div>

                    {variant === 'owner' ? (
                        <div className="w-full flex justify-between items-center">
                            <BigBlackButton
                                label='Edit'
                                onClick={() => onEdit(quest)}
                            />

                            <DangerButton
                                label='Delete'
                                type='button'
                                onClick={() => onDelete(quest)}
                            />
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default QuestCard;
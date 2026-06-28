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
    const formattedReward = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 0
    }).format(quest.reward);

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div className="flex h-full flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-zinc-950">
                            {quest.title}
                        </h2>

                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
                            {quest.description}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <StatusBadge status={quest.status} />
                    </div>
                </div>

                <div className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-500">
                            Pickup
                        </p>
                        <p className="mt-1 truncate text-sm font-medium text-zinc-900">
                            {quest.pickupLocation}
                        </p>
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-500">
                            Delivery
                        </p>
                        <p className="mt-1 truncate text-sm font-medium text-zinc-900">
                            {quest.deliveryLocation}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
                    <div>
                        <p className="text-xs font-medium text-amber-700">
                            Reward
                        </p>
                        <p className="mt-1 text-xl font-semibold text-amber-950">
                            {formattedReward}
                        </p>
                    </div>

                    <ViewCardButton
                        type="button"
                        label="View Quest"
                        onClick={() => viewCard(quest)}
                    />
                </div>

                {variant === 'owner' && (
                    <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
                        <BigBlackButton
                            label="Edit"
                            onClick={() => onEdit(quest)}
                        />

                        <DangerButton
                            label="Delete"
                            type="button"
                            onClick={() => onDelete(quest)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestCard;
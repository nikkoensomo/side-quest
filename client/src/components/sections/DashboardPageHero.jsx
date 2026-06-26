import CreateButton from "../buttons/CreateButton.jsx";

const DashboardPageHero = ({ questCount, onCreateQuest }) => {
    return (
        <section className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">
                    Dashboard
                </p>

                <h1 className="mt-1 text-2xl font-semibold text-zinc-950">
                    Available Quests
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Browse open quests from other users and accept the ones you want to complete.
                </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    {questCount} open {questCount === 1 ? 'quest' : 'quests'}
                </span>

                <CreateButton
                    label="Create Quest"
                    variant="create"
                    onClick={onCreateQuest}
                />
            </div>
        </section>
    );
};

export default DashboardPageHero;
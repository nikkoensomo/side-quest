import QuestsPageHero from "../components/sections/QuestsPageHero";
import TaskList from "../components/cards/TaskList";

const QuestsPage = () => {
    return (
        <>
            <main className="flex flex-col gap-6">
                <QuestsPageHero />
                <TaskList tasks={tasks} />
            </main>
        </>
    )
}

export default QuestsPage;
import { useEffect, useState } from 'react';
import QuestsPageHero from "../components/sections/QuestsPageHero";
import TaskList from "../components/cards/TaskList";
import { getUserTasksService } from '../services/taskService';

const QuestsPage = () => {
    const [userTask, setUserTask] = useState(null);

    useEffect(() => {
        async function fetchUserTask() {
            try {
                const task = await getUserTasksService();
                console.log(task);
                setUserTask(task);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserTask();
    }, [])

    return (
        <>
            <main className="flex flex-col gap-6">
                <QuestsPageHero />
                <TaskList tasks={userTask} />
            </main>
        </>
    )
}

export default QuestsPage;
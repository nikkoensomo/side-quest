import { useEffect, useState } from 'react';
import QuestsPageHero from "../components/sections/QuestsPageHero";
import TaskList from "../components/cards/TaskList";
import QuestList from '../components/cards/QuestList.jsx';
import QuestCard from '../components/cards/QuestCard.jsx';
import { getUserQuestService } from '../services/questService.js';

const QuestsPage = () => {
    const [userQuest, setUserQuest] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);

    const handleSelectedQuest = (userQuest) => {
        setSelectedQuest(userQuest);
    }

    useEffect(() => {
        async function fetchUserQuest() {
            try {
                const quest = await getUserQuestService();
                setUserQuest(quest);
                console.log(quest);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserQuest();
    }, [])

    return (
        <>
            <main className="flex flex-col gap-6">
                <QuestsPageHero />
                <QuestList 
                    quests={userQuest}
                    viewCard={handleSelectedQuest}
                />
            </main>
        </>
    )
}

export default QuestsPage;
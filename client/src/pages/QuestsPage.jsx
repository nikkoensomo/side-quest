import { useEffect, useState } from 'react';
import QuestsPageHero from "../components/sections/QuestsPageHero";
import QuestDetailsModal from '../components/modals/QuestDetailsModal.jsx';
import TaskList from "../components/cards/TaskList";
import QuestList from '../components/cards/QuestList.jsx';
import QuestCard from '../components/cards/QuestCard.jsx';
import { getUserQuestService, deleteQuestService } from '../services/questService.js';

const QuestsPage = () => {
    const [userQuest, setUserQuest] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const isOwner = selectedQuest?.postedBy?._id === userQuest?._id;

    const handleSelectedQuest = (userQuest) => {
        setSelectedQuest(userQuest);
    }

    const handleCloseQuestDetails = () => {
        setSelectedQuest(null);
    }

    const handleDeleteQuest = async (questId) => {
        try {
            setIsLoading(true);

            const deletedQuest = await deleteQuestService(questId);
            console.log('Deleted:', deletedQuest.title);

            setUserQuest((prevQuests) =>
                prevQuests.filter((quest) => quest._id !== questId)
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function fetchUserQuest() {
            try {
                const quest = await getUserQuestService();
                setUserQuest(quest);
                console.log(quest);
                console.log(isOwner);
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
                    onDelete={handleDeleteQuest}
                />

                <QuestDetailsModal
                    isOpen={!!userQuest}
                    onClose={handleCloseQuestDetails}
                    quest={selectedQuest}
                    isOwner={isOwner}
                />
            </main>
        </>
    )
}

export default QuestsPage;
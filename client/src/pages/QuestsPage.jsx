import { useEffect, useState } from 'react';
import QuestsPageHero from "../components/sections/QuestsPageHero";
import QuestDetailsModal from '../components/modals/QuestDetailsModal.jsx';
import EditQuestModal from '../components/modals/EditQuestModal.jsx';
import TaskList from "../components/cards/TaskList";
import QuestList from '../components/cards/QuestList.jsx';
import QuestCard from '../components/cards/QuestCard.jsx';
import { getUserQuestService, deleteQuestService } from '../services/questService.js';

const QuestsPage = () => {
    const [userQuest, setUserQuest] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMode, setModalMode] = useState(null);

    const isOwner = selectedQuest?.postedBy?._id === userQuest?._id;

    const handleOpenDetails = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    }

    const handleOpenEdit = (quest) => {
        setSelectedQuest(quest);
        setModalMode('edit');
    }

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setModalMode(null);
    }

    const handleUpdateQuest = (updatedQuest) => {
        setUserQuest((prevQuest) =>
            prevQuest.map((quest) => 
                quest._id === updatedQuest._id ? updatedQuest : quest
            )
        );

        setSelectedQuest(null);
        setModalMode(null);
    }

    console.log('selected quest: ', selectedQuest);

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
    }, []);

    return (
        <>
            <main className="flex flex-col gap-6">
                <QuestsPageHero />
                <QuestList
                    quests={userQuest}
                    onDelete={handleDeleteQuest}
                    viewCard={handleOpenDetails}
                    isOwner='owner'
                    onEdit={handleOpenEdit}
                />

                <QuestDetailsModal
                    isOpen={modalMode === 'details'}
                    onClose={handleCloseModal}
                    quest={selectedQuest}
                    isOwner={isOwner}
                />

                <EditQuestModal
                    isOpen={modalMode === 'edit'}
                    onClose={handleUpdateQuest}
                    quest={selectedQuest}
                />
            </main>
        </>
    )
}

export default QuestsPage;
import { useEffect, useState } from 'react';
import QuestsPageHero from "../components/sections/QuestsPageHero";
import QuestDetailsModal from '../components/modals/QuestDetailsModal.jsx';
import DangerModal from '../components/modals/DangerModal.jsx';
import EditQuestModal from '../components/modals/EditQuestModal.jsx';
import TaskList from "../components/cards/TaskList";
import QuestList from '../components/cards/QuestList.jsx';
import QuestCard from '../components/cards/QuestCard.jsx';
import { getUserQuestService, deleteQuestService } from '../services/questService.js';

const PostedQuestsPage = () => {
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

    const handleOpenDanger = (quest) => {
        setSelectedQuest(quest);
        setModalMode('delete');
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

            handleCloseModal();
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
            <QuestList
                quests={userQuest}
                onDelete={handleOpenDanger}
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
                onClose={handleCloseModal}
                onSuccess={handleUpdateQuest}
                quest={selectedQuest}
            />

            <DangerModal
                type='delete'
                isOpen={modalMode === 'delete'}
                quest={selectedQuest}
                onClose={handleCloseModal}
                onDelete={handleDeleteQuest}
                isLoading={isLoading}
            />
        </>
    )
}

export default PostedQuestsPage;
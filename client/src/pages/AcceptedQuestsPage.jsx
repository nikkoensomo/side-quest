import { useEffect, useState } from 'react';
import { getUserTakenQuestsService, completeQuestService, cancelAcceptedQuestService } from '../services/questService';
import QuestList from '../components/cards/QuestList';
import QuestDetailsModal from '../components/modals/QuestDetailsModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import CancelQuestModal from '../components/modals/CancelQuestModal';
import useDocumentTitle from '../hooks/useDocumentTitle.js';


const AcceptedQuestsPage = () => {
    useDocumentTitle('Accepted Quests - SideQuest');

    const [takenQuests, setTakenQuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);

    const isOwner = false;

    const handleOpenDetails = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    }

    const handleCompleteModal = (quest) => {
        setSelectedQuest(quest);
        setModalMode('complete');
    }

    const handleCancelModal = (quest) => {
        setSelectedQuest(quest);
        setModalMode('cancel');
    }

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setModalMode(null);
    }

    const handleCompleteQuest = async (questId) => {
        try {
            setIsLoading(true);

            const completedQuest = await completeQuestService(questId);
            console.log(completedQuest);

            handleCloseModal();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancelQuest = async (questId) => {
        try {
            setIsLoading(true);

            const cancelledQuest = await cancelAcceptedQuestService(questId);

            console.log(cancelledQuest);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        async function getTakenQuests() {
            try {
                setIsLoading(true);
                const quest = await getUserTakenQuestsService();

                console.log(quest);
                setTakenQuests(quest);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        getTakenQuests();
    }, []);

    return (
        <>
            <QuestList
                quests={takenQuests}
                viewCard={handleOpenDetails}
                isOwner={isOwner}
            />

            <QuestDetailsModal
                isOpen={modalMode === 'details'}
                onClose={handleCloseModal}
                onComplete={handleCompleteModal}
                onCancel={handleCancelModal}
                quest={selectedQuest}
                isLoading={isLoading}
                isOwner={isOwner}
            />

            <ConfirmationModal
                isOpen={modalMode === 'complete'}
                onClose={handleCloseModal}
                onClick={handleCompleteQuest}
                text="Are you sure you want to complete this quest?"
                label="Complete"
                quest={selectedQuest}
                isLoading={isLoading}
            />

            <CancelQuestModal
                isOpen={modalMode === 'cancel'}
                onClose={handleCloseModal}
                onClick={handleCancelQuest}
                text="Are you sure you want to cancel this quest?"
                label="Cancel Quest"
                quest={selectedQuest}
                isLoading={isLoading}
            />
        </>
    );
}

export default AcceptedQuestsPage;
import { useEffect, useState } from 'react';
import { getUserCancelledQuestsService, cancelAcceptedQuestService } from '../services/questService';
import QuestList from '../components/cards/QuestList';
import QuestDetailsModal from '../components/modals/QuestDetailsModal';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const CancelledQuestsPage = () => {
    useDocumentTitle('Cancelled Quests - SideQuest');

    const [cancelledQuests, setCancelledQuests] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMode, setModalMode] = useState(null);

    const handleOpenDetails = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    }

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setModalMode(null);
    }

    useEffect(() => {
        async function displayCancelledQuests() {
            try {
                setIsLoading(true);

                const quests = await getUserCancelledQuestsService();

                console.log(quests);
                setCancelledQuests(quests);
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false);
            }
        }

        displayCancelledQuests();
    }, []);

    return (
        <>
            <QuestList 
                quests={cancelledQuests}
                viewCard={handleOpenDetails}
            />

            <QuestDetailsModal 
                isOpen={modalMode === 'details'}
                onClose={handleCloseModal}
                quest={selectedQuest}

            />
        </> 
    )
}

export default CancelledQuestsPage;
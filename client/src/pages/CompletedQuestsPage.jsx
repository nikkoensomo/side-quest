import { useState, useEffect } from 'react';
import { getUserCompletedQuestsService } from '../services/questService';
import QuestList from '../components/cards/QuestList';
import QuestDetailsModal from '../components/modals/QuestDetailsModal';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const CompletedQuestsPage = () => {
    useDocumentTitle('Completed Quests - SideQuest');

    const [isLoading, setIsLoading] = useState(false);
    const [completedQuests, setCompletedQuests] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [modalMode, setModalMode] = useState(null);

    const handleDetailsModal = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    }

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setModalMode(null);
    }

    useEffect(() => {
        async function getCompletedQuests() {
            try {
                const quests = await getUserCompletedQuestsService();
                console.log(quests);
                setCompletedQuests(quests);
            } catch (error) {
                console.log(error);
            }
        }

        getCompletedQuests();
    }, []);
    

    return (
        <>
            <QuestList 
                quests={completedQuests}
                viewCard={handleDetailsModal}

            />

            <QuestDetailsModal 
                isOpen={modalMode === 'details'}
                onClose={handleCloseModal}
                quest={selectedQuest}
            />
        </>
    )
}

export default CompletedQuestsPage;
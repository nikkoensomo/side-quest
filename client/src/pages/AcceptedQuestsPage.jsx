import { useEffect, useState } from 'react';
import { getUserTakenQuestsService } from '../services/questService';
import QuestList from '../components/cards/QuestList';
import QuestDetailsModal from '../components/modals/QuestDetailsModal';


const AcceptedQuestsPage = () => {
    const [takenQuests, setTakenQuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);

    const isOwner = false;

    const handleOpenDetails = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    }

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setModalMode(null);
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
                quest={selectedQuest}
                isLoading={isLoading}
                isOwner={isOwner}
            />
        </>
    );
}

export default AcceptedQuestsPage;
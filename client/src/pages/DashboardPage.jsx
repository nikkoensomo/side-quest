import { useState, useEffect } from 'react';
import { getAllQuestsService } from '../services/questService.js';

import DashboardPageHero from "../components/sections/DashboardPageHero";
import CreateButton from "../components/buttons/CreateButton.jsx";
import CreateQuestModal from '../components/modals/CreateQuestModal.jsx';
import QuestDetailsModal from '../components/modals/QuestDetailsModal.jsx';
import QuestList from '../components/cards/QuestList.jsx';

const DashboardPage = () => {
    const [isCreateQuestModalOpen, setIsCreateQuestModalOpen] = useState(false);
    const [isQuestDetailsModalOpen, setIsQuestDetailsModalOpen] = useState(false);

    const [quests, setQuests] = useState([]);
    const [selectedQuest, setSelectedQuest] = useState(null);

    const handleCreateQuest = () => {
        setIsCreateQuestModalOpen(true);
    }

    const handleOpenQuestDetails = (quest) => {
        setSelectedQuest(quest);
    }

    const handleCloseQuestDetails = () => {
        setSelectedQuest(null);
    }

    useEffect(() => {
        async function fetchAllQuests() {
            try {
                const quests = await getAllQuestsService();
                console.log(quests);
                setQuests(quests);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAllQuests();
    }, [])

    return (
        <>
            <main className="flex flex-col gap-6">
                <div className="flex justify-end gap-4">
                    <CreateButton
                        label="Create Quest"
                        variant="create"
                        onClick={handleCreateQuest}
                    />
                </div>
                <DashboardPageHero />

                <QuestList
                    quests={quests}
                    viewCard={handleOpenQuestDetails}
                />

                <CreateQuestModal
                    isOpen={isCreateQuestModalOpen}
                    onClose={(() => setIsCreateQuestModalOpen(false))}
                />

                <QuestDetailsModal 
                    isOpen={!!selectedQuest}
                    quest={selectedQuest}
                    onClose={handleCloseQuestDetails}
                />
            </main>

        </>
    );
}

export default DashboardPage;
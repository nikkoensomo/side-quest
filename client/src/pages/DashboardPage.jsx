import { useState, useEffect } from 'react';
import { getAllQuestsService } from '../services/questService.js';

import DashboardPageHero from "../components/sections/DashboardPageHero";
import CreateButton from "../components/buttons/CreateButton.jsx";
import CreateQuestModal from '../components/modals/CreateQuestModal.jsx';
import QuestList from '../components/cards/QuestList.jsx';

const DashboardPage = () => {
    const [isCreateQuestModalOpen, setIsCreateQuestModalOpen] = useState(false);
    const [quests, setQuests] = useState([]);

    const handleCreateQuest = () => {
        setIsCreateQuestModalOpen(true);
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
                />

                <CreateQuestModal
                    isOpen={isCreateQuestModalOpen}
                    onClose={(() => setIsCreateQuestModalOpen(false))}
                />
            </main>

        </>
    );
}

export default DashboardPage;
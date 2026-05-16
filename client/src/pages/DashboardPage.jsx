import { useState } from 'react';

import DashboardPageHero from "../components/sections/DashboardPageHero";
import CreateButton from "../components/buttons/CreateButton.jsx";
import CreateQuestModal from '../components/modals/CreateQuestModal.jsx'

const DashboardPage = () => {
    const [isCreateQuestModalOpen, setIsCreateQuestModalOpen] = useState(false);

    const handleCreateQuest = () => {
        setIsCreateQuestModalOpen(true);
    }

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
                <DashboardPageHero/>

                <CreateQuestModal 
                    isOpen={isCreateQuestModalOpen}
                    onClose={(() => setIsCreateQuestModalOpen(false))}
                />
            </main>
            
        </>
    );
}

export default DashboardPage;
import { useState, useEffect } from 'react';
import { getAllQuestsService, acceptQuestService } from '../services/questService.js';
import { getLoggedInUser } from '../services/userService.js';

import DashboardPageHero from "../components/sections/DashboardPageHero";
import CreateButton from "../components/buttons/CreateButton.jsx";
import CreateQuestModal from '../components/modals/CreateQuestModal.jsx';
import QuestDetailsModal from '../components/modals/QuestDetailsModal.jsx';
import DangerModal from '../components/modals/DangerModal.jsx';
import QuestList from '../components/cards/QuestList.jsx';
import QuestsPage from './QuestsPage.jsx';

const DashboardPage = () => {
    const [isCreateQuestModalOpen, setIsCreateQuestModalOpen] = useState(false);

    const [quests, setQuests] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [modalMode, setModalMode] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isOwner = selectedQuest?.postedBy?._id === user?._id;

    const handleCreateQuest = () => {
        setModalMode('create');
    }

    const handleOpenQuestDetails = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    }

    const handleConfirmModal = (quest) => {
        setSelectedQuest(quest);
        setIsConfirmModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setIsConfirmModalOpen(false);
        setModalMode(null);
    }

    const handleAcceptQuest = async (questId) => {
        try {
            setIsLoading(true);

            await acceptQuestService(questId);

            // updates the frontend immediately after accepting
            setQuests((prevQuests) =>
                prevQuests.filter((quest) => quest._id !== questId)
            );

            handleCloseModal();
        } catch (error) {
            console.log(error.response?.data || error);
        } finally {
            setIsLoading(false);
        }
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

    useEffect(() => {
        async function fetchLoggedUser() {
            try {
                const user = await getLoggedInUser();
                setUser(user);
                console.log('user:', user);
                console.log('user id:', user._id);
            } catch (error) {
                console.log(error);
            }   
        }

        fetchLoggedUser();
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
                    isOwner='public'
                />

                <CreateQuestModal
                    isOpen={modalMode === 'create'}
                    onClose={handleCloseModal}
                />

                <QuestDetailsModal
                    isOpen={modalMode === 'details'}
                    quest={selectedQuest}
                    onClose={handleCloseModal}
                    onAccept={handleConfirmModal}
                    isLoading={isLoading}
                    isDisabled={isOwner}
                    disableOutsideClose={isConfirmModalOpen}
                />

                <DangerModal 
                    buttonType='button'
                    type='confirm'
                    isOpen={isConfirmModalOpen}
                    quest={selectedQuest}
                    onClose={handleCloseModal}
                    onConfirm={handleAcceptQuest}
                    isLoading={isLoading}
                />
            </main>

        </>
    );
}

export default DashboardPage;
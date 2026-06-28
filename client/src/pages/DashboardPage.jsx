import { useState, useEffect } from 'react';
import { getAllQuestsService, acceptQuestService } from '../services/questService.js';
import { getLoggedInUser } from '../services/userService.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

import DashboardPageHero from "../components/sections/DashboardPageHero";
import CreateButton from "../components/buttons/CreateButton.jsx";
import CreateQuestModal from '../components/modals/CreateQuestModal.jsx';
import QuestDetailsModal from '../components/modals/QuestDetailsModal.jsx';
import DangerModal from '../components/modals/DangerModal.jsx';
import QuestList from '../components/cards/QuestList.jsx';

const DashboardPage = () => {
    useDocumentTitle('Dashboard - SideQuest');

    const [quests, setQuests] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);

    const [modalMode, setModalMode] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [error, setError] = useState('');

    const isOwner = selectedQuest?.postedBy?._id === user?._id;

    const handleCreateQuest = () => {
        setModalMode('create');
    };

    const handleOpenQuestDetails = (quest) => {
        setSelectedQuest(quest);
        setModalMode('details');
    };

    const handleConfirmModal = (quest) => {
        setSelectedQuest(quest);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    const handleCloseModal = () => {
        setSelectedQuest(null);
        setIsConfirmModalOpen(false);
        setModalMode(null);
    };

    const fetchDashboardData = async () => {
        try {
            setIsPageLoading(true);
            setError('');

            const [quests, user] = await Promise.all([
                getAllQuestsService(),
                getLoggedInUser()
            ]);

            setQuests(quests);
            setUser(user);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to load dashboard.');
        } finally {
            setIsPageLoading(false);
        }
    };

    const handleAcceptQuest = async (questId) => {
        try {
            setIsLoading(true);

            await acceptQuestService(questId);

            setQuests((prevQuests) =>
                prevQuests.filter((quest) => quest._id !== questId)
            );

            handleCloseModal();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to accept quest.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <main className="flex flex-col gap-6">
            <DashboardPageHero
                questCount={quests.length}
                onCreateQuest={handleCreateQuest}
            />

            {isPageLoading && (
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">
                    Loading available quests...
                </div>
            )}

            {!isPageLoading && error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            {!isPageLoading && !error && quests.length === 0 && (
                <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                    <h2 className="text-lg font-semibold text-zinc-950">
                        No available quests right now
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Check back later or create a quest for others to take.
                    </p>

                    <button
                        type="button"
                        onClick={handleCreateQuest}
                        className="mt-5 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                        Create Quest
                    </button>
                </div>
            )}

            {!isPageLoading && !error && quests.length > 0 && (
                <QuestList
                    quests={quests}
                    viewCard={handleOpenQuestDetails}
                    isOwner="public"
                />
            )}

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
                buttonType="button"
                type="confirm"
                isOpen={isConfirmModalOpen}
                quest={selectedQuest}
                onClose={handleCloseConfirmModal}
                onConfirm={handleAcceptQuest}
                isLoading={isLoading}
            />
        </main>
    );
};

export default DashboardPage;
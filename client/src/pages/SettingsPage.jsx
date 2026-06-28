import { useState, useEffect } from 'react';
import { getLoggedInUser } from '../services/userService';

import SettingsPageHero from "../components/sections/SettingsPageHero";
import RedButton from "../components/buttons/RedButton";
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const SettingsPage = () => {
    useDocumentTitle('Settings - SideQuest');

    const [modalMode, setModalMode] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const handleDeleteModal = () => {
        setModalMode('delete-account');
    };

    useEffect(() => {
        async function getLoggedInAccount() {
            try {
                const currentUser = await getLoggedInUser();
                setCurrentUser(currentUser);
            } catch (error) {
                console.log(error.response?.data || error);
            }
        }

        getLoggedInAccount();
    }, []);

    return (
        <main className="flex flex-col gap-6">
            <SettingsPageHero />

            <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-zinc-950">
                        Account Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Basic details connected to your SideQuest account.
                    </p>
                </div>

                <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
                    <div>
                        <p className="text-xs font-medium uppercase text-gray-400">
                            Username
                        </p>
                        <p className="mt-1 text-sm font-medium text-zinc-950">
                            {currentUser?.username || 'Loading...'}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase text-gray-400">
                            Email
                        </p>
                        <p className="mt-1 text-sm font-medium text-zinc-950">
                            {currentUser?.email || 'Loading...'}
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-lg border border-red-200 bg-white shadow-sm">
                <div className="border-b border-red-100 px-6 py-5">
                    <h2 className="text-lg font-semibold text-red-700">
                        Danger Zone
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Permanent account actions should be handled carefully.
                    </p>
                </div>

                <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-950">
                            Delete account
                        </h3>
                        <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                            This will permanently remove your account and may affect your quests and activity history.
                        </p>
                    </div>

                    <RedButton
                        type="button"
                        label="Delete Account"
                        onClick={handleDeleteModal}
                    />
                </div>
            </section>
        </main>
    );
};

export default SettingsPage;
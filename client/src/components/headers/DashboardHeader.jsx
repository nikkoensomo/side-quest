import { useEffect, useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { getLoggedInUser } from '../../services/userService';

const DashboardHeader = ({ onOpenSidebar }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getLoggedInUser();
                setUser(data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to load user.');
            }
        }

        fetchUser();
    }, []);

    const initial = user?.username?.charAt(0).toUpperCase() || 'U';

    return (
        <header className="w-full border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {onOpenSidebar && (
                        <button
                            type="button"
                            onClick={onOpenSidebar}
                            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-zinc-950"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    <div>
                        <h1 className="text-sm font-semibold text-zinc-950">
                            SideQuest Dashboard
                        </h1>
                        <p className="text-xs text-gray-500">
                            Manage quests, activity, and account actions.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-zinc-950"
                    >
                        <Bell size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                            {initial}
                        </div>

                        <div className="hidden flex-col sm:flex">
                            {user ? (
                                <>
                                    <span className="text-sm font-semibold text-zinc-950">
                                        {user.username}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Signed in
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm font-semibold text-zinc-950">
                                        {error ? 'Unavailable' : 'Loading...'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {error || 'Fetching profile'}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
import { NavLink, Outlet } from 'react-router-dom';
import QuestsPageHero from '../components/sections/QuestsPageHero';

const QuestsLayout = () => {
    const tabs = [
        { label: 'Posted', to: '/dashboard-page/quests-page/posted' },
        { label: 'Taken', to: '/dashboard-page/quests-page/taken' },
        { label: 'Cancelled', to: '/dashboard-page/quests-page/cancelled' },
        { label: 'Completed', to: '/dashboard-page/quests-page/completed' }
    ];

    return (
        <main className="flex flex-col gap-6">
            <QuestsPageHero />

            <section className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-5">
                    <nav className="flex gap-6 overflow-x-auto">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.label}
                                to={tab.to}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'whitespace-nowrap border-b-2 border-zinc-950 px-1 py-4 text-sm font-semibold text-zinc-950'
                                        : 'whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-zinc-950'
                                }
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div className="p-5">
                    <Outlet />
                </div>
            </section>
        </main>
    );
};

export default QuestsLayout;
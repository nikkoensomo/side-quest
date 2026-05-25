import { NavLink, Outlet } from 'react-router-dom';
import QuestsPageHero from '../components/sections/QuestsPageHero';

const QuestsLayout = () => {
    const tabs = [
        {label: 'Posted', to: '/dashboard/quests/posted'},
        {label: 'Accepted', to: '/dashboard/quests/accepted'},
        {label: 'Cancelled', to: '/dashboard/quests/cancelled'}
    ];

    return (
        <>
            <main className="flex flex-col gap-6">
                <QuestsPageHero />

                <div className="border-b border-gray-200">
                    <div className="flex gap-6">
                        {tabs.map((tab) => (
                            <NavLink
                                key={tab.label}
                                to={tab.to}
                                className={({ isActive }) => 
                                    isActive
                                    ? 'border-b-2 border-zinc-900 px-1 py-3 text-sm font-medium text-zinc-900'
                                    : 'border-b-2 border-transparent px-1 py-3 text-sm font-medium text-gray-500 hover:text-zinc-900'
                                }
                            >
                                {tab.label}
                            </NavLink>
                        ))}
                    </div>
                </div>

                <Outlet />
            </main>
        </>
    )
}

export default QuestsLayout;
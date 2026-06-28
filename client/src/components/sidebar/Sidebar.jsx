import {
    LayoutDashboard,
    CheckSquare,
    Settings,
    User,
    LogOutIcon,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import SidebarNavItem from "./SidebarNavItem";
import LogoutButton from "../buttons/LogoutButton";
import LogoutConfirmationModal from "../modals/LogoutConfirmationModal";

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard-page', end: true },
    { label: 'Quests', icon: CheckSquare, to: '/dashboard-page/quests-page' },
    { label: 'Settings', icon: Settings, to: '/dashboard-page/settings-page' },
    { label: 'User', icon: User, to: '/dashboard-page/user-page' },
];

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const [modalMode, setModalMode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenModal = () => {
        setModalMode('logout');
    };

    const handleCloseModal = () => {
        setModalMode(null);
    };

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 400));
            
            localStorage.removeItem('token');
            handleCloseModal();
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <aside className="h-screen w-64 shrink-0 border-r border-gray-200 bg-white px-4 py-5">
                <div className="flex h-full flex-col">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="px-2">
                            <span className="text-xl font-bold text-zinc-950">
                                SideQuest
                            </span>
                            <p className="mt-1 text-xs font-medium text-gray-400">
                                Quest dashboard
                            </p>
                        </div>

                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-zinc-950"
                            >
                                <ArrowLeft size={18} />
                            </button>
                        )}
                    </div>

                    <nav className="flex flex-1 flex-col justify-between">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <SidebarNavItem
                                    key={item.label}
                                    label={item.label}
                                    icon={item.icon}
                                    to={item.to}
                                    end={item.end}
                                />
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <LogoutButton
                                label="Logout"
                                icon={LogOutIcon}
                                type="button"
                                onClick={handleOpenModal}
                            />
                        </div>
                    </nav>
                </div>
            </aside>

            <LogoutConfirmationModal
                isOpen={modalMode === 'logout'}
                text="Are you sure you want to logout?"
                label="Logout"
                onClick={handleLogout}
                onClose={handleCloseModal}
                isLoading={isLoading}
            />
        </>
    );
};

export default Sidebar;
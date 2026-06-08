import { LayoutDashboard, CheckSquare, Settings, User, LogOutIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import SidebarNavItem from "./SidebarNavItem";
import LogoutButton from "../buttons/LogoutButton";
import LogoutConfirmationModal from "../modals/LogoutConfirmationModal";
import ConfirmationModal from "../modals/ConfirmationModal";

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard-page' },
    { label: 'Quests', icon: CheckSquare, to: '/dashboard-page/quests-page' },
    { label: 'Settings', icon: Settings, to: '/settings-page' },
    { label: 'User', icon: User, to: '/user-page' },
];

const Sidebar = () => {
    const navigate = useNavigate();

    const [modalMode, setModalMode] = useState(null);

    const handleOpenModal = () => {
        setModalMode('logout');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <aside className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col px-4 py-6">
                <div className="w-full flex justify-between items-center mb-4">
                    <span className="text-black text-2xl font-bold px-4">SideQuest</span>
                    <button
                        className="rounded-md p-1 hover:bg-gray-300"
                    >
                        <ArrowLeft
                            className="cursor-pointer"
                            size={20}
                        />
                    </button>
                </div>


                <nav className="flex flex-1 flex-col justify-between">
                    <div className="w-full flex flex-col gap-1">
                        {navItems.map((item) => (
                            <SidebarNavItem
                                key={item.label}
                                label={item.label}
                                icon={item.icon}
                                to={item.to}
                            />
                        ))}
                    </div>

                    <LogoutButton
                        label='Logout'
                        icon={LogOutIcon}
                        type='button'
                        onClick={handleOpenModal}
                    />
                </nav>
            </aside>

            <LogoutConfirmationModal
                isOpen={modalMode === 'logout'}
                text='Are you sure you want to logout?'
                label='Logout'
                onClick={handleLogout}
            />
        </>
    )
}

export default Sidebar;
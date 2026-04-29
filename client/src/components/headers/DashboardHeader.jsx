import { Bell } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <>
            <header className="w-full bg-white px-6 py-4 flex flex-row justify-center items-center">
                <span className="text-black text-2xl font-bold">SideQuest</span>
                <div className="flex gap-6">
                    <Bell size={24}/>
                </div>
            </header>
        </>
    );
}

export default DashboardHeader;
import { Bell } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <>
            <header className="w-full bg-white px-6 py-4 flex flex-row justify-between items-center">
                <span className="text-black text-2xl font-bold">SideQuest</span>
                <div className="flex gap-6">
                    <Bell size={24}/>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">James Ian Dayuno</span>
                    </div>
                </div>
            </header>
        </>
    );
}

export default DashboardHeader;
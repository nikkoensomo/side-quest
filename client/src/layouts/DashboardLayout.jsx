import Sidebar from "../components/sidebar/Sidebar";
import DashboardHeader from "../components/headers/DashboardHeader";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <div className="flex h-screen">
                <Sidebar/>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <DashboardHeader/>
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;
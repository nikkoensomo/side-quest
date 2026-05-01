import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { getLoggedInUser } from '../../services/userService';

const DashboardHeader = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getLoggedInUser();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();
    }, [])

    return (
        <>
            <header className="w-full bg-white px-6 py-4 flex flex-row justify-between items-center border-b border-gray-200">
                <div className="flex gap-6">
                    <Bell size={24} />
                    <div className="flex flex-col">
                        {user ? (
                            <span className="text-sm font-medium">{user.username}</span>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}

export default DashboardHeader;
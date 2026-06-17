import { useState, useEffect } from 'react';
import { getLoggedInUser } from '../services/userService';
import SettingsPageHero from "../components/sections/SettingsPageHero";
import RedButton from "../components/buttons/RedButton";

const SettingsPage = () => {
    const [modalMode, setModalMode] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
 
    const handleDeleteModal = () => {

    }

    useEffect(() => {
        async function getLoggedInAccount() {
            try {
                const currentUser = await getLoggedInUser();

                console.log(currentUser);
            } catch (error) {
                console.log(error);
            }
        }

        getLoggedInAccount();
    }, []);

    return (
        <>
            <SettingsPageHero />
            <main className="w-full flex flex-col gap-4 items-start justify-center">
                <span>settings page yeah!</span>
                <RedButton 
                    type="button"
                    label="Delete Account"
                    
                />
            </main>
        </>
    )
}

export default SettingsPage;
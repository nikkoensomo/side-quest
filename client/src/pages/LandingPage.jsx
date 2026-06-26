import { useState } from 'react';

import LandingPageHeader from "../components/headers/LandingPageHeader";
import LandingPageHero from "../components/sections/LandingPageHero";
import SignUpModal from "../components/modals/SignUpModal";
import LoginModal from '../components/modals/LoginModal';

const LandingPage = () => {
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    function handleRegistration() {
        setIsRegistrationModalOpen(true);
    }

    function handleLogin() {
        setIsLoginModalOpen(true);
    }

    return (
        <>
            <LandingPageHeader
                onGetStarted={handleRegistration}
                onLogin={handleLogin}
            />

            <main className="min-h-screen bg-gray-50">
                <LandingPageHero
                    onGetStarted={handleRegistration}
                    onLogin={handleLogin}
                />
            </main>

            <SignUpModal
                isOpen={isRegistrationModalOpen}
                onClose={() => setIsRegistrationModalOpen(false)}
            />

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
};

export default LandingPage;
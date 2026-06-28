import { useState } from 'react';

import LandingPageHeader from "../components/headers/LandingPageHeader";
import LandingPageHero from "../components/sections/LandingPageHero";
import SignUpModal from "../components/modals/SignUpModal";
import LoginModal from '../components/modals/LoginModal';

const LandingPage = () => {
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);

    const handleLoginModal = () => {
        setModalMode('login');
    }

    const handleRegistrationModal = () => {
        setModalMode('register');
    }

    const handleCloseModal = () => {
        setModalMode(null);
    }

    return (
        <>
            <LandingPageHeader
                onGetStarted={handleRegistrationModal}
                onLogin={handleLoginModal}
            />

            <main className="min-h-screen bg-gray-50">
                <LandingPageHero
                    onGetStarted={handleRegistrationModal}
                    onLogin={modalMode === 'login'}
                />
            </main>

            <SignUpModal
                isOpen={modalMode === 'register'}
                onClose={handleCloseModal}
            />

            <LoginModal
                isOpen={modalMode === 'login'}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default LandingPage;
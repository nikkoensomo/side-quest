import LandingPageHeader from "../components/headers/LandingPageHeader";
import ContactUsPageHero from "../components/sections/ContactUsPageHero";
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const ContactUsPage = () => {
    useDocumentTitle('Contact Us - SideQuest');

    return (
        <>
            <LandingPageHeader/>
            <main>
                <ContactUsPageHero/>
            </main>
        </>
    );
}

export default ContactUsPage;
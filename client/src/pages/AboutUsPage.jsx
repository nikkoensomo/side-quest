import LandingPageHeader from "../components/headers/LandingPageHeader";
import AboutUsPageHero from "../components/sections/AboutUsPageHero";
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const AboutUsPage = () => {
    useDocumentTitle('About Us - SideQuest');

    return(
        <>
            <LandingPageHeader/>
            <main>
                <AboutUsPageHero/>
            </main>
        </>
    );
}

export default AboutUsPage;
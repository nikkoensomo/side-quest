import DashboardHeader from "../components/headers/DashboardHeader";
import DashboardPageHero from "../components/sections/DashboardPageHero";

const DashboardPage = () => {
    return (
        <>
            <DashboardHeader/>
            <main>
                <DashboardPageHero/>
            </main>
        </>
    );
}

export default DashboardPage;
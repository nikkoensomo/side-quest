import SettingsPageHero from "../components/sections/SettingsPageHero";
import RedButton from "../components/buttons/RedButton";

const SettingsPage = () => {
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
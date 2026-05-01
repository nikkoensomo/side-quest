import { Link, NavLink } from 'react-router-dom'

import LoginButton from "../buttons/LoginButton"
import GetStartedButton from "../buttons/GetStartedButton"

const LandingPageHeader = ({ onGetStarted, onLogin }) => {
    return(
        <>
            <header className="w-full bg-white px-6 py-4 flex flex-row justify-between items-center border-b border-gray-200">
                <span className="text-black text-2xl font-bold">SideQuest</span>
                <nav className="flex gap-6">
                    <NavLink
                        to="/landing-page"
                        className="text-black hover:text-gray-300"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about-us-page"
                        className="text-black hover:text-gray-300"
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact-us-page"
                        className="text-black hover:text-gray-300"
                    >
                        Contact Us
                    </NavLink>
                </nav>
                <div className="flex gap-4">
                    <LoginButton
                        onClick={onLogin}
                    />
                    <GetStartedButton
                        onClick={onGetStarted}
                    />
                </div>
            </header>
        </>
    );
}

export default LandingPageHeader;
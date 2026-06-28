import { NavLink } from 'react-router-dom';

import LoginButton from "../buttons/LoginButton";
import GetStartedButton from "../buttons/GetStartedButton";

const LandingPageHeader = ({ onGetStarted, onLogin }) => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="mx-auto w-full flex items-center justify-between px-12 py-4">
                <span className="text-xl font-bold text-zinc-950">SideQuest</span>

                <nav className="hidden gap-6 text-sm font-medium text-gray-600 md:flex">
                    <NavLink to="/" className="hover:text-zinc-950">
                        Home
                    </NavLink>

                    <NavLink to="/about-us-page" className="hover:text-zinc-950">
                        About Us
                    </NavLink>

                    <NavLink to="/contact-us-page" className="hover:text-zinc-950">
                        Contact Us
                    </NavLink>
                </nav>

                <div className="flex gap-3">
                    <LoginButton onClick={onLogin} />
                    <GetStartedButton onClick={onGetStarted} />
                </div>
            </div>
        </header>
    );
};

export default LandingPageHeader;
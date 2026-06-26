import { NavLink } from 'react-router-dom';

const SidebarNavItem = ({ label, icon: Icon, to, end = false }) => {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                        ? 'bg-zinc-950 text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-zinc-950'
                }`
            }
        >
            {Icon && <Icon className="h-5 w-5 shrink-0" />}
            <span>{label}</span>
        </NavLink>
    );
};

export default SidebarNavItem;
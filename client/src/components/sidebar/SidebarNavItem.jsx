import { NavLink } from 'react-router-dom';

const SidebarNavItem = ({ label, icon: Icon, to }) => {
    
    return (
        <>
            <NavLink
                to={to}
                className={({isActive}) => 
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 
                    ${isActive ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`
                }            
            >
                {Icon && <Icon size={20}/>}
                <span className="text-sm font-medium">{label}</span>
            </NavLink>
        </>
    )
}

export const SidebarNavItem;
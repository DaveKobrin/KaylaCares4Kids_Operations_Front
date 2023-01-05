import { NavLink } from "react-router-dom"
import { MenuItems } from "."

const Dropdown = ({submenus, dropdown, depthLevel}) => {
    // console.log({location: 'dropdown.jsx', depthLevel: depthLevel})
    depthLevel++;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown?'show':''}`}>
            {submenus.map((submenu, idx) => (
                <MenuItems items={submenu} depthLevel={depthLevel} key={idx} />
            ))}
        </ul>
    )
}

export default Dropdown
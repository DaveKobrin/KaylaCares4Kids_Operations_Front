import './Navbar.css';
import { menuItems } from "../menuItems";
import { MenuItems } from ".";
import { NavBarButtons } from "."

const Navbar = () => {
    return (
        <nav>
            <ul className="menus">
                {menuItems.map((menu,idx) => {
                    const depthLevel = 0;
                    return < MenuItems key={idx} items={menu} depthLevel={depthLevel} />    
                })}
                <NavBarButtons className="nav-right" />
            </ul>
        </nav>
    );
};

export default Navbar;
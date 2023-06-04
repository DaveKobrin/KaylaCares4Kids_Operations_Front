import './Navbar.css';
import { menuItemsOps } from "../menuItems";
import { MenuItems } from ".";
import { NavBarButtons } from "."

const OpsNavbar = () => {
    return (
        <nav>
            <ul className="menus">
                {menuItemsOps.map((menu,idx) => {
                    const depthLevel = 0;
                    return < MenuItems key={idx} items={menu} depthLevel={depthLevel} />    
                })}
                <NavBarButtons className="nav-right" />
            </ul>
        </nav>
    );
};

export default OpsNavbar;
import { Dropdown } from ".";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MenuItems = ({items, depthLevel}) => {
    
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();

    const closeDropdown = () => {
        dropdown && setDropdown(false);
    };

    useEffect(()=>{
        const handleEvent = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target))
                setDropdown(false);
        };
        document.addEventListener('mousedown',handleEvent);
        document.addEventListener('touchstart', handleEvent);
        return () => {
            document.removeEventListener('mousedown',handleEvent);
            document.removeEventListener('touchstart',handleEvent);
        };
    },[dropdown]);

    return(
        <li className="menu-items" ref={ref} onClick={closeDropdown}>
            {/* {console.log(items.url, ' <------ items.url')} */}
            {items.submenu && items.url ? (
                <>
                    <button type="button" aria-haspopup="menu" aria-expanded={dropdown?'true':'false'} onClick={()=>setDropdown((prev)=>!prev)}>
                        <NavLink to={items.url}>{items.title}</NavLink>
                        {depthLevel > 0 ? <span>&raquo;</span>:<span className="arrow" />}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} />
                </>
            ) : !items.url && items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu" aria-expanded={dropdown?'true':'false'} onClick={()=>setDropdown((prev)=>!prev)}>
                        {items.title}{' '}
                        {depthLevel > 0 ? <span>&raquo;</span>:<span className="arrow" />}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} />
                </>
            ) : (
                <NavLink to={items.url}>{items.title}</NavLink>
            )}
        </li>    
    );
};

export default MenuItems;
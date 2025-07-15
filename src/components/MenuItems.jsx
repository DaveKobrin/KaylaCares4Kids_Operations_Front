import { Dropdown } from ".";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ConstContext, UserContext } from "../App"; 
// import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";

const MenuItems = ({items, depthLevel}) => {
    // console.log({depthLevel})
    const { currUser } = useContext(UserContext);
    const { AUDIENCE } = useContext(ConstContext);
    // const { getAccessTokenSilently } = useAuth0();

    const [dropdown, setDropdown] = useState(false);
    const [currRoles, setCurrRoles] = useState([]);
    let ref = useRef();

    const closeDropdown = () => {
        dropdown && setDropdown(false);
    };

    const onMouseEnter = () => {
        setDropdown(true);
    }

    const onMouseExit = () => {
        setDropdown(false);
    }

    useEffect(() => {
        if(currUser) {
            // console.log(currUser, ' :  currUser');
            setCurrRoles((AUDIENCE + '/roles') in currUser ? currUser[AUDIENCE + '/roles']:[]);
        } else 
            setCurrRoles([]);
    },[currUser]);

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
        <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit} onClick={closeDropdown} >
            {/* {console.log({depthLevel:depthLevel, itemsURL: items.url, itemsSUBMENU: items.submenu})} */}
            { items.role && !currRoles.includes(items.role) ? (
                <></>
            ) : items.submenu && items.url ? (
                <>
                    <button type="button" aria-haspopup="menu" aria-expanded={dropdown?'true':'false'} onClick={()=>setDropdown((prev)=>!prev)}>
                        <NavLink to={items.url}>{items.title}</NavLink>
                        {depthLevel > 0 ? <span>&raquo;</span>:<span className="arrow" />}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
                </>
            ) : !items.url && items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu" aria-expanded={dropdown?'true':'false'} onClick={()=>setDropdown((prev)=>!prev)}>
                        {items.title}{' '}
                        {depthLevel > 0 ? <span>&raquo;</span>:<span className="arrow" />}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
                </>
            ) : (
                <NavLink to={items.url}>{items.title}</NavLink>
            )}
        </li>    
    );
};

export default MenuItems;
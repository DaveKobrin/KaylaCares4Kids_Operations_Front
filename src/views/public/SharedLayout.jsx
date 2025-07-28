import { NavLink, Outlet } from "react-router";
import { Navbar } from "../../components";
import { ContactUs } from "../partials";
import "./styles.css";

const SharedLayout = () => {

    return (
        <>
            <header>
                <div className="nav-area">
                    <NavLink to='/' className='logo'><img className="nav-logo" src='/kayla-cares-4-kids-logo.png' alt="Kayla Cares 4 Kids Logo" /></NavLink>
                    <Navbar />
                </div>
            </header>
            <section>
                <Outlet />
            </section>
            <section>
                <ContactUs />
            </section>
        </>
    );
}

export default SharedLayout;

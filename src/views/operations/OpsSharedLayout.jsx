import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../../components";

const OpsSharedLayout = () => {

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
        </>
    );
}

export default OpsSharedLayout;

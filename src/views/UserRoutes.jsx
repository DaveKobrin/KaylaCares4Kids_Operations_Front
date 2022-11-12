import { Routes, Route } from "react-router-dom";
import { NotFound, Login, Logout, Register } from ".";

const UserRoutes = () => {

    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='logout' element={<Logout />} />
            {/* <Route path='register' element={<Register />} /> */}
            <Route path='*' element={<NotFound />} />

        </Routes>
    )
};

export default UserRoutes;

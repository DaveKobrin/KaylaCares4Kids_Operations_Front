import { Navigate } from "react-router-dom"
import { useContext } from "react";
import { ConstContext } from "../App";


const UserProtectedRoute = ({children, user}) => {
    const { PATH_STRINGS } = useContext(ConstContext);
    
    if (!user) {
        return <Navigate to={`${PATH_STRINGS.ops_users}/login`} />;
    } else {
        return children;
    }

}

export default UserProtectedRoute

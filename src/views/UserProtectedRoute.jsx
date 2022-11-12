import { Navigate } from "react-router-dom"


const UserProtectedRoute = ({children, user}) => {
    if (!user) {
        return <Navigate to='/users/login' />;
    } else {
        return children;
    }

}

export default UserProtectedRoute

import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    
    const { user, setUser, URI } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = async () => {
        if( user ) {
            try {
                const response = await fetch( URI + '/api/v1/users/logout',{
                    method: 'GET',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                });
                if (response.ok) {
                    setUser(null);
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect( ()=>{logout();},[]);

    return (
        <h1>Logout</h1>
    )
};

export default Logout;

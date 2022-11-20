import { useContext, useEffect } from "react";
import { UserContext, ConstContext } from "../App";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    
    const { BACK_URI } = useContext(ConstContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    console.log('in logout')

    const handleLogout = async () => {
        try {
            console.log(BACK_URI +'/api/v1/users/logout')
            const response = await fetch(BACK_URI + '/api/v1/users/logout', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }});
            if(response.ok){
                const jsonResp = await response.json();
                setUser(jsonResp.data);
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{ handleLogout() },[])

    return (
        <h1>Logout</h1>
    )
};

export default Logout;

import { useContext } from "react";
import { ConstContext, UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0} from '@auth0/auth0-react'

const Login = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { setCurrUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    // console.log('in login')

    const handleLogin = async () => {
        // console.log(user);
        const accessToken = await getAccessTokenSilently();
        
        const doFetch = async () => {
            try {
                // console.log(BACK_URI +'/api/v1/users/login')
                const response = await fetch(BACK_URI + '/api/v1/users/login', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    }});
                if(response.ok){
                    setCurrUser(user);
                    console.log(user);
                    navigate(`/`);
                }
            } catch (error) {
                console.error(error);
            }
        }
        // doFetch();
        // if (!accessToken)
            setTimeout(() => {
                doFetch();
            }, 1250);
    }

    useEffect(()=>{ handleLogin() },[])

    return (
        <section>
            <h1>logging in</h1>
        </section>    )
};

export default Login;

import { useContext } from "react";
import { ConstContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0} from '@auth0/auth0-react'

const Login = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    console.log('in login')

    const handleLogin = async () => {
        const accessToken = await getAccessTokenSilently();
        try {
            console.log(BACK_URI +'/api/v1/users/login')
            const response = await fetch(BACK_URI + '/api/v1/users/login', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }});
            if(response.ok){
                setUser(user);
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{ handleLogin() },[])

    // useEffect(() => {
    //     const getApiResponse = async () => {
    //         const accessToken = await getAccessTokenSilently();
    //         console.log({BACK_URI});
    //         try {
    //             const resp = await fetch(BACK_URI+'/api/test_routes/protected', {
    //                 method: 'GET',
    //                 credentials: 'include',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${accessToken}`,
    //                 }});
    //             if (resp.ok) {
    //                 const jsonResp = await resp.json();
    //                 setResponse(jsonResp);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     getApiResponse();
    // }, []);

    return (
        <section>
            <h1>logging in</h1>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input type='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your email address" />
                <label htmlFor="password">Password</label>
                <input type='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="your password" />
                <input type='submit' value='Login' />
            </form> */}
        </section>    )
};

export default Login;

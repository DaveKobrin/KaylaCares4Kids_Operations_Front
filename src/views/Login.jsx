import { useContext, useState } from "react";
import { ConstContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const { BACK_URI } = useContext(ConstContext);
    const { setUser } = useContext(UserContext);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            console.log(BACK_URI +'login')
            const response = await fetch(BACK_URI + `/login`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                // body: JSON.stringify({email: email, password: password})
            });
            if(response.ok){
                const jsonResponse = await response.json();
                const {data} = jsonResponse;
                setUser(data);
                navigate(`/`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{ handleLogin() },[])

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

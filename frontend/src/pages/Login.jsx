import {Link, useNavigate} from 'react-router-dom';
import {User, EyeClosed, EyeAlt} from '@boxicons/react';
import { useState } from 'react';
import background from '../assets/background.jpg';
import '../styles/login-register.css';

const BASE_URL = import.meta.env.VITE_URL;

function Login() {
    const nav = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }

            alert(`Welcome ${username}`);

            setUsername("");
            setPassword("");
            
            sessionStorage.setItem('token', data.accessToken);
            nav('/home');

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <img src={background} className='background'/>
            
            <div className='login-wrapper'>
                <form onSubmit={login}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                            type="text" placeholder="Username" 
                            value={username} onChange={e => setUsername(e.target.value)}
                            required/>
                        <User />
                    </div>
                    <div className="input-box">
                        <input 
                            type={showPass ? "text" : "password"} placeholder="Password" 
                            value={password} onChange={e => setPassword(e.target.value)} 
                            required/>
                        <div onClick={() => setShowPass(!showPass)}>
                            {showPass ? <EyeAlt/> : <EyeClosed/>}
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                    <p>Don't have an account? <Link to='/register' className='link'>Register</Link></p>
                </form>
            </div>
        </>
    );
}

export default Login;
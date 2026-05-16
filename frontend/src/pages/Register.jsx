import {Link, useNavigate} from 'react-router-dom';
import {User, At, EyeAlt, EyeClosed} from '@boxicons/react';
import { useState } from 'react';
import background from '../assets/background.jpg';
import '../styles/login-register.css';

const BASE_URL = import.meta.env.VITE_URL;

function Register() {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        try {
            if(password !== confirmPass) {
                throw new Error("Passwords do not match!");
            }

            const res = await fetch(`${BASE_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, email, password})
            });

            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message);
            }

            alert(data.message);
            nav('/');

        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
            <img src={background} className='background'/>
            <div className='register-wrapper'>
                <form onSubmit={register}>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input 
                            type="text" placeholder="Username" 
                            value={username} onChange={e => setUsername(e.target.value)} required/>
                        <User/>
                    </div>
                    <div className="input-box">
                        <input 
                            type="email" placeholder="Email" 
                            value={email} onChange={e => setEmail(e.target.value)} required/>
                        <At/>
                    </div>
                    <div className="input-box">
                        <input 
                            type={showPass ? "text" : "password"} placeholder="Password" 
                            value={password} onChange={e => setPassword(e.target.value)} required/>
                        <div onClick={() => setShowPass(!showPass)}>
                            {showPass ? <EyeAlt/> : <EyeClosed/>}
                        </div>
                    </div>
                    <div className="input-box">
                        <input 
                            type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password" 
                            value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required/>
                        <div onClick={() => setShowConfirmPass(!showConfirmPass)}>
                            {showConfirmPass ? <EyeAlt/> : <EyeClosed/>}
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                    <p>Already have an account? <Link to='/' className='link'>Login</Link></p>
                </form>
            </div>
        </>
    );
}

export default Register;
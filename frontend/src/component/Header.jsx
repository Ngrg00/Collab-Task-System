import {Link, useNavigate, useLocation} from 'react-router-dom';
import {Search, Bell, User} from "@boxicons/react";
import logo from '../assets/logo.png';
import logoName from '../assets/logoName.png';
import '../styles/header.css';
import { useState, useEffect } from "react";

function Header() {
    const [active, setActive] = useState(0);
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        switch(location.pathname) {
            case '/home':
                setActive(1);
                break;
            case '/income':
                setActive(2);
                break;
            case '/expense':
                setActive(3);
                break;
            case '/recurring':
                setActive(4);
                break;
            case '/goals':
                setActive(5);
                break;
        }
    }, []);

    return(
        <div className="header-wrapper">
            <div className="logo">
                <img src={logo} alt="" />
                <img src={logoName} alt="" className='logo-name' />
            </div>
            <div className="header-container">
                <Link 
                    to={'/home'}
                    className={active === 1 ? "active" : "link"} 
                    onClick={() => setActive(1)}
                >
                    Home
                </Link>
                <Link 
                    to={'/task'}
                    className={active === 2 ? "link active" : "link"} 
                    onClick={() => setActive(2)}
                >
                    My task
                </Link>
                <Link
                    to={'/projects'}
                    className={active === 3 ? "link active" : "link"} 
                    onClick={() => setActive(3)}
                >
                    Projects
                </Link>
                <Link
                    to={'/messages'}
                    className={active === 4 ? "link active" : "link"} 
                    onClick={() => setActive(4)}
                >
                    Messages
                </Link>
                <Link 
                    to={'/report'}
                    className={active === 5 ? "link active" : "link"} 
                    onClick={() => setActive(5)}
                >
                    Report
                </Link>
            </div>
            <div className="header-left">
                <div>
                    <Search/>
                </div>
                <div>
                    <Bell/>
                </div>
                <div className="profile">
                    <User/>
                </div>
            </div>
        </div>
    );
}

export default Header;
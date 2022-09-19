import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 32 32">
                        <path d="M22 3h2.003c1.107 0 1.997 0.899 1.997 2.007v22.985c0 1.109-0.894 2.007-1.997 2.007h-15.005c-1.107 0-1.997-0.899-1.997-2.007v-22.985c0-1.109 0.894-2.007 1.997-2.007h7.003v13l3-3 3 3v-13zM5 10v1h2v-1h-2zM5 14v1h2v-1h-2zM5 6v1h2v-1h-2zM5 22v1h2v-1h-2zM5 26v1h2v-1h-2zM5 18v1h2v-1h-2zM7 10v1h2v-1h-2zM7 14v1h2v-1h-2zM7 6v1h2v-1h-2zM7 22v1h2v-1h-2zM7 26v1h2v-1h-2zM7 18v1h2v-1h-2zM17 3v10.6l2-2 2 2v-10.6h-4z"></path>
                    </svg>
                    Nooootess
                </div>
                <button onClick={logoutHandler} className="header-button">
                    Выйти
                </button>
            </div>
        </header>
    );
};

export default Header;

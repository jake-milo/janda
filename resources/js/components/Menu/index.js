import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

export const Menu = () => {
    return (
        <div className="menu">
            <div className="logo-container">
                <img src="/img/logo.png" className="logo" />
            </div>

            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/patients">Patients</Link>
            </nav>
        </div>
    );
}

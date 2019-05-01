import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

export const Menu = () => {
    return (
        <div className="menu">
            <div className="menu-inner">
                <img src="/img/logo.png" className="logo" alt="Jeffery & Associates" />

                <nav>
                    <Link to="/">Dashboard</Link>

                    <Link to="/lab-orders">Lab Orders</Link>

                    <Link to="/contact-lenses">Contact Lenses</Link>

                    <Link to="/patients">Patients</Link>

                    <Link to="/practices">Practices</Link>

                    <Link to="/labs">Labs</Link>
                </nav>
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

export const Menu = () => {
    return (
        <div className="menu">
            <img src="https://placehold.it/200x75?text=Logo" className="logo" />

            <nav>
                <Link to="/">Dashboard</Link>
                <Link to="/patients">Patients</Link>
            </nav>
        </div>
    );
}

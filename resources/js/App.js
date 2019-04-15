import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Dashboard } from './pages/Dashboard';

export const App = () => {
    return (
        <Router>
            <>
                <Menu />

                <div className="container">
                    <div className="inner-container">
                        <Route exact path="/" component={Dashboard} />
                    </div>
                </div>
            </>
        </Router>
    );
};

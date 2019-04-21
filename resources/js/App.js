import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Patient } from './pages/Patient';

// Maybe switch to this at some point?
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Patients = lazy(() => import('./pages/Patients'));

export const App = () => {
    return (
        <Router>
            <>
                <Menu />

                <div className="container">
                    <div className="inner-container">
                        <Route exact path="/" component={Dashboard} />

                        <Route exact path="/patients" component={Patients} />
                        <Route exact path="/patients/:id" component={Patient} />
                    </div>
                </div>
            </>
        </Router>
    );
};

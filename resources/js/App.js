import React from 'react';
import { Route } from 'react-router-dom';
import { Router } from './components/Router';
import { Menu } from './components/Menu';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Patient } from './pages/Patient';
import { Practices } from './pages/Practices';
import { Practice } from './pages/Practice';

// Maybe switch to this at some point?
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const Patients = lazy(() => import('./pages/Patients'));

export const App = () => {
    return (
        <Router>
            <Menu />

            <div className="container">
                <div className="inner-container">
                    <Route exact path="/" component={Dashboard} />

                    <Route exact path="/patients" component={Patients} />
                    <Route exact path="/patients/:id" component={Patient} />

                    <Route exact path="/practices" component={Practices} />
                    <Route exact path="/practices/:id" component={Practice} />
                </div>
            </div>
        </Router>
    );
};

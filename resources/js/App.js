import React from 'react';
import { Route } from 'react-router-dom';
import { Router } from './components/Router';
import { Menu } from './components/Menu';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Patient } from './pages/Patient';
import { Practices } from './pages/Practices';
import { Practice } from './pages/Practice';
import { Labs } from './pages/Labs';
import { LabOrders } from './pages/LabOrders';
import { ContactLenses } from './pages/ContactLenses';
import { ContactLensBrand } from './pages/ContactLensBrand';
import { Stock } from './pages/Stock';
import { Manufacturer } from './pages/Manufacturer';
import { Brand } from './pages/Brand';
import { Users } from './pages/Users';
import { Lab } from './pages/Lab';

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

                    <Route exact path="/labs" component={Labs} />
                    <Route exact path="/labs/:id" component={Lab} />

                    <Route path="/lab-orders" component={LabOrders} />

                    <Route path="/contact-lenses" component={ContactLenses} />

                    <Route exact path="/contact-lens-brands/:id" component={ContactLensBrand} />

                    <Route path="/stock" component={Stock} />

                    <Route exact path="/brands/:id" component={Brand} />

                    <Route exact path="/manufacturers/:id" component={Manufacturer} />

                    <Route exact path="/users" component={Users} />
                </div>
            </div>
        </Router>
    );
};

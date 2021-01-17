import React from 'react';
import { Route, Switch } from 'react-router-dom';
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

export const App = () => {
    return (
        <Router>
            <Menu />

            <div className="container">
                <div className="inner-container">
                    <Route exact path="/" component={Dashboard} />

                    <Switch>
                        <Route path="/patients/:id(\d+)" component={Patient} />
                        <Route path="/patients" component={Patients} />
                    </Switch>

                    <Route exact path="/practices" component={Practices} />
                    <Route exact path="/practices/:id" component={Practice} />

                    <Switch>
                        <Route path="/labs/:id" component={Lab} />
                        <Route path="/labs" component={Labs} />
                    </Switch>
                    <Route path="/lab-orders" component={LabOrders} />

                    <Route path="/contact-lenses" component={ContactLenses} />

                    <Route path="/contact-lens-brands/:id" component={ContactLensBrand} />

                    <Route path="/stock" component={Stock} />

                    <Route path="/brands/:id" component={Brand} />

                    <Route path="/manufacturers/:id" component={Manufacturer} />

                    <Route path="/users" component={Users} />
                </div>
            </div>
        </Router>
    );
};

import React, { createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

export const RouterContext = createContext({});

export const Router = ({ children }) => (
    <BrowserRouter>
        <Route>
            {(routeProps) => (
                <RouterContext.Provider value={routeProps}>
                    {children}
                </RouterContext.Provider>
            )}
        </Route>
    </BrowserRouter>
);

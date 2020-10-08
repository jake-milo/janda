import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { TabbedPage } from '../../components/Page';
import { FrameStock } from './FrameStock';
import { FrameManufacturers } from './FrameManufacturers';
import { ContactLensStock } from './ContactLensStock';

export const Stock = () => {
    return (
        <>
            <PageTitle>Stock</PageTitle>

            <Route exact path="/stock" render={() => (
                <Redirect to="/stock/frames" />
            )} />

            <TabbedPage
                links={{
                    'Brands': '/stock/frames',
                    'Frame Manufacturers': '/stock/manufacturers',
                    'Contact Lenses': '/stock/lenses',
                }}
                tabs={{
                    'Brands': (path) => (
                        <Route
                            path={path}
                            component={FrameStock}
                        />
                    ),
                    'Frame Manufacturers': (path) => (
                        <Route
                            path={path}
                            component={FrameManufacturers}
                        />
                    ),
                    'Contact Lenses': (path) => (
                        <Route
                            path={path}
                            component={ContactLensStock}
                        />
                    ),
                }}
            />
        </>
    );
};

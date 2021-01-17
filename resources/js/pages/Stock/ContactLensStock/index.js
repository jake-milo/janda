import React from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useContactLensBrands } from './useContactLensBrands';
import { Spinner } from '../../../components/Spinner';
import { FloatingActionButton } from '../../../components/FloatingActionButton';

import './ContactLensStock.css'
import { ContactLensBrandModal } from '../../ContactLensBrand/ContactLensBrandModal';

export const ContactLensStock = () => {
    const { groupedBrands, refresh } = useContactLensBrands();

    const match = useRouteMatch();

    const handleBrandCreated = () => {
        refresh();
    };

    return (
        <>
            <div className="lens-stock">
                {groupedBrands ? groupedBrands.map(group => (
                    <div key={group.label} className="group">
                        <p className="label">{group.label}</p>
                        <div className="items">
                            {group.brands.map(brand => (
                                <Link to={`/contact-lens-brands/${brand.id}`} key={brand.id}>
                                    {brand.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )) : (
                        <Spinner />
                    )}
            </div>

            <FloatingActionButton to={`${match.url}/create`}>
                <RoundAdd />
            </FloatingActionButton>

            <Route path={`${match.path}/create`} render={() => (
                <ContactLensBrandModal
                    onSuccess={handleBrandCreated}
                />
            )} />
        </>
    );
};

import React, { useState } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { Link } from 'react-router-dom';
import { useBrands } from './useBrands';
import { Spinner } from '../../../components/Spinner';
import { FloatingActionButton } from '../../../components/FloatingActionButton';
import { BrandModal } from '../../../components/BrandModal';

import './FrameStock.css';

export const FrameStock = () => {
    const { groupedBrands, refresh } = useBrands();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleBrandCreated = () => {
        refresh();
    };

    return (
        <>
            <div className="frame-stock">
                {groupedBrands ? groupedBrands.map(group => (
                    <div key={group.label} className="group">
                        <p className="label">{group.label}</p>
                        <div className="items">
                            {group.brands.map(brand => (
                                <Link to={`/brands/${brand.id}`} key={brand.id}>
                                    {brand.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )) : (
                    <Spinner />
                )}
            </div>

            <FloatingActionButton onClick={() => setShowCreateModal(true)}>
                <RoundAdd />
            </FloatingActionButton>

            <BrandModal
                show={showCreateModal}
                hide={() => setShowCreateModal(false)}
                onSuccess={handleBrandCreated}
            />
        </>
    );
};

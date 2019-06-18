import React from 'react';
import { PageTitle } from '../../components/PageTitle';
import { TabbedPage } from '../../components/Page';
import { FrameStock } from './FrameStock';

export const Stock = () => {
    return (
        <>
            <PageTitle>Stock</PageTitle>

            <TabbedPage tabs={{
                'Frames': () => (
                    <FrameStock />
                ),
                'Frame Manufacturers': () => (
                    <p>test</p>
                ),
                'Contact Lenses': () => (
                    <p>even bigger stock</p>
                ),
            }} />
        </>
    );
};

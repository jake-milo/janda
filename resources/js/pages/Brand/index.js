import React from 'react';
import { useBrand } from './useBrand';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';

export const Brand = ({ match }) => {
    const { brand } = useBrand(match.params.id);

    console.log(brand);

    return (
        <>
            <PageTitle>{brand ? brand.name : 'Loading...'}</PageTitle>

            <Page>
                <h2>Types</h2>

                {brand ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Price': 'normal',
                        'Eyesize': 'normal',
                        'DBL': 'normal',
                        'Color': 'normal',
                    }}>
                        {brand.types.map(type => type.variants.map((variant, i) => (
                            <Row key={variant.id}>
                                <Cell>{i === 0 ? type.name : ''}</Cell>
                                <Cell>£{((variant.sell || type.sell) / 100).toFixed(2)}</Cell>
                                <Cell>{variant.eyesize}</Cell>
                                <Cell>{variant.dbl}</Cell>
                                <Cell>{variant.color}</Cell>
                            </Row>
                        )))}
                    </Table>
                ) : (
                    <Spinner />
                )}
            </Page>
        </>
    );
};

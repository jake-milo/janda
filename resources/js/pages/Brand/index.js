import React, { useState } from 'react';
import moment from 'moment';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundMoreVert from 'react-md-icon/dist/RoundMoreVert';
import BaselineDelete from 'react-md-icon/dist/BaselineDelete';
import { Link, Route } from 'react-router-dom';
import { useBrand } from './useBrand';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { FloatingActionButton as FAB } from '../../components/FloatingActionButton';
import { BrandModal } from '../../components/BrandModal';
import { TypeModal } from './TypeModal';
import { remove, post } from '../../helpers';
import { Stepper } from '../../components/Stepper';
import * as h from './headers';
import { useSort } from '../../hooks/useSort';

export const Brand = ({ match }) => {
    const [sortTypes, orderTypes, updateTypeSorting] = useSort();
    const { brand, refresh } = useBrand(match.params.id, { sortTypes, orderTypes });

    const handleBrandSaved = () => {
        refresh();
    };

    const handleTypeSaved = () => {
        refresh();
    };

    const handleRemove = type => (e) => {
        remove(`/api/brands/${brand.id}/types/${type.id}`)
            .then(() => {
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [updatingQuantity, setUpdatingQuantity] = useState(false);
    const handleQuantityChange = (variant) => (quantity) => {
        setUpdatingQuantity(true);

        post(`/api/variants/${variant.id}/update-quantity`, { quantity })
            .then(() => refresh())
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setUpdatingQuantity(false);
            });
    };

    return (
        <>
            <PageTitle label="Brand">{brand ? brand.name : 'Loading...'}</PageTitle>

            <Page>
                <h2>Manufacturer</h2>
                {brand ? (
                    <Link to={`/manufacturers/${brand.manufacturer.id}`}>
                        {brand.manufacturer.name}
                    </Link>
                ) : (
                    <p>Loading...</p>
                )}

                <h2>Frames</h2>
                {brand ? (
                    <Table headers={h.headers} sortable={h.sortable} sort={sortTypes} order={orderTypes} updateSorting={updateTypeSorting}>
                        {brand.types.map(type => type.variants.map((variant, i) => (
                            <Row key={variant.id}>
                                <Cell>{i === 0 ? type.name : ''}</Cell>
                                <Cell>£{((variant.sell || type.sell) / 100).toFixed(2)}</Cell>
                                <Cell>{((variant.buy || type.buy) / 100).toFixed(2)}</Cell>
                                <Cell>{variant.eyesize}</Cell>
                                <Cell>{variant.dbl}</Cell>
                                <Cell>{variant.color}</Cell>
                                <Cell>{moment(variant.year || type.year).format('MMMM yyyy')}</Cell>
                                <Cell centered>
                                    <Stepper
                                        value={variant.quantity}
                                        onChange={handleQuantityChange(variant)}
                                        disabled={updatingQuantity}
                                        buttonsOnly
                                    />
                                </Cell>
                                <Cell size="thin" centered>
                                    {i === 0 ? (
                                        <>
                                            <Link to={`${match.url}/edit-type/${type.id}`} href="#edit">
                                                <RoundEdit />
                                            </Link>
                                            <a href="#remove" onClick={handleRemove(type)}>
                                                <BaselineDelete />
                                            </a>
                                        </>
                                    ) : null}
                                </Cell>
                            </Row>
                        )))}
                    </Table>
                ) : (
                    <Spinner />
                )}
            </Page>

            <FAB expander icon={() => (<RoundMoreVert />)}>
                <FAB.Button to={`${match.url}/edit`}>
                    <RoundEdit />
                </FAB.Button>

                <FAB.Button to={`${match.url}/create-type`}>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            {brand && (
                <>
                    <Route path={`${match.path}/edit`} render={() => (
                        <BrandModal
                            onSuccess={handleBrandSaved}
                            brand={brand}
                        />
                    )} />

                    <Route path={`${match.path}/create-type`} render={() => (
                        <TypeModal
                            onSuccess={handleTypeSaved}
                            brand={brand}
                        />
                    )} />

                    <Route path={`${match.path}/edit-type/:typeId`} render={({ match }) => (
                        <TypeModal
                            onSuccess={handleTypeSaved}
                            brand={brand}
                            editing={match.params.typeId}
                        />
                    )} />
                </>
            )}
        </>
    );
};

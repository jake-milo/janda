import React, { useState } from 'react';
import moment from 'moment';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundMoreVert from 'react-md-icon/dist/RoundMoreVert';
import BaselineDelete from 'react-md-icon/dist/BaselineDelete';
import { Link } from 'react-router-dom';
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

export const Brand = ({ match }) => {
    const { brand, refresh } = useBrand(match.params.id);
    const [showModal, setShowModal] = useState(false);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const handleBrandSaved = () => {
        refresh();
    };

    const handleTypeSaved = () => {
        refresh();
    };

    const handleEditClick = type => (e) => {
        e.preventDefault();

        setEditing(type);
        setShowTypeModal(true);
    };

    const handleTypeModalHide = () => {
        setShowTypeModal(false)
        setEditing(null);
    }

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
        console.log(variant, quantity);
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
                    <Table headers={{
                        'Name': 'normal',
                        'Price': 'normal',
                        'Code': 'normal',
                        'Eyesize': 'normal',
                        'DBL': 'normal',
                        'Color': 'normal',
                        'Year': 'normal',
                        'Quantity': ['normal', true],
                        '': 'thin',
                    }}>
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
                                    />
                                </Cell>
                                <Cell size="thin" centered>
                                    {i === 0 ? (
                                        <>
                                            <a href="#edit" onClick={handleEditClick(type)}>
                                                <RoundEdit />
                                            </a>
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
                <FAB.Button onClick={() => setShowModal(true)}>
                    <RoundEdit />
                </FAB.Button>

                <FAB.Button onClick={() => setShowTypeModal(true)}>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            {brand && (
                <>
                    <BrandModal
                        show={showModal}
                        hide={() => setShowModal(false)}
                        onSuccess={handleBrandSaved}
                        brand={brand}
                    />

                    <TypeModal
                        show={showTypeModal}
                        hide={handleTypeModalHide}
                        onSuccess={handleTypeSaved}
                        brand={brand}
                        editing={editing}
                    />
                </>
            )}
        </>
    );
};

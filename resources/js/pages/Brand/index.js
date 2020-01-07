import React, { useState } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundMoreVert from 'react-md-icon/dist/RoundMoreVert';
import { Link } from 'react-router-dom';
import { useBrand } from './useBrand';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { FloatingActionButton as FAB } from '../../components/FloatingActionButton';
import { BrandModal } from '../../components/BrandModal';
import { TypeModal } from './TypeModal';

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

    return (
        <>
            <PageTitle label="Frame Brand">{brand ? brand.name : 'Loading...'}</PageTitle>

            <Page>
                <h2>Manufacturer</h2>
                {brand ? (
                    <Link to={`/manufacturers/${brand.manufacturer.id}`}>
                        {brand.manufacturer.name}
                    </Link>
                ) : (
                    <p>Loading...</p>
                )}

                <h2>Types</h2>
                {brand ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Price': 'normal',
                        'Eyesize': 'normal',
                        'DBL': 'normal',
                        'Color': 'normal',
                        '': 'thin',
                    }}>
                        {brand.types.map(type => type.variants.map((variant, i) => (
                            <Row key={variant.id}>
                                <Cell>{i === 0 ? type.name : ''}</Cell>
                                <Cell>£{((variant.sell || type.sell) / 100).toFixed(2)}</Cell>
                                <Cell>{variant.eyesize}</Cell>
                                <Cell>{variant.dbl}</Cell>
                                <Cell>{variant.color}</Cell>
                                <Cell size="thin">
                                    {i == 0 ? (
                                        <a href="#edit" onClick={handleEditClick(type)}>
                                            <RoundEdit />
                                        </a>
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

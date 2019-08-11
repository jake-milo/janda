import React, { useState } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { useManufacturer } from './useManufacturer';
import { Table, Row, Cell } from '../../components/Table';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { ManufacturerModal } from '../../components/ManufacturerModal';

export const Manufacturer = ({ match }) => {
    const { manufacturer, refresh } = useManufacturer(match.params.id);
    const [showModal, setShowModal] = useState(false);

    const handleManufacturerSaved = () => {
        refresh();
    };

    return (
        <>
            <PageTitle>{manufacturer ? manufacturer.name : 'Loading...'}</PageTitle>

            <Page>
                {manufacturer ? (
                    <>
                        <h2>Frames</h2>
                        {manufacturer.brands.length > 0 ? (
                            <Table headers={{
                                'Name': 'normal',
                                'Created At': 'normal',
                                'Updated At': 'normal',
                            }}>
                                {manufacturer.brands.map(brand => (
                                    <Row key={brand.id}>
                                        <Cell>
                                            <Link to={`/brands/${brand.id}`}>
                                                {brand.name}
                                            </Link>
                                        </Cell>
                                        <Cell>{brand.time.created.format('DD MMMM YYYY @ HH:mm')}</Cell>
                                        <Cell>{brand.time.updated.format('DD MMMM YYYY @ HH:mm')}</Cell>
                                    </Row>
                                ))}
                            </Table>
                        ) : (
                            <p>No frames found.</p>
                        )}
                    </>
                ) : (
                    <Spinner />
                )}
            </Page>

            <FloatingActionButton onClick={() => setShowModal(true)}>
                <RoundEdit />
            </FloatingActionButton>

            {manufacturer && (
                <ManufacturerModal
                    show={showModal}
                    hide={() => {
                        setShowModal(false);
                    }}
                    editing={manufacturer}
                    onSuccess={handleManufacturerSaved}
                />
            )}
        </>
    );
}
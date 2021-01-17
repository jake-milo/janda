import React from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundMoreVert from 'react-md-icon/dist/RoundMoreVert';
import BaselineDelete from 'react-md-icon/dist/BaselineDelete';
import { FloatingActionButton as FAB } from '../../components/FloatingActionButton';
import { Link, Route } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { useManufacturer } from './useManufacturer';
import { Table, Row, Cell } from '../../components/Table';
import { ManufacturerModal } from '../../components/ManufacturerModal';
import { remove } from '../../helpers';

export const Manufacturer = ({ match }) => {
    const { manufacturer, refresh } = useManufacturer(match.params.id);

    const handleManufacturerSaved = () => {
        refresh();
    };

    const handleRemove = brand => (e) => {
        e.preventDefault();

        remove(`/api/manufacturers/${manufacturer.id}/brands/${brand.id}`)
            .then(() => {
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <PageTitle label="Frame Manufacturer">{manufacturer ? manufacturer.name : 'Loading...'}</PageTitle>

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
                                {manufacturer.brands.map((brand, i) => (
                                    <Row key={brand.id}>
                                        <Cell>
                                            <Link to={`/brands/${brand.id}`}>
                                                {brand.name}
                                            </Link>
                                        </Cell>
                                        <Cell>{brand.time.created.format('DD MMMM YYYY @ HH:mm')}</Cell>
                                        <Cell>{brand.time.updated.format('DD MMMM YYYY @ HH:mm')}</Cell>
                                        <Cell size="thin">
                                            <a href="#edit">
                                                <RoundEdit />
                                            </a>

                                            <a href="#remove" onClick={handleRemove(brand)}>
                                                <BaselineDelete />
                                            </a>
                                        </Cell>
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

            <FAB expander icon={() => (<RoundMoreVert />)}>
                <FAB.Button to={`${match.url}/edit`}>
                    <RoundEdit />
                </FAB.Button>

                <FAB.Button>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            <Route path={`${match.path}/edit`} render={({ match }) => (
                <ManufacturerModal
                    editing={match.params.id}
                    onSuccess={handleManufacturerSaved}
                />
            )} />
        </>
    );
}

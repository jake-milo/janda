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
import { useSort } from '../../hooks/useSort';
import { BrandModal } from '../../components/BrandModal';

export const Manufacturer = ({ match }) => {
    const [sortBrands, orderBrands, updateBrandOrdering] = useSort();
    const { manufacturer, refresh } = useManufacturer(match.params.id, { sortBrands, orderBrands });

    const handleManufacturerSaved = () => {
        refresh();
    };
    const handleBrandSaved = () => {
        refresh();
    };

    const getBrandById = (id) => {
        if (!manufacturer) return null;

        return manufacturer.brands.find(brand => brand.id == id);
    }

    const handleRemove = brand => (e) => {
        e.preventDefault();

        remove(`/api/brands/${brand.id}`)
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
                        <h2>Brands</h2>
                        {manufacturer.brands.length > 0 ? (
                            <Table headers={{
                                'Name': 'normal',
                                'Created At': 'normal',
                                'Updated At': 'normal',
                            }} sortable={{
                                'Name': 'name',
                                'Created At': 'created_at',
                                'Updated At': 'updated_at',
                            }} sort={sortBrands} order={orderBrands} updateSorting={updateBrandOrdering}>
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
                                            <Link to={`${match.url}/edit-brand/${brand.id}`}>
                                                <RoundEdit />
                                            </Link>

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

                <FAB.Button to={`${match.url}/create-brand`}>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            <Route path={`${match.path}/edit`} render={({ match }) => (
                <ManufacturerModal
                    editing={match.params.id}
                    onSuccess={handleManufacturerSaved}
                />
            )} />

            <Route path={`${match.path}/create-brand`} render={({ match }) => (
                <BrandModal
                    manufacturer={match.params.id}
                    onSuccess={handleBrandSaved}
                />
            )} />
            <Route path={`${match.path}/edit-brand/:brandId`} render={({ match }) => (
                <BrandModal
                    brand={getBrandById(match.params.brandId)}
                    manufacturer={match.params.id}
                    onSuccess={handleBrandSaved}
                />
            )} />
        </>
    );
}

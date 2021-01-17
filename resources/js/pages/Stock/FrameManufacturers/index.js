import React, { useState, useEffect } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import BaselineDelete from 'react-md-icon/dist/BaselineDelete';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useManufacturers } from './useManufacturers';
import { Table, Cell, Row } from '../../../components/Table';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Pagination';
import { FloatingActionButton } from '../../../components/FloatingActionButton';
import { ManufacturerModal } from '../../../components/ManufacturerModal';
import { useSort } from '../../../hooks/useSort';
import { remove } from '../../../helpers';

export const FrameManufacturers = () => {
    const match = useRouteMatch();
    const [sort, order, updateSorting] = useSort();
    const { manufacturers, loading, page, pageCount, refresh } = useManufacturers({ sort, order });

    const handleManufacturerSaved = () => {
        refresh();
    };

    const handleRemove = manufacturers => (e) => {
        e.preventDefault();

        remove(`/api/manufacturers/${manufacturers.id}`)
            .then(() => {
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="manufacturers">
                {!loading ? (
                    <Table
                        headers={{
                            'Name': 'normal',
                            'Created At': 'normal',
                            'Updated At': 'normal',
                            '': 'normal',
                        }}
                        sortable={{
                            'Name': 'name',
                            'Created At': 'created_at',
                            'Updated At': 'updated_at',
                        }}
                        sort={sort}
                        order={order}
                        updateSorting={updateSorting}
                    >
                        {manufacturers.map(manufacturer => (
                            <Row key={manufacturer.id}>
                                <Cell>
                                    <Link to={`/manufacturers/${manufacturer.id}`}>
                                        {manufacturer.name}
                                    </Link>
                                </Cell>
                                <Cell>{manufacturer.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{manufacturer.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>
                                    <Link to={`${match.url}/${manufacturer.id}/edit`}>
                                        <RoundEdit />
                                    </Link>
                                    <a href="#remove" onClick={handleRemove(manufacturer)}>
                                        <BaselineDelete />
                                    </a>
                                </Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                        <Spinner />
                    )}

                <FloatingActionButton to={`${match.path}/create`}>
                    <RoundAdd />
                </FloatingActionButton>

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/stock/manufacturers?page=:page:"
                />

                <Route path={`${match.path}/create`} render={() => (
                    <ManufacturerModal
                        onSuccess={handleManufacturerSaved}
                    />
                )} />

                <Route path={`${match.path}/:id/edit`} render={({ match }) => (
                    <ManufacturerModal
                        editing={match.params.id}
                        onSuccess={handleManufacturerSaved}
                    />
                )} />
            </div>
        </>
    );
}

import React, { useState, useEffect } from 'react';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { useLabs } from './useLabs';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { useSort } from '../../hooks/useSort';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { LabModal } from './LabModal';

export const Labs = () => {
    const [sort, order, updateSorting] = useSort();
    const { labs, loading, page, pageCount, refresh } = useLabs({ sort, order });
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const match = useRouteMatch();

    useEffect(() => {
        if (editing) {
            setShowModal(true);
        }
    }, [editing]);

    const handleLabSaved = () => {
        refresh();

        setEditing(null);
    };

    const handleEditClick = id => (e) => {
        e.preventDefault();

        setEditing(id);
    };

    return (
        <>
            <PageTitle>Labs</PageTitle>

            <Page>
                {!loading ? (
                    <Table
                        headers={{
                            'Name': 'normal',
                            'Created At': 'normal',
                            'Updated At': 'normal',
                            '': 'thin',
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
                        {labs.map(lab => (
                            <Row key={lab.id}>
                                <Cell>
                                    <Link to={`/labs/${lab.id}`}>
                                        {lab.name}
                                    </Link>
                                </Cell>
                                <Cell>{lab.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{lab.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>
                                    <Link to={`${match.path}/edit/${lab.id}`}>
                                        <RoundEdit />
                                    </Link>
                                </Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                        <Spinner />
                    )}

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/labs?page=:page"
                />
            </Page>

            <FloatingActionButton to={`${match.path}/create`}>
                <RoundAdd />
            </FloatingActionButton>

            <Route path={`${match.path}/create`} render={() => (
                <LabModal
                    onSuccess={handleLabSaved}
                />
            )} />

            <Route path={`${match.path}/edit/:id`} render={({ match }) => (
                <LabModal
                    onSuccess={handleLabSaved}
                    editing={match.params.id}
                />
            )} />
        </>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const [editing, setEditing] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = lab => (e) => {
        e.preventDefault();
        setEditing(lab);
        setShowModal(true);
    };

    const handleLabSaved = () => {
        refresh();
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
                                <Cell size="thin" centered>
                                    <a href="#edit" onClick={handleEdit(lab)}>
                                        <RoundEdit />
                                    </a>
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

            <FloatingActionButton onClick={() => setShowModal(true)}>
                <RoundAdd />
            </FloatingActionButton>

            <LabModal
                show={showModal}
                hide={() => setShowModal(false)}
                onSuccess={handleLabSaved}
                editing={editing}
            />
        </>
    );
}

import React, { useState, useEffect } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { Link } from 'react-router-dom';
import { useLabs } from './useLabs';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { useSort } from '../../hooks/useSort';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { LabModal } from './LabModal';

export const Labs = () => {
    const [sort, order, updateSorting] = useSort();
    const { labs, loading, page, pageCount, refresh } = useLabs({ sort, order });
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

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
                        {labs.map(lab => (
                            <Row key={lab.id}>
                                <Cell>
                                    <Link to={`/labs/${labs.id}`}>
                                        {lab.name}
                                    </Link>
                                </Cell>
                                <Cell>{lab.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{lab.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>
                                    <a href="#edit" onClick={handleEditClick(lab.id)}>
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
                hide={() => {
                    setShowModal(false);
                    setEditing(null);
                }}
                editing={editing}
                onSuccess={handleLabSaved}
            />
        </>
    );
}

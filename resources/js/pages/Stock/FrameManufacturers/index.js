import React, { useState, useEffect } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link } from 'react-router-dom';
import { useManufacturers } from './useManufacturers';
import { Table, Cell, Row } from '../../../components/Table';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Pagination';
import { FloatingActionButton } from '../../../components/FloatingActionButton';
import { ManufacturerModal } from '../../../components/ManufacturerModal';
import { useSort } from '../../../hooks/useSort';

export const FrameManufacturers = () => {
    const [sort, order, updateSorting] = useSort();
    const { manufacturers, loading, page, pageCount, refresh } = useManufacturers({ sort, order });
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        if (editing) {
            setShowModal(true);
        }
    }, [editing]);

    const handleManufacturerSaved = () => {
        refresh();

        setEditing(null);
    };

    const handleEditClick = id => (e) => {
        e.preventDefault();

        setEditing(id);
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
                                    <a href="#" onClick={handleEditClick(manufacturer.id)}>
                                        <RoundEdit />
                                    </a>
                                </Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                    <Spinner />
                )}

                <FloatingActionButton onClick={() => setShowModal(true)}>
                    <RoundAdd />
                </FloatingActionButton>

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/stock/manufacturers?page=:page:"
                />

                <ManufacturerModal
                    show={showModal}
                    hide={() => {
                        setShowModal(false)
                        setEditing(null);
                    }}
                    editing={editing}
                    onSuccess={handleManufacturerSaved}
                />
            </div>
        </>
    );
}

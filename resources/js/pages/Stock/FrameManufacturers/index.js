import React, { useState, useEffect } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link } from 'react-router-dom';
import { useManufacturers } from './useManufacturers';
import { Table, Cell, Row } from '../../../components/Table';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Pagination';
import { FloatingActionButton } from '../../../components/FloatingActionButton';
import { CreateManufacturerModal } from './CreateManufacturerModal';

export const FrameManufacturers = () => {
    const { manufacturers, loading, page, pageCount, refresh } = useManufacturers();
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
                    <Table headers={{
                        'Name': 'normal',
                        'Created At': 'normal',
                        'Updated At': 'normal',
                        '': 'normal',
                    }}>
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

                <CreateManufacturerModal
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

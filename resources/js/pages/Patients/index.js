import React, { useState, useEffect } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { usePatients } from './usePatients';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { PatientModal } from './PatientModal';
import { useSort } from '../../hooks/useSort';
import { useDebounced } from '../../hooks/useDebounced';

export const Patients = () => {
    const [sort, order, updateSorting] = useSort();
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { patients, loading, page, pageCount, refresh } = usePatients({
        sort,
        order,
        filter: debouncedFilter,
    });
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        if (editing) {
            setShowModal(true);
        }
    }, [editing]);


    const handlePatientSaved = () => {
        refresh();

        setEditing(null);
    };

    const handleEditClick = id => (e) => {
        e.preventDefault();

        setEditing(id);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <PageTitle>Patients</PageTitle>

                <div className="input-wrapper">
                    <label htmlFor="search">Search</label>
                    <input type="text" id="search" name="search" onChange={e => setFilter(e.target.value)} value={filter} />
                </div>
            </div>

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
                        {patients.map(patient => (
                            <Row key={patient.id}>
                                <Cell>
                                    <Link to={`/patients/${patient.id}`}>
                                        {patient.name}
                                    </Link>
                                </Cell>
                                <Cell>{patient.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{patient.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>
                                    <a href="#edit" onClick={handleEditClick(patient.id)}>
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
                    urlFormat="/patients?page=:page:"
                />
            </Page>

            <FloatingActionButton onClick={() => setShowModal(true)}>
                <RoundAdd />
            </FloatingActionButton>

            <PatientModal
                show={showModal}
                hide={() => {
                    setShowModal(false);
                    setEditing(null);
                }}
                editing={editing}
                onSuccess={handlePatientSaved}
            />
        </>
    );
}

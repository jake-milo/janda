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

export const Patients = () => {
    const { patients, loading, page, pageCount, refresh } = usePatients();
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
            <PageTitle>Patients</PageTitle>

            <Page>
                {!loading ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Created At': 'normal',
                        'Updated At': 'normal',
                        '': 'normal',
                    }}>
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

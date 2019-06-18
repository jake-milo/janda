import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { usePatients } from './usePatients';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';

export const Patients = () => {
    const { patients, loading, page, pageCount } = usePatients();

    return (
        <>
            <PageTitle>Patients</PageTitle>

            <Page>
                {!loading ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Created At': 'normal',
                        'Updated At': 'normal',
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
        </>
    );
}

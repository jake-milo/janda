import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { usePatients } from './usePatients';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';

export const Patients = ({ location }) => {
    const { patients, page, pageCount } = usePatients(location.search);

    console.log({ page, pageCount });

    return (
        <>
            <PageTitle>Patients</PageTitle>

            <Page>
                {patients ? (
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

                <Pagination page={3} totalPages={15} />
            </Page>
        </>
    );
}

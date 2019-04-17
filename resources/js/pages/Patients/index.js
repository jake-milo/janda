import React from 'react';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { usePatients } from './usePatients';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';

export const Patients = () => {
    const { patients } = usePatients();

    return (
        <>
            <PageTitle>Patients</PageTitle>

            <Page>
                {patients ? (
                    <Table headers={{
                        'Name': 'normal',
                    }}>
                        {patients.map(patient => (
                            <Row key={patient.id}>
                                <Cell>{patient.name}</Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                    <Spinner />
                )}
            </Page>
        </>
    );
}

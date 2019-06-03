import React from 'react';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { usePatient } from './usePatient';
import { LabOrdersTable, headers as loHeaders } from '../../components/LabOrdersTable';
import { ContactLensesTable, headers as clHeaders } from '../../components/ContactLensesTable';

export const Patient = ({ match }) => {
    const { patient } = usePatient(match.params.id);

    return (
        <>
            <PageTitle>{patient ? patient.name : 'Loading...'}</PageTitle>

            <Page>
                {patient ? (
                    <>
                        <h2>Lab Orders</h2>
                        {patient.labOrders.length > 0 ? (
                            <LabOrdersTable
                                labOrders={patient.labOrders}
                                remove={[loHeaders.PATIENT]}
                            />
                        ) : (
                            <p>No lab orders found.</p>
                        )}

                        <h2>Lenses</h2>
                        {patient.contactLenses.length > 0 ? (
                            <ContactLensesTable
                                contactLenses={patient.contactLenses}
                                remove={[clHeaders.PATIENT]}
                            />
                        ) : (
                            <p>No lenses found.</p>
                        )}
                    </>
                ) : (
                    <Spinner />
                )}
            </Page>
        </>
    );
};

import React from 'react';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { usePatient } from './usePatient';
import { LabOrdersTable, headers as loHeaders } from '../../components/LabOrdersTable';
import { ContactLensesTable, headers as clHeaders } from '../../components/ContactLensesTable';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Route } from 'react-router-dom';
import { PatientModal } from '../Patients/PatientModal';

export const Patient = ({ match }) => {
    const { patient, refresh } = usePatient(match.params.id);

    const handlePatientSaved = () => {
        refresh();
    };

    return (
        <>
            <PageTitle label="Patient">{patient ? patient.name : 'Loading...'}</PageTitle>

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

            <FloatingActionButton to={`${match.url}/edit`}>
                <RoundEdit />
            </FloatingActionButton>

            <Route path={`${match.path}/edit`} render={({ match }) => (
                <PatientModal
                    editing={match.params.id}
                    onSuccess={handlePatientSaved}
                />
            )} />
        </>
    );
};

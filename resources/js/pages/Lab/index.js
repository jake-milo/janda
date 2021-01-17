import React from 'react';
import { Link, Route } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { useLab } from './useLab';
import { LabOrdersTable, headers as loHeaders } from '../../components/LabOrdersTable';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { LabModal } from '../Labs/LabModal';

export const Lab = ({ match }) => {
    const { lab, refresh } = useLab(match.params.id);

    const handleLabSaved = () => {
        refresh();
    };

    return (
        <>
            <PageTitle label="Lab">{lab ? lab.name : 'Loading...'}</PageTitle>

            <Page>
                {lab ? (
                    <>
                        <h2>Lab Orders</h2>
                        {lab.labOrders.length > 0 ? (
                            <>
                                <LabOrdersTable
                                    labOrders={lab.labOrders}
                                    remove={[loHeaders.PATIENT, loHeaders.LAB]}
                                />

                                {lab.totalLabOrders > 10 ? (
                                    <p className="--centered">
                                        Only showing the latest 10 results.
                                        {' '}
                                        <Link to={`/lab-orders?lab=${lab.id}`}>See More</Link>
                                    </p>
                                ) : null}
                            </>
                        ) : (
                                <p>No lab orders found.</p>
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
                <LabModal
                    editing={match.params.id}
                    onSuccess={handleLabSaved}
                />
            )} />

        </>
    );
};

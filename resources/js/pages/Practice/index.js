import React from 'react';
import { Link } from 'react-router-dom';
import { usePractice } from './usePractice';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { LabOrdersTable, headers as loHeaders } from '../../components/LabOrdersTable';
import { ContactLensesTable, headers as clHeaders } from '../../components/ContactLensesTable';
import { useSort } from '../../hooks/useSort';

export const Practice = ({ match }) => {
    const [sortLabOrders, orderLabOrders, updateLabOrderOrdering] = useSort();
    const [sortContactLenses, orderContactLenses, updateContactLensOrdering] = useSort();
    const { practice } = usePractice(match.params.id, {
        sortLabOrders, orderLabOrders,
        sortContactLenses, orderContactLenses,
    });

    return (
        <>
            <PageTitle label="Practice">{practice ? practice.name : 'Loading...'}</PageTitle>

            <Page>
                {practice ? (
                    <>
                    <h2>Lab Orders</h2>
                    {practice.labOrders.length > 0 ? (
                        <>
                            <LabOrdersTable
                                labOrders={practice.labOrders}
                                sort={sortLabOrders}
                                order={orderLabOrders}
                                updateSorting={updateLabOrderOrdering}
                                noSortingOn={['Patient', 'Lab']}
                                remove={[loHeaders.PRACTICE]}
                            />

                            <p className="--centered">
                                Only showing the first 10 results.
                                {' '}
                                <Link to={`/lab-orders?practice=${practice.id}`}>See More</Link>
                            </p>
                        </>
                    ) : (
                        <p>No lab orders found.</p>
                    )}

                    <h2>Lenses</h2>
                    {practice.contactLenses.length > 0 ? (
                        <>
                            <ContactLensesTable
                                contactLenses={practice.contactLenses}
                                sort={sortContactLenses}
                                order={orderContactLenses}
                                noSortingOn={['Patient', 'Make', 'Duration']}
                                updateSorting={updateContactLensOrdering}
                                remove={[clHeaders.PRACTICE]}
                            />

                            <p className="--centered">
                                Only showing the first 10 results.
                                {' '}
                                <Link to={`/contact-lenses?practice=${practice.id}`}>See More</Link>
                            </p>
                        </>
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
}

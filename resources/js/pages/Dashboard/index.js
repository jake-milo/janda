import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { LabOrdersTable } from '../../components/LabOrdersTable';
import { useOverdueLabOrders } from './useOverdueLabOrders';
import { useUrgentLabOrders } from './useUrgentLabOrders';

export const Dashboard = () => {
    const { overdueLabOrders } = useOverdueLabOrders();
    const { urgentLabOrders } = useUrgentLabOrders();

    console.log(overdueLabOrders);

    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            <Page>
                <section>
                    <h2>Overdue Lab Orders</h2>

                    {overdueLabOrders ? (overdueLabOrders.length > 0 ? (
                        <>
                            <LabOrdersTable labOrders={overdueLabOrders} />

                            {overdueLabOrders.length >= 10 ? (
                                <p className="--centered">
                                    Only showing the latest 10 results.
                                    {' '}
                                    <Link to="/lab-orders?status=overdue">See More</Link>
                                </p>
                            ) : null}
                        </>
                    ) : (
                        <p className="--centered">No overdue lab orders.</p>
                    )) : (
                        <Spinner />
                    )}
                </section>

                <section>
                    <h2>Urgent Lab Orders</h2>

                    {urgentLabOrders ? (urgentLabOrders.length > 0 ? (
                        <>
                            <LabOrdersTable labOrders={urgentLabOrders} />

                            {urgentLabOrders.length >= 10 ? (
                                <p className="--centered">
                                    Only showing the latest 10 results.
                                    {' '}
                                    <Link to="/lab-orders?status=urgent">See More</Link>
                                </p>
                            ) : null}
                        </>
                    ) : (
                        <p className="--centered">No urgent lab orders.</p>
                    )) : (
                        <Spinner />
                    )}
                </section>
            </Page>
        </>
    );
}

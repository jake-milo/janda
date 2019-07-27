import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { LabOrdersTable } from '../../components/LabOrdersTable';
import { useOverdueLabOrders } from './useOverdueLabOrders';
import { useUrgentLabOrders } from './useUrgentLabOrders';

export const Dashboard = () => {
    const { overdueLabOrders } = useOverdueLabOrders();
    const { urgentLabOrders } = useUrgentLabOrders();

    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            <Page>
                <section>
                    <h2>Overdue Lab Orders</h2>

                    <LabOrdersTable labOrders={overdueLabOrders || []} />

                    <p className="--centered">
                        Only showing the latest 10 results.
                        {' '}
                        <Link to="/lab-orders?status=overdue">See More</Link>
                    </p>
                </section>

                <section>
                    <h2>Urgent Lab Orders</h2>

                    <LabOrdersTable labOrders={urgentLabOrders || []} />

                    <p className="--centered">
                        Only showing the latest 10 results.
                        {' '}
                        <Link to="/lab-orders?status=urgent">See More</Link>
                    </p>
                </section>
            </Page>
        </>
    );
}

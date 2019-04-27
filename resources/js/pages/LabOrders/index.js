import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { useLabOrders } from './useLabOrders';
import { usePracticeFilter } from '../../hooks/usePracticeFilter';
import { useStatusFilter } from './useStatusFilter';

import './LabOrders.css';

export const LabOrders = () => {
    const { status, statuses, handleStatusChange } = useStatusFilter();
    const { practice, practices, handlePracticeChange } = usePracticeFilter();
    const { labOrders, loading, page, pageCount } = useLabOrders({ practice, status });

    return (
        <>
            <PageTitle>Lab Orders</PageTitle>

            <Page>
                {!loading ? (
                    <>
                        <div>
                            <p>Practice</p>
                            <select value={practice} onChange={handlePracticeChange}>
                                <option value="">All</option>
                                {practices.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p>Status</p>
                            <select value={status} onChange={handleStatusChange}>
                                <option value="">All</option>
                                {statuses.map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Table headers={{
                            'Date Sent': 'normal',
                            'Date Required': 'normal',
                            'Date Received': 'normal',
                            'Patient': 'normal',
                            'Practice': 'normal',
                            'Lens': 'normal',
                            'Lab': 'normal',
                            'Order #': 'normal',
                        }}>
                            {labOrders.map(labOrder => (
                                <Row key={labOrder.id} classes={[labOrder.overdue ? '--overdue' :   '', labOrder.urgent ? '--urgent' : '',]}>
                                    <Cell>{labOrder.dates.sent}</Cell>
                                    <Cell>{labOrder.dates.required}</Cell>
                                    <Cell>{labOrder.dates.received || '-'}</Cell>
                                    <Cell>
                                        <Link to={`/patients/${labOrder.patient.id}`}>
                                            {labOrder.patient.name}
                                        </Link>
                                    </Cell>
                                    <Cell>
                                        <Link to={`/practices/${labOrder.practice.id}`}>
                                            {labOrder.practice.name}
                                        </Link>
                                    </Cell>
                                    <Cell>{labOrder.lens}</Cell>
                                    <Cell>
                                        <Link to={`/labs/${labOrder.lab.id}`}>
                                            {labOrder.lab.name}
                                        </Link>
                                    </Cell>
                                    <Cell>{labOrder.reference}</Cell>
                                </Row>
                            ))}
                        </Table>

                        <Pagination
                            page={page}
                            totalPages={pageCount}
                            urlFormat="/lab-orders?page=:page:"
                        />
                    </>
                ) : (
                    <Spinner />
                )}
            </Page>
        </>
    );
};

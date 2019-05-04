import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell, Filters } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useLabOrders } from './useLabOrders';
import { usePracticeFilter } from '../../hooks/usePracticeFilter';
import { useStatusFilter } from './useStatusFilter';
import { CreateLabOrderModal } from './CreateLabOrderModal';
import { PracticePicker } from '../../components/PracticePicker';
import { LabPicker } from '../../components/LabPicker';
import { useLabFilter } from './useLabFilter';

import './LabOrders.css';

export const LabOrders = () => {
    const { status, statuses, handleStatusChange } = useStatusFilter();
    const { practice, handlePracticeChange } = usePracticeFilter();
    const { lab, handleLabChange } = useLabFilter();

    const { labOrders, loading, page, pageCount } = useLabOrders({ practice, status, lab });

    const [showCreateModal, setShowCreateModal] = useState(true);

    return (
        <>
            <PageTitle>Lab Orders</PageTitle>

            <Page>
                {!loading ? (
                    <>
                        <div className="filters">
                            <div className="select-wrapper --inline">
                                <PracticePicker
                                    value={practice}
                                    onChange={handlePracticeChange}
                                    emptyText="All"
                                />
                            </div>

                            <div className="select-wrapper --inline">
                                <label htmlFor="status">Status</label>
                                <select value={status} onChange={handleStatusChange}>
                                    <option value="">All</option>
                                    {statuses.map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="select-wrapper --inline">
                                <LabPicker
                                    value={lab}
                                    onChange={handleLabChange}
                                    emptyText="All"
                                />
                            </div>
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

                <FloatingActionButton onClick={() => setShowCreateModal(true)}>
                    <RoundAdd />
                </FloatingActionButton>

                <CreateLabOrderModal show={showCreateModal} hide={() => setShowCreateModal(false)} />
            </Page>
        </>
    );
};

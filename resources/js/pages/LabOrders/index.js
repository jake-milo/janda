import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useLabOrders } from './useLabOrders';
import { CreateLabOrderModal } from './CreateLabOrderModal';
import { PracticePicker } from '../../components/PracticePicker';
import { LabPicker } from '../../components/LabPicker';
import { StatusPicker } from './StatusPicker';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useHistory, useLocation } from '../../hooks/useRouter';

import './LabOrders.css';

export const LabOrders = () => {
    const params = useQueryParams();
    const [practice, setPractice] = useState('');
    const [status, setStatus] = useState(params.status || '');
    const [lab, setLab] = useState('');

    const { pathname } = useLocation();
    const history = useHistory();
    useEffect(() => {
        history.replace({
            pathname,
            search: `?page=${params.page || 1}`,
        });
    }, []);

    const { labOrders, loading, page, pageCount, refresh } = useLabOrders({ practice, status, lab });

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleLabOrderCreated = () => {
        console.log('refreshing');
        refresh();
    };

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
                                    onChange={setPractice}
                                    emptyText="All"
                                />
                            </div>

                            <div className="select-wrapper --inline">
                                <StatusPicker
                                    value={status}
                                    onChange={setStatus}
                                />
                            </div>

                            <div className="select-wrapper --inline">
                                <LabPicker
                                    value={lab}
                                    onChange={setLab}
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

                <CreateLabOrderModal
                    show={showCreateModal}
                    hide={() => setShowCreateModal(false)}
                    onSuccess={handleLabOrderCreated}
                />
            </Page>
        </>
    );
};

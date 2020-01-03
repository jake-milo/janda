import React, { useState, useEffect } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
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
import { LabOrdersTable } from '../../components/LabOrdersTable';

import './LabOrders.css';
import { useSort } from '../../hooks/useSort';
import { toQueryString } from '../../helpers';

export const LabOrders = () => {
    const params = useQueryParams();
    const [practice, setPractice] = useState(params.practice ? parseInt(params.practice, 10) : '');
    const [status, setStatus] = useState(params.status || '');
    const [lab, setLab] = useState(params.lab ? parseInt(params.lab, 10) : '');
    const [editing, setEditing] = useState(null);

    const { pathname } = useLocation();
    const history = useHistory();
    useEffect(() => {
        history.replace({
            pathname,
            search: `?page=${params.page || 1}`,
        });
    }, []);

    const [sort, order, updateSorting] = useSort();
    const { labOrders, loading, page, pageCount, refresh } = useLabOrders({
        practice,
        status,
        lab,
        sort,
        order,
    });

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleLabOrderSaved = () => {
        refresh();
    };

    const handleEdit = (id) => {
        setEditing(id);
        setShowCreateModal(true);
    };

    return (
        <>
            <PageTitle>Lab Orders</PageTitle>

            <Page>
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
                            allowEmpty
                        />
                    </div>
                </div>

                {!loading ? (
                    <>
                        <LabOrdersTable
                            labOrders={labOrders}
                            withActions
                            onEdit={handleEdit}
                            onReceived={handleLabOrderSaved}
                            sort={sort}
                            order={order}
                            updateSorting={updateSorting}
                        />

                        <Pagination
                            page={page}
                            totalPages={pageCount}
                            urlFormat={p => `/lab-orders${toQueryString({
                                page: p,
                                practice,
                                status,
                                lab,
                            })}`}
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
                    onSuccess={handleLabOrderSaved}
                    editing={editing}
                />
            </Page>
        </>
    );
};

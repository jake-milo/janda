import React, { useState, useEffect } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { useLabOrders } from './useLabOrders';
import { PracticePicker } from '../../components/PracticePicker';
import { LabPicker } from '../../components/LabPicker';
import { StatusPicker } from './StatusPicker';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useHistory, useLocation } from '../../hooks/useRouter';
import { LabOrdersTable } from '../../components/LabOrdersTable';
import { useSort } from '../../hooks/useSort';
import { LabOrderFormModal } from './LabOrderFormModal';

import './LabOrders.css';
import { useDebounced } from '../../hooks/useDebounced';
import { PatientPicker } from '../../components/PatientPicker';

export const LabOrders = () => {
    const params = useQueryParams();
    const [practice, setPractice] = useState(params.practice || '');
    const [status, setStatus] = useState(params.status || '');
    const [lab, setLab] = useState('');
    const [patient, setPatient] = useState(params.patient || '');
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const match = useRouteMatch();

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
        filter: debouncedFilter,
        patient,
    });

    const handleLabOrderSaved = () => {
        refresh();
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
                            clearable
                        />
                    </div>
                </div>

                <div className="filters">
                    <div className="input-wrapper --inline">
                        <label htmlFor="search">Search</label>
                        <input type="text" id="search" name="search" onChange={e => setFilter(e.target.value)} value={filter} />
                    </div>

                    <div className="select-wrapper --inline">
                        <PatientPicker
                            value={patient}
                            onChange={setPatient}
                            emptyText="Any"
                            clearable
                        />
                    </div>
                </div>

                {!loading ? (
                    <>
                        <LabOrdersTable
                            labOrders={labOrders}
                            withActions
                            onReceived={handleLabOrderSaved}
                            sort={sort}
                            order={order}
                            updateSorting={updateSorting}
                        />

                        <Pagination
                            page={page}
                            totalPages={pageCount}
                            urlFormat="/lab-orders?page=:page:"
                        />
                    </>
                ) : (
                    <Spinner />
                )}

                <FloatingActionButton to={`${match.path}/create`}>
                    <RoundAdd />
                </FloatingActionButton>

                <Route path={`${match.path}/create`} render={() => (
                    <LabOrderFormModal
                        onSuccess={handleLabOrderSaved}
                    />
                )} />

                <Route path={`${match.path}/edit/:id`} render={({ match }) => (
                    <LabOrderFormModal
                        onSuccess={handleLabOrderSaved}
                        editing={match.params.id}
                    />
                )} />
            </Page>
        </>
    );
};

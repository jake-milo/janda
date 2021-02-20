import React, { useState } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundDelete from 'react-md-icon/dist/RoundDelete';
import { Route, useRouteMatch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { usePatients } from './usePatients';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { PatientModal } from './PatientModal';
import { useSort } from '../../hooks/useSort';
import { useDebounced } from '../../hooks/useDebounced';
import { remove } from '../../helpers';

export const Patients = () => {
    const [sort, order, updateSorting] = useSort();
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounced(filter, 500);
    const { patients, loading, page, pageCount, refresh } = usePatients({
        sort,
        order,
        filter: debouncedFilter,
    });
    const match = useRouteMatch();


    const handlePatientSaved = () => {
        refresh();
    };

    const handleDelete = (id) => (e) => {
        e.preventDefault();

        // eslint-disable-next-line
        if (confirm('Are you sure you want to delete this patient?')) {
            remove(`/api/patients/${id}`).then(() => {
                refresh();
            });
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <PageTitle>Patients</PageTitle>

                <div className="input-wrapper">
                    <label htmlFor="search">Search</label>
                    <input type="text" id="search" name="search" onChange={e => setFilter(e.target.value)} value={filter} />
                </div>
            </div>

            <Page>
                {!loading ? (
                    <Table
                        headers={{
                            'Name': 'normal',
                            'Created At': 'normal',
                            'Updated At': 'normal',
                            '': 'normal',
                        }}
                        sortable={{
                            'Name': 'name',
                            'Created At': 'created_at',
                            'Updated At': 'updated_at',
                        }}
                        sort={sort}
                        order={order}
                        updateSorting={updateSorting}
                    >
                        {patients.map(patient => (
                            <Row key={patient.id}>
                                <Cell>
                                    <Link to={`/patients/${patient.id}`}>
                                        {patient.name}
                                    </Link>
                                </Cell>
                                <Cell>{patient.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{patient.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>
                                    <Link to={`${match.path}/edit/${patient.id}`}>
                                        <RoundEdit />
                                    </Link>

                                    <a href="#delete" onClick={handleDelete(patient.id)}>
                                        <RoundDelete />
                                    </a>
                                </Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                        <Spinner />
                    )}

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/patients?page=:page:"
                />
            </Page>

            <FloatingActionButton to={`${match.path}/create`}>
                <RoundAdd />
            </FloatingActionButton>

            <Route path={`${match.path}/create`} render={() => (
                <PatientModal
                    onSuccess={handlePatientSaved}
                />
            )} />

            <Route path={`${match.path}/edit/:id`} render={({ match }) => (
                <PatientModal
                    onSuccess={handlePatientSaved}
                    editing={match.params.id}
                />
            )} />
        </>
    );
}

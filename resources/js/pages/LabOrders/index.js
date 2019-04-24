import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { useLabOrders } from './useLabOrders';

export const LabOrders = () => {
    const { labOrders, loading, page, pageCount } = useLabOrders();

    return (
        <>
            <PageTitle>Lab Orders</PageTitle>

            <Page>
                {!loading ? (
                    <>
                        <Table headers={{
                            'Patient': 'normal',
                            'Practice': 'normal',
                            'Lens': 'normal',
                            'Lab': 'normal',
                            'Order #': 'normal',
                        }}>
                            {labOrders.map(labOrder => (
                                <Row key={labOrder.id}>
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

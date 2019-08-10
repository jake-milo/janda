import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { usePractices } from './usePractices';
import { Table, Row, Cell } from '../../components/Table';
import { useSort } from '../../hooks/useSort';

export const Practices = () => {
    const [sort, order, updateSorting] = useSort();
    const { practices, loading, page, pageCount } = usePractices({ sort, order });

    return (
        <>
            <PageTitle>Practices</PageTitle>

            <Page>
                {!loading ? (
                    <Table
                        headers={{
                            'Name': 'normal',
                            'Created At': 'normal',
                            'Updated At': 'normal',
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
                        {practices.map(practice => (
                            <Row key={practice.id}>
                                <Cell>
                                    <Link to={`/practices/${practice.id}`}>
                                        {practice.name}
                                    </Link>
                                </Cell>
                                <Cell>{practice.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{practice.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                    <Spinner />
                )}

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/practices?page=:page:"
                />
            </Page>
        </>
    );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { usePractice, useLabs } from './useLabs';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { Pagination } from '../../components/Pagination';

export const Labs = () => {
    const { labs, loading, page, pageCount } = useLabs();


    return (
        <>
            <PageTitle>Labs</PageTitle>

            <Page>
                {!loading ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Created At': 'normal',
                        'Updated At': 'normal',
                    }}>
                        {labs.map(lab => (
                            <Row key={lab.id}>
                                <Cell>
                                    <Link to={`/labs/${labs.id}`}>
                                        {lab.name}
                                    </Link>
                                </Cell>
                                <Cell>{lab.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{lab.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                    <Spinner />
                )}

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/labs?page=:page"
                />
            </Page>
        </>
    );
}

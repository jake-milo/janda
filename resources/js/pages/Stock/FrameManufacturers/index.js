import React from 'react';
import { Link } from 'react-router-dom';
import { useManufacturers } from './useManufacturers';
import { Table, Cell, Row } from '../../../components/Table';
import { Spinner } from '../../../components/Spinner';
import { Pagination } from '../../../components/Pagination';

export const FrameManufacturers = () => {
    const { manufacturers, loading, page, pageCount } = useManufacturers();

    return (
        <>
            <div className="manufacturers">
                {!loading ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Created At': 'normal',
                        'Updated At': 'normal',
                    }}>
                        {manufacturers.map(manufacturer => (
                            <Row key={manufacturer.id}>
                                <Cell>
                                    <Link to={`/manufacturers/${manufacturer.id}`}>
                                        {manufacturer.name}
                                    </Link>
                                </Cell>
                                <Cell>{manufacturer.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                                <Cell>{manufacturer.time.updated.format('Do MMMM YYYY @ HH:mm')}</Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                    <Spinner />
                )}

                <Pagination
                    page={page}
                    totalPages={pageCount}
                    urlFormat="/stock/manufacturers?page=:page:"
                />
            </div>
        </>
    );
}

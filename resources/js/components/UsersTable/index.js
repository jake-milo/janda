import React, { useMemo } from 'react';
import * as h from './headers';
import { Table, Row, Cell } from '../Table';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link, useRouteMatch } from 'react-router-dom';

export const UsersTable = ({ users }) => {
    const match = useRouteMatch();

    const headers = useMemo(() => {
        return h.getHeaders();
    }, []);

    return (
        <>
            <Table headers={headers}>
                {users.map(user => (
                    <Row key={user.id}>
                        <Cell>{user.name}</Cell>
                        <Cell>{user.email}</Cell>
                        <Cell>{user.time.created.format('Do MMMM YYYY @ HH:mm')}</Cell>
                        <Cell centered size="thin">{user.is_setup ? 'Yes' : 'No'}</Cell>
                        <Cell centered size="thin">
                            <Link to={`${match.url}/edit/${user.id}`}>
                                <RoundEdit />
                            </Link>
                        </Cell>
                    </Row>
                ))}
            </Table>
        </>
    );
}

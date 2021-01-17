import React, { useMemo } from 'react';
import * as h from './headers';
import { Table, Row, Cell } from '../Table';
import RoundEdit from 'react-md-icon/dist/RoundEdit';

export const UsersTable = ({ users, onEdit }) => {
    const headers = useMemo(() => {
        return h.getHeaders();
    }, []);

    const handleEditClick = id => (e) => {
        e.preventDefault();

        onEdit(id);
    };

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
                            <a href="#edit" onClick={handleEditClick(user.id)}>
                                <RoundEdit />
                            </a>
                        </Cell>
                    </Row>
                ))}
            </Table>
        </>
    );
}

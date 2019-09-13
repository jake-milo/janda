import React, { useState } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { useUsers } from './useUsers';
import { Spinner } from '../../components/Spinner';
import { UsersTable } from '../../components/UsersTable';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { UserModal } from './UserModal';

export const Users = () => {
    const { users, refresh } = useUsers();
    const [editing, setEditing] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (id) => {
        setEditing(id);
        setShowModal(true);
    };

    const handleUserSaved = () => {
        refresh();
    };

    return (
        <>
            <PageTitle>Users</PageTitle>

            <Page>
                {users ? (users.length > 0 ? (
                    <UsersTable
                        users={users}
                        onEdit={handleEdit}
                    />
                ) : (
                    <p className="--centered">No users found.</p>
                )) : (
                    <Spinner />
                )}

                <FloatingActionButton onClick={() => setShowModal(true)}>
                    <RoundAdd />
                </FloatingActionButton>

                <UserModal
                    show={showModal}
                    hide={() => setShowModal(false)}
                    onSuccess={handleUserSaved}
                    editing={editing && users ? users.find(u => u.id === editing) : null}
                />
            </Page>
        </>
    );
}

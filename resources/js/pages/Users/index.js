import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
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
    const match = useRouteMatch();

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
                    />
                ) : (
                        <p className="--centered">No users found.</p>
                    )) : (
                        <Spinner />
                    )}
            </Page>

            <FloatingActionButton to={`${match.path}/create`}>
                <RoundAdd />
            </FloatingActionButton>

            <Route path={`${match.path}/create`} render={() => (
                <UserModal
                    onSuccess={handleUserSaved}
                />
            )} />

            <Route path={`${match.path}/edit/:id`} render={({ match }) => (console.log(match),
                <UserModal
                    onSuccess={handleUserSaved}
                    editing={match.params.id}
                />
            )} />
        </>
    );
}

import React from 'react';
import { usePractice } from './usePractice';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';

export const Practice = ({ match }) => {
    const { practice } = usePractice(match.params.id);

    return (
        <>
            <PageTitle>{practice ? practice.name : 'Loading...'}</PageTitle>

            <Page>
                {practice ? (
                    <pre>{JSON.stringify(practice, null, 2)}</pre>
                ) : (
                    <Spinner />
                )}
            </Page>
        </>
    );
}

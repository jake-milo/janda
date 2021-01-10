import React, { useState } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import { Route, useRouteMatch } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { useContactLenses } from './useContactLenses';
import { PracticePicker } from '../../components/PracticePicker';
import { ContactLensesTable } from '../../components/ContactLensesTable';
import { FloatingActionButton } from '../../components/FloatingActionButton';
import { ContactLensModal } from './ContactLensModal';
import { ContactLensBrandPicker } from '../../components/ContactLensBrandPicker';
import { useSort } from '../../hooks/useSort';

export const ContactLenses = () => {
    const [practice, setPractice] = useState('');
    const [brand, setBrand] = useState('');
    const match = useRouteMatch();

    const [sort, order, updateSorting] = useSort();
    const { contactLenses, loading, page, pageCount, refresh } = useContactLenses({
        practice,
        sort,
        order,
    });

    const handleContactLensSaved = () => {
        refresh();
    };

    return (
        <>
            <PageTitle>Contact Lenses</PageTitle>

            <Page>
                <div className="filters">
                    <div className="select-wrapper --inline">
                        <PracticePicker
                            value={practice}
                            onChange={setPractice}
                            emptyText="All"
                        />
                    </div>

                    <div className="select-wrapper --inline">
                        <ContactLensBrandPicker
                            value={brand}
                            onChange={setBrand}
                            emptyText="All"
                            clearable
                        />
                    </div>
                </div>

                {!loading ? (
                    <>
                        <ContactLensesTable
                            contactLenses={contactLenses}
                            sort={sort}
                            order={order}
                            updateSorting={updateSorting}
                            withActions
                        />

                        <Pagination
                            page={page}
                            totalPages={pageCount}
                            urlFormat="/contact-lenses?page=:page:"
                        />
                    </>
                ) : (
                    <Spinner />
                )}

                <FloatingActionButton to={`${match.path}/create`}>
                    <RoundAdd />
                </FloatingActionButton>

                <Route path={`${match.path}/create`} render={() => (
                    <ContactLensModal
                        onSuccess={handleContactLensSaved}
                    />
                )} />

                <Route path={`${match.path}/edit/:id`} render={({ match }) => (
                    <ContactLensModal
                        onSuccess={handleContactLensSaved}
                        editing={match.params.id}
                    />
                )} />
            </Page>
        </>
    );
};

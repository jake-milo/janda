import React, { useState } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { useContactLenses } from './useContactLenses';
import { PracticePicker } from '../../components/PracticePicker';
import { ContactLensesTable } from '../../components/ContactLensesTable';

export const ContactLenses = () => {
    const [practice, setPractice] = useState('');
    const { contactLenses, loading, page, pageCount } = useContactLenses({ practice });

    return (
        <>
            <PageTitle>Contact Lenses</PageTitle>

            <Page>
                {!loading ? (
                    <>
                        <div className="filters">
                            <div className="select-wrapper">
                                <PracticePicker
                                    value={practice}
                                    onChange={setPractice}
                                    emptyText="All"
                                />
                            </div>
                        </div>

                        <ContactLensesTable contactLenses={contactLenses} />

                        <Pagination
                            page={page}
                            totalPages={pageCount}
                            urlFormat="/contact-lenses?page=:page:"
                        />
                    </>
                ) : (
                    <Spinner />
                )}
            </Page>

        </>
    );
};

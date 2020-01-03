import React, { useState } from 'react';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
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
import { toQueryString } from '../../helpers';

export const ContactLenses = () => {
    const [practice, setPractice] = useState('');
    const [brand, setBrand] = useState('');
    const [editing, setEditing] = useState(null);

    const [sort, order, updateSorting] = useSort();
    const { contactLenses, loading, page, pageCount, refresh } = useContactLenses({
        practice,
        brand,
        sort,
        order,
    });

    const [showModal, setShowModal] = useState(false);

    const handleContactLensSaved = () => {
        refresh();
    };

    const handleEdit = (id) => {
        setEditing(id);
        setShowModal(true);
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
                            onEdit={handleEdit}
                        />

                        <Pagination
                            page={page}
                            totalPages={pageCount}
                            urlFormat={p => `/contact-lenses${toQueryString({
                                page: p,
                                practice,
                                brand,
                            })}`}
                        />
                    </>
                ) : (
                    <Spinner />
                )}

                <FloatingActionButton onClick={() => setShowModal(true)}>
                    <RoundAdd />
                </FloatingActionButton>

                <ContactLensModal
                    show={showModal}
                    hide={() => setShowModal(false)}
                    onSuccess={handleContactLensSaved}
                    editing={editing}
                />
            </Page>
        </>
    );
};

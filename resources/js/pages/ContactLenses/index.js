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
import { CreateContactLensModal } from './CreateContactLensModal';
import { ContactLensBrandPicker } from '../../components/ContactLensBrandPicker';

export const ContactLenses = () => {
    const [practice, setPractice] = useState('');
    const [brand, setBrand] = useState('');
    const { contactLenses, loading, page, pageCount, resetPage } = useContactLenses({ practice });

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleContactLensCreated = () => {
        resetPage();
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

                <FloatingActionButton onClick={() => setShowCreateModal(true)}>
                    <RoundAdd />
                </FloatingActionButton>

                <CreateContactLensModal
                    show={showCreateModal}
                    hide={() => setShowCreateModal(false)}
                    onSuccess={handleContactLensCreated}
                />
            </Page>
        </>
    );
};

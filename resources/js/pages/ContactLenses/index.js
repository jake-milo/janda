import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { useContactLenses } from './useContactLenses';
import { usePracticeFilter } from '../../hooks/usePracticeFilter';


export const ContactLenses = () => {
    const { practice, practices, handlePracticeChange } = usePracticeFilter();
    const { contactLenses, loading, page, pageCount } = useContactLenses({ practice });

    return (
        <>
            <PageTitle>Contact Lenses</PageTitle>

            <Page>
                {!loading ? (
                    <>
                        <div>
                            <p>Practice</p>
                            <select value={practice} onChange={handlePracticeChange}>
                                <option>All</option>
                                {practices.map(({id, name}) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Table headers={{
                            'Patient': 'normal',
                            'Practice': 'normal',
                            'Brand': 'normal',
                            'Lens': 'normal',
                            'Duration': 'normal',
                            'Quantity': 'normal',
                            'Price': 'thin',
                            'Cost Excl. Postage': 'thin',
                            'Notes': 'normal',
                            'Solutions': 'normal',
                        }}>
                            {contactLenses.map(contactLens => (
                                <Row key={contactLens.id}>
                                    <Cell>
                                        <Link to={`/patients/${contactLens.patient.id}`}>
                                            {contactLens.patient.name}
                                        </Link>
                                    </Cell>
                                    <Cell>
                                        <Link to={`/practices/${contactLens.practice.id}`}>
                                            {contactLens.practice.name}
                                        </Link>
                                    </Cell>
                                    <Cell>{contactLens.brand}</Cell>
                                    <Cell>{contactLens.lens}</Cell>
                                    <Cell>{contactLens.duration}</Cell>
                                    <Cell>{contactLens.quantity}</Cell>
                                    <Cell size="thin">{contactLens.cost}</Cell>
                                    <Cell size="thin">{contactLens.costExclPostage}</Cell>
                                    <Cell> - </Cell>
                                    <Cell>{contactLens.solutions}</Cell>
                                </Row>
                            ))}
                        </Table>

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

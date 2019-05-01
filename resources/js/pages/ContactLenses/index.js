import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Table, Row, Cell } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Pagination } from '../../components/Pagination';
import { useContactLenses } from './useContactLenses';
import { PracticePicker } from '../../components/PracticePicker';

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

                        <Table headers={{
                            'Patient': 'normal',
                            'Practice': 'normal',
                            'Brand': 'normal',
                            'Lens': 'wide',
                            'Duration': 'thin',
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
                                    <Cell size="wide">{contactLens.lens}</Cell>
                                    <Cell size="thin">{contactLens.duration}</Cell>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { usePractice } from './usePractice';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';
import { ContactLensesTable } from '../../components/ContactLensesTable';

export const Practice = ({ match }) => {
    const { practice } = usePractice(match.params.id);

    return (
        <>
            <PageTitle>{practice ? practice.name : 'Loading...'}</PageTitle>

            <Page>
                {practice ? (
                    <>
                    <h2>Lab Orders</h2>
                    {practice.labOrders.length > 0 ? (
                        <>
                            <Table headers={{
                                'Patient': 'normal',
                                'Lens': 'normal',
                                'Lab': 'normal',
                                'Order #': 'normal',
                            }}>
                                {practice.labOrders.map(labOrder => (
                                    <Row key={labOrder.id}>
                                        <Cell>
                                            <Link to={`/patients/${labOrder.patient.id}`} >
                                                {labOrder.patient.name}
                                            </Link>
                                        </Cell>
                                        <Cell>{labOrder.lens}</Cell>
                                        <Cell>
                                            <Link to={`/labs/${labOrder.lab.id}`}>
                                                {labOrder.lab.name}
                                            </Link>
                                        </Cell>
                                        <Cell>{labOrder.reference}</Cell>
                                    </Row>
                                ))}
                            </Table>

                            <p className="--centered">
                                Only showing the latest 10 results.
                                {' '}
                                <Link to={`/lab-orders?practice=${practice.id}`}>See More</Link>
                            </p>
                        </>
                    ) : (
                        <p>No lab orders found.</p>
                    )}

                    <h2>Lenses</h2>
                    {practice.contactLenses.length > 0 ? (
                        <>
                            <ContactLensesTable contactLenses={practice.contactLenses} />
                            
                            <p className="--centered">
                                Only showing the latest 10 results.
                                {' '}
                                <Link to={`/contact-lenses?practice=${practice.id}`}>See More</Link>
                            </p>
                        </>
                    ) : (
                        <p>No lenses found.</p>
                    )}
                </>
                ) : (
                    <Spinner />
                )}
            </Page>
        </>
    );
}

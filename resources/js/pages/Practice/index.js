import React from 'react';
import { Link } from 'react-router-dom';
import { usePractice } from './usePractice';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Table, Row, Cell } from '../../components/Table';

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
                                <Link to={`/lab-orders?practice=${practice.id}`}>See More</Link>
                            </p>
                        </>
                    ) : (
                        <p>No lab orders found.</p>
                    )}

                    <h2>Lenses</h2>
                    {practice.contactLenses.length > 0 ? (
                        <>
                            <Table headers={{
                                'Patient': 'normal',
                                'Brand': 'normal',
                                'Lens': 'normal',
                                'Duration': 'normal',
                                'Quantity': 'normal',
                                'Price': 'thin',
                                'Cost Excl. Postage': 'thin',
                                'Notes': 'normal',
                                'Solutions': 'normal',
                            }}>
                                {practice.contactLenses.map(contactLens => (
                                    <Row key={contactLens.id}>
                                        <Cell>
                                            <Link to={`/patients/${contactLens.patient.id}`}>
                                                {contactLens.patient.name}
                                            </Link>
                                        </Cell>
                                        <Cell>
                                            <Link to={`/contact-lens-brands/${contactLens.brand.id}`}>
                                                {contactLens.brand.name}
                                            </Link>
                                        </Cell>
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

                            <p className="--centered">
                                Only showing the latest 10 results.
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

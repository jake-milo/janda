import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { usePatient } from './usePatient';
import { Table, Row, Cell } from '../../components/Table';

export const Patient = ({ match }) => {
    const { patient } = usePatient(match.params.id);;

    console.log(patient);

    return (
        <>
            <PageTitle>{patient ? patient.name : 'Loading...'}</PageTitle>

            <Page>
                {patient ? (
                    <>
                        <h2>Lab Orders</h2>
                        {patient.labOrders.length > 0 ? (
                            <Table headers={{
                                'Practice': 'normal',
                                'Lens': 'normal',
                                'Lab': 'normal',
                                'Order #': 'normal',
                            }}>
                                {patient.labOrders.map(labOrder => (
                                    <Row key={labOrder.id}>
                                        <Cell>
                                            <Link to={`/practices/${labOrder.practice.id}`} >
                                                {labOrder.practice.name}
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
                        ) : (
                            <p>No lab orders found.</p>
                        )}

                        <h2>Lenses</h2>
                        {patient.contactLenses.length > 0 ? (
                            <Table headers={{
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
                                {patient.contactLenses.map(contactLens => (
                                    <Row key={contactLens.id}>
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
};

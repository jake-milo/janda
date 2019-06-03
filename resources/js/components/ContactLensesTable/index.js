import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Cell } from '../Table';

export const ContactLensesTable = ({ contactLenses }) => (
    <Table headers={{
        'Patient': 'normal',
        'Practice': 'normal',
        'Brand': 'normal',
        'Model': 'normal',
        'Lens': 'wide',
        'Duration': 'thin',
        'Quantity': 'normal',
        'Price': 'thin',
        'Cost Excl. Postage': 'thin',
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
                <Cell>
                    <Link to={`/contact-lens-brands/${contactLens.type.brand.id}`}>
                        {contactLens.type.brand.name}
                    </Link>
                </Cell>
                <Cell>{contactLens.type.name}</Cell>
                <Cell size="wide">{contactLens.lens}</Cell>
                <Cell size="thin">{contactLens.duration}</Cell>
                <Cell>{contactLens.quantity}</Cell>
                <Cell size="thin">{contactLens.cost}</Cell>
                <Cell size="thin">{contactLens.costExclPostage}</Cell>
                <Cell>{contactLens.solutions}</Cell>
            </Row>
        ))}
    </Table>
);
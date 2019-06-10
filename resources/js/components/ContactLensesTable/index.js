import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Cell } from '../Table';
import * as h from './headers';

export { h as headers };

export const ContactLensesTable = ({ contactLenses, remove = [] }) => {
    const headers = useMemo(() => h.getHeaders(remove), [remove]);

    const hasHeader = header => !remove.includes(header);

    return (
        <Table headers={headers}>
            {contactLenses.map(contactLens => (
                <Row key={contactLens.id}>
                    <Cell when={hasHeader(h.PATIENT)}>
                        <Link to={`/patients/${contactLens.patient.id}`}>
                            {contactLens.patient.name}
                        </Link>
                    </Cell>
                    <Cell when={hasHeader(h.PRACTICE)}>
                        <Link to={`/practices/${contactLens.practice.id}`}>
                            {contactLens.practice.name}
                        </Link>
                    </Cell>
                    <Cell when={hasHeader(h.MAKE)}>
                        <Link to={`/contact-lens-brands/${contactLens.type.brand.id}`}>
                            {contactLens.type.brand.name}
                        </Link>
                        <br />
                        {contactLens.type.name}
                    </Cell>
                    <Cell when={hasHeader(h.PRESCRIPTION)} size="wide">
                        <strong>Left:</strong> {contactLens.left}
                        &nbsp;
                        <strong>Right:</strong> {contactLens.right}
                    </Cell>
                    <Cell when={hasHeader(h.DURATION)} size="thin">{contactLens.type.duration}</Cell>
                    <Cell when={hasHeader(h.QUANTITY)}>{contactLens.quantity}</Cell>
                    <Cell when={hasHeader(h.PRICE)} size="thin">{contactLens.price}</Cell>
                    <Cell when={hasHeader(h.SOLUTIONS)}>{contactLens.solutions || '-'}</Cell>
                </Row>
            ))}
        </Table>
    );
};

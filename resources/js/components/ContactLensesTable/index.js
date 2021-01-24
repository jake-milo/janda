import React, { useMemo } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link, useRouteMatch } from 'react-router-dom';
import { Table, Row, Cell } from '../Table';
import * as h from './headers';

export { h as headers };

export const ContactLensesTable = ({
    contactLenses, // the contactLenses to render
    sort, // column being sorted by
    order, // order of the sorting
    updateSorting, // used to update the sorting
    remove = [], // columns to not render if desired
    noSortingOn = [],
    withActions = false, // flag to toggle actions
}) => {
    const match = useRouteMatch();

    const headers = useMemo(() => {
        return h.getHeaders(withActions ? remove : [...remove, h.ACTIONS]);
    }, [remove, withActions]);

    const sortable = useMemo(() => {
        return h.getSortable([...remove, ...noSortingOn])
    }, [remove, noSortingOn]);

    const hasHeader = header => !remove.includes(header);

    return (
        <Table headers={headers} sortable={sortable} sort={sort} order={order} updateSorting={updateSorting}>
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
                    <Cell when={hasHeader(h.DURATION)} size="thin">{contactLens.type.duration}</Cell>
                    <Cell when={hasHeader(h.PRESCRIPTION)} size="wide">
                        <strong>Left:</strong> {contactLens.left}
                        &nbsp;
                        <strong>Right:</strong> {contactLens.right}
                    </Cell>
                    <Cell when={hasHeader(h.QUANTITY)}>{contactLens.quantity}</Cell>
                    <Cell when={hasHeader(h.PRICE)} size="thin">{contactLens.price}</Cell>
                    <Cell when={hasHeader(h.SOLUTIONS)}>{contactLens.solutions || '-'}</Cell>
                    <Cell when={hasHeader(h.ACTIONS) && withActions} size="thin" centered>
                        <Link to={`${match.path}/edit/${contactLens.id}`}>
                            <RoundEdit />
                        </Link>
                    </Cell>
                </Row>
            ))}
        </Table>
    );
};

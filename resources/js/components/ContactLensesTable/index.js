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
                <React.Fragment key={contactLens.id}>
                    {['left', 'right'].map(side => (
                        <Row key={`${contactLens.id}-${side}`}>
                            <Cell when={hasHeader(h.PATIENT)}>
                                {side === 'left' ? (
                                    <Link to={`/patients/${contactLens.patient.id}`}>
                                        {contactLens.patient.name}
                                    </Link>
                                ) : null}
                            </Cell>

                            <Cell when={hasHeader(h.PRACTICE)}>
                                {side === 'left' ? (
                                    <Link to={`/practices/${contactLens.practice.id}`}>
                                        {contactLens.practice.name}
                                    </Link>
                                ) : null}
                            </Cell>

                            <Cell size="thin">
                                <strong>{side === 'left' ? 'Left' : 'Right'}:</strong>
                            </Cell>

                            <Cell when={hasHeader(h.MAKE)}>
                                {contactLens[side].type ? (
                                    <>
                                        <Link to={`/contact-lens-brands/${contactLens[side].type.brand.id}`}>
                                            {contactLens[side].type.brand.name}
                                        </Link>
                                        <br />
                                        {contactLens[side].type.name}
                                    </>
                                ) : '-'}
                            </Cell>

                            <Cell when={hasHeader(h.DURATION)} size="thin">
                                {contactLens[side].type ? contactLens[side].type.duration : '-'}
                            </Cell>

                            <Cell when={hasHeader(h.PRESCRIPTION)} size="wide">
                                {contactLens[side].prescription || '-'}
                            </Cell>

                            <Cell when={hasHeader(h.QUANTITY)}>
                                {contactLens[side].quantity || '-'}
                            </Cell>

                            <Cell when={hasHeader(h.PRICE)} size="thin">
                                {contactLens[side].price || '-'}
                            </Cell>

                            <Cell when={hasHeader(h.SOLUTIONS)}>
                                {side === 'left' ? contactLens.solutions || '-' : null}
                            </Cell>

                            <Cell when={hasHeader(h.ACTIONS) && withActions} size="thin" centered>
                                {side === 'left' ? (
                                    <Link to={`${match.path}/edit/${contactLens.id}`}>
                                        <RoundEdit />
                                    </Link>
                                ) : null}
                            </Cell>
                        </Row>
                    ))}
                </React.Fragment>
            ))}
        </Table>
    );
};

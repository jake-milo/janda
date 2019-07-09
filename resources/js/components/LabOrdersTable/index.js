import React, { useMemo } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import { Link } from 'react-router-dom';
import { Table, Row, Cell } from '../Table';
import * as h from './headers';

export { h as headers };

export const LabOrdersTable = ({ labOrders, remove = [], withActions = false, onEdit }) => {
    const headers = useMemo(() => {
        return h.getHeaders(withActions ? remove : [...remove, h.ACTIONS]);
    }, [remove, withActions]);

    const hasHeader = header => !remove.includes(header);

    const handleEditClick = id => (e) => {
        e.preventDefault();

        onEdit(id);
    };

    return (
        <Table headers={headers}>
            {labOrders.map(labOrder => (
                <Row key={labOrder.id} classes={[labOrder.overdue ? '--overdue' : '', labOrder.urgent ? '--urgent' : '',]}>
                    <Cell when={hasHeader(h.DATE_SENT)}>{labOrder.dates.sent}</Cell>
                    <Cell when={hasHeader(h.DATE_REQUIRED)}>{labOrder.dates.required}</Cell>
                    <Cell when={hasHeader(h.DATE_RECEIVED)}>{labOrder.dates.received || '-'}</Cell>
                    <Cell when={hasHeader(h.PATIENT)}>
                        <Link to={`/patients/${labOrder.patient.id}`}>
                            {labOrder.patient.name}
                        </Link>
                    </Cell>
                    <Cell when={hasHeader(h.PRACTICE)}>
                        <Link to={`/practices/${labOrder.practice.id}`}>
                            {labOrder.practice.name}
                        </Link>
                    </Cell>
                    <Cell when={hasHeader(h.LENS)}>{labOrder.lens}</Cell>
                    <Cell when={hasHeader(h.LAB)}>
                        <Link to={`/labs/${labOrder.lab.id}`}>
                            {labOrder.lab.name}
                        </Link>
                    </Cell>
                    <Cell when={hasHeader(h.ORDER_NO)}>{labOrder.reference}</Cell>
                    <Cell when={hasHeader(h.ACTIONS) && withActions} size="thin" centered>
                        <a href="#" onClick={handleEditClick(labOrder.id)}>
                            <RoundEdit />
                        </a>
                    </Cell>
                </Row>
            ))}
        </Table>
    );
}

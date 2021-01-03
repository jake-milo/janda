import React, { useMemo, useState, useRef } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundDateRange from 'react-md-icon/dist/RoundDateRange';
import { Link, useRouteMatch } from 'react-router-dom';
import { Table, Row, Cell } from '../Table';
import * as h from './headers';
import { Dialog } from '../Dialog';
import { LabOrderReceivedForm } from './LabOrderReceivedForm';

export { h as headers };

export const LabOrdersTable = ({
    labOrders, // the lab orders to render
    sort, // column being sorted by
    order, // order of the sorting
    updateSorting, // used to update the sorting
    onReceived, // method to call when received form has been submitted
    remove = [], // columns to not render if desired
    withActions = false, // flag to toggle actions
    disableSorting = false, // flag to disable sorting
}) => {
    if (withActions && (!onReceived)) {
        throw new Error('LabOrdersTable: You haven\'t supplied an onReceived/onEdit handler to be called when the actions are used.');
    }
    
    const match = useRouteMatch();

    const headers = useMemo(() => {
        return h.getHeaders(withActions ? remove : [...remove, h.ACTIONS]);
    }, [remove, withActions]);

    const sortable = useMemo(() => {
        if (disableSorting) return [];

        return h.getSortable(withActions ? remove : [...remove, h.ACTIONS]);
    }, [remove, withActions, disableSorting]);

    const hasHeader = header => !remove.includes(header);

    const [itemReceived, setItemReceived] = useState(null);
    const receivedButtons = useRef({}).current;
    const handleReceivedClick = id => (e) => {
        e.preventDefault();

        setItemReceived(id);
    };

    const onLabOrderReceived = (closeDialog) => () => {
        closeDialog();
        onReceived();
    };

    return (
        <>
            <Table headers={headers} sortable={sortable} sort={sort} order={order} updateSorting={updateSorting}>
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
                            <Link to={`${match.path}/edit/${labOrder.id}`}>
                                <RoundEdit />
                            </Link>

                            {!labOrder.dates.received && (
                                <a href="#mark-received" onClick={handleReceivedClick(labOrder.id)} ref={r => receivedButtons[labOrder.id] = r}>
                                    <RoundDateRange />
                                </a>
                            )}
                        </Cell>
                    </Row>
                ))}
            </Table>

            <Dialog
                show={itemReceived}
                hide={() => setItemReceived(null)}
                attachTo={itemReceived ? receivedButtons[itemReceived] : null}
                render={({ closeDialog }) => (
                    <LabOrderReceivedForm
                        labOrderId={itemReceived}
                        onComplete={onLabOrderReceived(closeDialog)}
                    />
                )}
            />
        </>
    );
}

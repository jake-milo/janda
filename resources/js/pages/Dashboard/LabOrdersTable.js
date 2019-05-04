import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Row, Cell } from '../../components/Table';

export const LabOrdersTable = ({ labOrders }) => (
    <Table headers={{
        'Date Sent': 'normal',
        'Date Required': 'normal',
        'Date Received': 'normal',
        'Patient': 'normal',
        'Practice': 'normal',
        'Lens': 'normal',
        'Lab': 'normal',
        'Order #': 'normal',
    }}>
        {labOrders.map(labOrder => (
            <Row key={labOrder.id} classes={[labOrder.overdue ? '--overdue' :   '', labOrder.urgent ? '--urgent' : '',]}>
                <Cell>{labOrder.dates.sent}</Cell>
                <Cell>{labOrder.dates.required}</Cell>
                <Cell>{labOrder.dates.received || '-'}</Cell>
                <Cell>
                    <Link to={`/patients/${labOrder.patient.id}`}>
                        {labOrder.patient.name}
                    </Link>
                </Cell>
                <Cell>
                    <Link to={`/practices/${labOrder.practice.id}`}>
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
);

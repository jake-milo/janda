import React from 'react';
import { Table } from '../../../components/Table';

const headers = {
    'Buy': 'normal',
    'Sell': 'normal',
    'Eyesize': 'normal',
    'DBL': 'normal',
    'Color': 'normal',
    'Year': 'normal',
    '': 'thin',
};

export const VariationsTable = ({ children }) => (
    <Table headers={headers} constrained>
        {children}
    </Table>
);

import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker } from '../DatePicker';
import { post } from '../../helpers';

export const LabOrderReceivedForm = ({ onComplete, labOrderId }) => {
    const [posting, setPosting] = useState(false);
    const [dateReceived, setDateReceived] = useState(moment());

    const handleSubmit = (e) => {
        e.preventDefault();

        setPosting(true);

        const data = {
            date_received: dateReceived.format('YYYY-MM-DD'),
        }

        post(`/api/lab-orders/${labOrderId}/received`, data)
            .then(() => {
                setPosting(false);
                onComplete();
            })
            .catch((err) => {
                setPosting(false);
                console.log(err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="date_received">Date Received</label>
                <DatePicker
                    name="date_received"
                    value={dateReceived}
                    onChange={setDateReceived}
                />
            </div>

            <input type="submit" value={posting ? 'Saving...' : 'Mark as Received'} />
        </form>
    );
};

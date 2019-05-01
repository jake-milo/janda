import { useEffect } from 'react';
import moment from 'moment';

export const useMomentValidator = (date) => {
    useEffect(() => {
        if (date !== '' && !moment.isMoment(date)) {
            throw new Error('You can only supply Moment instances to <DatePicker />');
        }
    }, [date]);
}

export const DATE_SENT = 'Date Sent';
export const DATE_REQUIRED = 'Date Required';
export const DATE_RECEIVED = 'Date Received';
export const PATIENT = 'Patient';
export const PRACTICE = 'Practice';
export const LENS = 'Lens';
export const LAB = 'Lab';
export const ORDER_NO = 'Order #';

export const getHeaders = (remove) => {
    const headers = {
        [DATE_SENT]: 'normal',
        [DATE_REQUIRED]: 'normal',
        [DATE_RECEIVED]: 'normal',
        [PATIENT]: 'normal',
        [PRACTICE]: 'normal', 
        [LENS]: 'normal',
        [LAB]: 'normal',
        [ORDER_NO]: 'normal',
    };

    remove.forEach(r => {
        if (headers[r]) {
            delete headers[r];
        }
    });

    return headers;
};
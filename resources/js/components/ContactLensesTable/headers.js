export const PATIENT = 'Patient';
export const PRACTICE = 'Practice';
export const MAKE = 'Make';
export const DURATION = 'Duration';
export const PRESCRIPTION = 'Prescription';
export const QUANTITY = 'Quantity';
export const PRICE = 'Price';
export const SOLUTIONS = 'Solutions';

export const getHeaders = (remove) => {
    const headers = {
        [PATIENT]: 'normal',
        [PRACTICE]: 'normal',
        [MAKE]: 'normal',
        [DURATION]: 'thin',
        [PRESCRIPTION]: 'wide',
        [QUANTITY]: 'normal',
        [PRICE]: 'thin',
        [SOLUTIONS]: 'normal',
    };

    remove.forEach(r => {
        if (headers[r]) {
            delete headers[r];
        }
    });

    return headers;
};

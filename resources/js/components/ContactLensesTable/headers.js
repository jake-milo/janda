export const PATIENT = 'Patient';
export const PRACTICE = 'Practice';
export const MAKE = 'Make';
export const PRESCRIPTION = 'Prescription';
export const DURATION = 'Duration';
export const QUANTITY = 'Quantity';
export const PRICE = 'Price';
export const SOLUTIONS = 'Solutions';

export const getHeaders = (remove) => {
    const headers = {
        [PATIENT]: 'normal',
        [PRACTICE]: 'normal',
        [MAKE]: 'normal',
        [PRESCRIPTION]: 'wide',
        [DURATION]: 'thin',
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

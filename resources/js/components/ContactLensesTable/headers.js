export const PATIENT = 'Patient';
export const PRACTICE = 'Practice';
export const BRAND = 'Brand';
export const MODEL = 'Model';
export const LENS = 'Lens';
export const DURATION = 'Duration';
export const QUANTITY = 'Quantity';
export const PRICE = 'Price';
export const PRICE_EXCL_POSTAGE = 'Cost Excl. Postage';
export const SOLUTIONS = 'Solutions';

export const getHeaders = (remove) => {
    const headers = {
        [PATIENT]: 'normal',
        [PRACTICE]: 'normal',
        [BRAND]: 'normal',
        [MODEL]: 'normal',
        [LENS]: 'wide',
        [DURATION]: 'thin',
        [QUANTITY]: 'normal',
        [PRICE]: 'thin',
        [PRICE_EXCL_POSTAGE]: 'thin',
        [SOLUTIONS]: 'normal',
    };

    remove.forEach(r => {
        if (headers[r]) {
            delete headers[r];
        }
    });
    
    return headers;
};
        
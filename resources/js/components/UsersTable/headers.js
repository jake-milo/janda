export const NAME = 'Name';
export const EMAIL = 'Email';
export const CREATED = 'Created At';
export const IS_SETUP = 'Has activated?';
export const ACTIONS = '';

export const getHeaders = () => ({
    [NAME]: 'normal',
    [EMAIL]: 'normal',
    [CREATED]: 'normal',
    [IS_SETUP]: 'thin',
    [ACTIONS]: 'thin',
});

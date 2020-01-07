import qs from 'query-string';

export const get = url => fetch(url, { credentials: 'same-origin' })
    .then(res => res.json());

const getSendOptions = (data, method) => ({
    method,
    credentials: 'same-origin',
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

const handleSendResponse = res => res.json()
    .then((data) => {
        if (data.errors) {
            throw data.errors;
        } else if (data.exception) {
            throw data;
        } else {
            return data;
        }
    });

export const post = (url, data) => fetch(url, getSendOptions(data, 'POST'))
    .then(handleSendResponse);

export const patch = (url, data) => fetch(url, getSendOptions(data, 'PATCH'))
    .then(handleSendResponse);

export const remove = (url) => fetch(url, getSendOptions({}, 'DELETE'))
    .then(handleSendResponse);

export const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
};

export const has = obj => prop => Object.prototype.hasOwnProperty.call(obj, prop);

export const toQueryString = obj => '?' + qs.stringify(obj);

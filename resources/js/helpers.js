export const get = url => fetch(url, { credentials: 'same-origin' })
    .then(res => res.json());

export const post = (url, data) => {
    const options = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (has(data)('errors')) {
                console.log(data);
                throw 'error - this needs handling';
            } else {
                return data;
            }
        });
};

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

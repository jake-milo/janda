export const get = url => fetch(url, { credentials: 'same-origin' })
    .then(res => res.json());

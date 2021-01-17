export const fetchUser = id => fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => data.data)

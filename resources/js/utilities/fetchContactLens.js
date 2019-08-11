import { contactLensMapper } from "../mappers/contactLenses";

export const fetchContactLens = id => fetch(`/api/contact-lenses/${id}`)
    .then(res => res.json())
    .then(data => data.data)
    .then(contactLens => contactLensMapper(contactLens))

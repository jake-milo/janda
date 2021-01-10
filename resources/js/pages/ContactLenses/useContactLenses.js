import { usePaginatedApi } from '../../hooks/useApi';
import { contactLensesMapper } from '../../mappers/contactLenses';

export const useContactLenses = ({ practice, sort, order }) => {
    const fetch = ({get, page, toQueryString }) => {
        const url = `/api/contact-lenses` + toQueryString({
            page,
            practice,
            sort,
            order,
        });

        return get(url);
    };

    const api = usePaginatedApi(
        'contactLenses',
        fetch,
        contactLensesMapper,
        [practice,sort,order],
    );

    return api;
}

import { useApi } from "../../../hooks/useApi";
import { useDebounced } from "../../../hooks/useDebounced";
import { searchStock } from "../../../utilities/searchStock";

export const useSearch = query => {
    const debouncedQuery = useDebounced(query, 500);

    return useApi(
        "search",
        async () => (debouncedQuery ? searchStock(debouncedQuery) : null),
        data => data,
        [debouncedQuery]
    );
};

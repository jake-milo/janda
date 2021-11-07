import { useEffect, useState } from "react";
import { useDebounced } from "../../../hooks/useDebounced";
import { searchStock } from "../../../utilities/searchStock";

export const useStockSearch = query => {
    const [result, setResult] = useState(null);
    const debouncedSearch = useDebounced(query);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (debouncedSearch) {
            setFetching(true);

            searchStock(debouncedSearch).then(data => {
                setResult(data);
                setFetching(false);
            });
        }
    }, [debouncedSearch]);

    return [result, fetching];
};

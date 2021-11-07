import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useStockSearch } from "./useStockSearch";
import { useHistory, useLocation } from "../../../hooks/useRouter";

import "./Search.css";
import { Spinner } from "../../../components/Spinner";

export const Search = () => {
    const params = useQueryParams();
    const [query, setQuery] = useState(params.q || "");

    const history = useHistory();
    const { pathname } = useLocation();

    useEffect(() => {
        console.log("setting history");

        history.replace({
            pathname,
            search: `?q=${query}`
        });
    }, [query, pathname, history]);

    const [search, loading] = useStockSearch(query);

    return (
        <>
            <div className="filters">
                <div className="input-wrapper --inline">
                    <label htmlFor="search">Search</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                </div>
            </div>

            {loading ? (
                <Spinner />
            ) : !search || !query ? (
                <p>Type to start searching...</p>
            ) : search ? (
                <div className="search">
                    <div className="column">
                        <h2>Brands</h2>

                        {search.brands && search.brands.length ? (
                            search.brands.map(brand => (
                                <p key={brand.id}>
                                    <Link to={`/brands/${brand.id}`}>
                                        {brand.name}
                                    </Link>
                                </p>
                            ))
                        ) : (
                            <p>-</p>
                        )}
                    </div>

                    <div className="column">
                        <h2>Manufacturers</h2>

                        {search.manufacturers && search.manufacturers.length ? (
                            search.manufacturers.map(manufacturer => (
                                <p key={manufacturer.id}>
                                    <Link
                                        to={`/manufacturers/${manufacturer.id}`}
                                    >
                                        {manufacturer.name}
                                    </Link>
                                </p>
                            ))
                        ) : (
                            <p>-</p>
                        )}
                    </div>

                    <div className="column">
                        <h2>Contact Lens Brands</h2>

                        {search.contact_lens_brands &&
                        search.contact_lens_brands.length ? (
                            search.contact_lens_brands.map(brand => (
                                <p key={brand.id}>
                                    <Link
                                        to={`/contact-lens-brands/${brand.id}`}
                                    >
                                        {brand.name}
                                    </Link>
                                </p>
                            ))
                        ) : (
                            <p>-</p>
                        )}
                    </div>

                    <div className="column">
                        <h2>Contact Lens Types</h2>

                        {search.groupedLensTypes &&
                        search.groupedLensTypes.length ? (
                            search.groupedLensTypes.map(({ brand, types }) => (
                                <React.Fragment key={brand.id}>
                                    <p key={brand.id} className="brand-group">
                                        <Link
                                            to={`/contact-lens-brands/${brand.id}`}
                                        >
                                            {brand.name}
                                        </Link>
                                    </p>

                                    <div className="brand-group-types">
                                        {types.map(type => (
                                            <p key={type.id}>{type.name}</p>
                                        ))}
                                    </div>
                                </React.Fragment>
                            ))
                        ) : (
                            <p>-</p>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    );
};

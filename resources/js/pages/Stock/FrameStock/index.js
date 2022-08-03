import React from "react";
import RoundAdd from "react-md-icon/dist/RoundAdd";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { useBrands } from "./useBrands";
import { Spinner } from "../../../components/Spinner";
import { FloatingActionButton } from "../../../components/FloatingActionButton";
import { BrandModal } from "../../../components/BrandModal";

import "./FrameStock.css";

export const FrameStock = () => {
    const { groupedBrands, refresh } = useBrands();

    const match = useRouteMatch();

    const handleBrandCreated = () => {
        refresh();
    };

    return (
        <>
            {groupedBrands ? (
                <div className="frame-stock">
                    {groupedBrands.map(group => (
                        <div key={group.label} className="group">
                            <p className="label">{group.label}</p>
                            <div className="items">
                                {group.brands.map(brand => (
                                    <Link
                                        to={`/brands/${brand.id}`}
                                        key={brand.id}
                                    >
                                        {brand.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Spinner />
            )}

            <FloatingActionButton to={`${match.path}/create`}>
                <RoundAdd />
            </FloatingActionButton>

            <Route
                path={`${match.path}/create`}
                render={() => <BrandModal onSuccess={handleBrandCreated} />}
            />
        </>
    );
};

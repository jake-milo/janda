import React from "react";
import RoundEdit from "react-md-icon/dist/RoundEdit";
import RoundAdd from "react-md-icon/dist/RoundAdd";
import RoundMoreVert from "react-md-icon/dist/RoundMoreVert";
import { Link, Route } from "react-router-dom";
import { useBrand } from "./useBrand";
import { PageTitle } from "../../components/PageTitle";
import { Page } from "../../components/Page";
import { Spinner } from "../../components/Spinner";
import { FloatingActionButton as FAB } from "../../components/FloatingActionButton";
import { BrandModal } from "../../components/BrandModal";
import { TypeModal } from "./TypeModal";
import { useSort } from "../../hooks/useSort";
import { FramesTable } from "../../components/FramesTable";
import { DeleteTypeModal } from "./DeleteTypeModal";

export const Brand = ({ match }) => {
    const typeSortControls = useSort();
    const [sortTypes, orderTypes] = typeSortControls;
    const { brand, refresh } = useBrand(match.params.id, {
        sortTypes,
        orderTypes
    });

    const handleBrandSaved = () => {
        refresh();
    };

    const handleTypeSaved = () => {
        refresh();
    };

    const handleTypeDeleted = () => {
        refresh();
    };

    return (
        <>
            <PageTitle label="Brand">
                {brand ? brand.name : "Loading..."}
            </PageTitle>

            <Page>
                <h2>Manufacturer</h2>
                {brand ? (
                    <Link to={`/manufacturers/${brand.manufacturer.id}`}>
                        {brand.manufacturer.name}
                    </Link>
                ) : (
                    <p>Loading...</p>
                )}

                <h2>Frames</h2>
                {brand ? (
                    <FramesTable
                        frames={brand.types}
                        onQuantityChange={refresh}
                        onRemove={refresh}
                        knownBrandId={brand.id}
                        sortControls={typeSortControls}
                    />
                ) : (
                    <Spinner />
                )}
            </Page>

            <FAB expander icon={() => <RoundMoreVert />}>
                <FAB.Button to={`${match.url}/edit`}>
                    <RoundEdit />
                </FAB.Button>

                <FAB.Button to={`${match.url}/create-type`}>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            {brand && (
                <>
                    <Route
                        path={`${match.path}/edit`}
                        render={() => (
                            <BrandModal
                                onSuccess={handleBrandSaved}
                                brand={brand}
                            />
                        )}
                    />

                    <Route
                        path={`${match.path}/create-type`}
                        render={() => (
                            <TypeModal
                                onSuccess={handleTypeSaved}
                                brand={brand}
                            />
                        )}
                    />

                    <Route
                        path={`${match.path}/edit-type/:typeId`}
                        render={({ match }) => (
                            <TypeModal
                                onSuccess={handleTypeSaved}
                                brand={brand}
                                editing={match.params.typeId}
                            />
                        )}
                    />

                    <Route
                        path={`${match.path}/delete-type/:typeId`}
                        render={({ match }) => (
                            <DeleteTypeModal
                                brandId={brand.id}
                                onSuccess={handleTypeDeleted}
                                frame={brand.types.find(
                                    type => `${type.id}` === match.params.typeId
                                )}
                            />
                        )}
                    />
                </>
            )}
        </>
    );
};

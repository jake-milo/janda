import React, { useState } from "react";
import moment from "moment";
import { Table, Row, Cell } from "../../components/Table";
import { Stepper } from "../../components/Stepper";
import * as h from "./headers";
import { post, remove } from "../../helpers";
import { Link } from "react-router-dom";
import RoundEdit from "react-md-icon/dist/RoundEdit";
import BaselineDelete from "react-md-icon/dist/BaselineDelete";
import { useLocation } from "../../hooks/useRouter";

export const FramesTable = ({
    frames,
    onQuantityChange,
    onRemove,
    showBrand = false,
    knownBrandId = null,
    sortControls = null,
    noActions = false
}) => {
    const location = useLocation();
    const [sort, order, updateSort] = sortControls || [];

    const [updatingQuantity, setUpdatingQuantity] = useState(false);
    const handleQuantityChange = variant => quantity => {
        setUpdatingQuantity(true);

        post(`/api/variants/${variant.id}/update-quantity`, { quantity })
            .then(() => onQuantityChange())
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setUpdatingQuantity(false);
            });
    };

    return (
        <Table
            headers={h.removeActions(
                showBrand ? h.headersWithBrand : h.headers,
                noActions
            )}
            sortable={sortControls ? h.sortable : undefined}
            sort={sort}
            order={order}
            updateSorting={updateSort}
        >
            {frames.map(type =>
                type.variants.map((variant, i) => (
                    <Row key={variant.id}>
                        {showBrand ? (
                            <Cell>
                                {i === 0 ? (
                                    <Link to={`/brands/${type.brand.id}`}>
                                        {type.brand.name}
                                    </Link>
                                ) : null}
                            </Cell>
                        ) : null}
                        <Cell>{i === 0 ? type.name : ""}</Cell>
                        <Cell>
                            £{((variant.sell || type.sell) / 100).toFixed(2)}
                        </Cell>
                        <Cell>
                            {((variant.buy || type.buy) / 100).toFixed(2)}
                        </Cell>
                        <Cell>{variant.eyesize}</Cell>
                        <Cell>{variant.dbl}</Cell>
                        <Cell>{variant.color}</Cell>
                        <Cell>
                            {moment(variant.year || type.year).format(
                                "MMMM yyyy"
                            )}
                        </Cell>
                        <Cell centered>
                            {noActions ? (
                                variant.quantity
                            ) : (
                                <Stepper
                                    value={variant.quantity}
                                    onChange={handleQuantityChange(variant)}
                                    disabled={updatingQuantity}
                                    buttonsOnly
                                />
                            )}
                        </Cell>
                        {noActions ? null : (
                            <Cell size="thin" centered>
                                {i === 0 ? (
                                    <>
                                        <Link
                                            to={`${location.pathname}/edit-type/${type.id}`}
                                            href="#edit"
                                        >
                                            <RoundEdit />
                                        </Link>
                                        <Link
                                            to={`${location.pathname}/delete-type/${type.id}`}
                                        >
                                            <BaselineDelete />
                                        </Link>
                                    </>
                                ) : null}
                            </Cell>
                        )}
                    </Row>
                ))
            )}
        </Table>
    );
};

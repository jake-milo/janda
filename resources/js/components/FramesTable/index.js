import React, { useState } from "react";
import moment from "moment";
import { Table, Row, Cell } from "../../components/Table";
import { Stepper } from "../../components/Stepper";
import * as h from "./headers";
import { post, remove } from "../../helpers";
import { Link } from "react-router-dom";
import RoundEdit from "react-md-icon/dist/RoundEdit";
import BaselineDelete from "react-md-icon/dist/BaselineDelete";
import { useMatch } from "../../hooks/useRouter";

export const FramesTable = ({
    frames,
    onQuantityChange,
    onRemove,
    showBrand = false,
    knownBrandId = null,
    sortControls = null
}) => {
    const match = useMatch();
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

    const handleRemove = type => e => {
        const brandId = knownBrandId || type.brand.id;
        remove(`/api/brands/${brandId}/types/${type.id}`)
            .then(() => {
                onRemove();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Table
            headers={showBrand ? h.headersWithBrand : h.headers}
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
                            <Stepper
                                value={variant.quantity}
                                onChange={handleQuantityChange(variant)}
                                disabled={updatingQuantity}
                                buttonsOnly
                            />
                        </Cell>
                        <Cell size="thin" centered>
                            {i === 0 ? (
                                <>
                                    <Link
                                        to={`${match.url}/edit-type/${type.id}`}
                                        href="#edit"
                                    >
                                        <RoundEdit />
                                    </Link>
                                    <a
                                        href="#remove"
                                        onClick={handleRemove(type)}
                                    >
                                        <BaselineDelete />
                                    </a>
                                </>
                            ) : null}
                        </Cell>
                    </Row>
                ))
            )}
        </Table>
    );
};

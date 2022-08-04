import React from "react";
import { FramesTable } from "../../../components/FramesTable";
import { RouterModal } from "../../../components/Modal";
import { PageTitle } from "../../../components/PageTitle";
import { remove } from "../../../helpers";
import { useHistory } from "../../../hooks/useRouter";

export const DeleteTypeModal = ({ frame, onSuccess, brandId }) => {
    const history = useHistory();

    const handleRemove = e => {
        e.preventDefault();

        remove(`/api/brands/${brandId}/types/${frame.id}`)
            .then(() => {
                onSuccess();
                history.goBack();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <RouterModal>
            <PageTitle>Are you sure?</PageTitle>

            <p>Are you sure you want to delete this frame and it's variants?</p>
            <br />
            <p>All the following will be removed:</p>
            <br />

            <FramesTable frames={[frame]} noActions />

            <input type="submit" value="Delete" onClick={handleRemove} />
        </RouterModal>
    );
};

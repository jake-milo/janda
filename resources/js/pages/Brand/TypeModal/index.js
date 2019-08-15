import React from 'react';
import { Modal } from "../../../components/Modal";
import { PageTitle } from "../../../components/PageTitle";

export const TypeModal = ({ show, hide, onSuccess, editing = null }) => {
    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>
        </Modal>
    );
};

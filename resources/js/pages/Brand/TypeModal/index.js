import React from 'react';
import * as yup from 'yup';
import { Modal } from "../../../components/Modal";
import { PageTitle } from "../../../components/PageTitle";
import { Form } from '../../../components/Form';
import { useInitialValues } from './useInitialValues';
import { FieldError } from '../../../components/FieldError';
import { MoneyInput } from '../../../components/MoneyInput';
import { VariationsTable } from './VariationsTable';
import { Row, Cell } from '../../../components/Table';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    buy: yup.number().integer().positive().required().label('Buy'),
    sell: yup.number().integer().positive().required().label('Sell'),
});

export const TypeModal = ({ show, hide, onSuccess, editing = null }) => {
    const initialValues = useInitialValues(editing);

    const handleSubmit = () => {
        //
    };

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

            <Form
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={({ handleSubmit: onSubmit, handleChange, values }) => (console.log(values.variants),
                    <form onSubmit={onSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" onChange={handleChange} value={values.name} />
                        </div>
                        <FieldError name="name" />

                        <div className="input-wrapper">
                            <label htmlFor="buy">Buy</label>
                            <MoneyInput.Formik value={values.buy} name="buy" />
                        </div>
                        <FieldError name="buy" />

                        <div className="input-wrapper">
                            <label htmlFor="sell">Sell</label>
                            <MoneyInput.Formik value={values.sell} name="sell" />
                        </div>
                        <FieldError name="sell" />

                        <PageTitle small>Variations</PageTitle>
                        <VariationsTable>
                            {values.variants.map(variant => (
                                <Row key={variant.id}>
                                    <Cell>test</Cell>
                                </Row>
                            ))}
                        </VariationsTable>
                    </form>
                )}
            />
        </Modal>
    );
};

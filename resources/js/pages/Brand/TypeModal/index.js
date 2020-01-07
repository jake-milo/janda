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
import { FieldArray } from 'formik';
import BaselineRemoveCircle from 'react-md-icon/dist/BaselineRemoveCircle';
import BaselineAddCircle from 'react-md-icon/dist/BaselineAddCircle';
import uuid from 'uuid/v4';
import { patch, post } from '../../../helpers';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    buy: yup.number().integer().positive().required().label('Buy'),
    sell: yup.number().integer().positive().required().label('Sell'),
    variants: yup.array().of(yup.object().shape({
        buy: yup.number().integer().positive().label('Buy'),
        sell: yup.number().integer().positive().label('Sell'),
        eyesize: yup.string().required().label('Eyesize'),
        dbl: yup.string().required().label('DBL'),
        color: yup.string().required().label('Color'),
    })).min(1).required().label('Variation'),
});

export const TypeModal = ({ brand, show, hide, onSuccess, editing = null }) => {
    const initialValues = useInitialValues(editing);

    const handleSubmit = (values, { setSubmitting }) => {
        const { variants, ...type } = values;

        type.variants = variants.map(variant => ({
            price: 0,
            quantity: 0,
            year: '',
            ...variant,
            id: typeof variant.id === 'string' ? null : variant.id,
        }));

        const request = () => editing
            ? patch(`/api/brands/${brand.id}/types/${editing.id}`, type)
            : post(`/api/brands/${brand.id}/types`, type);

        request()
            .then(() => {
                hide();
                onSuccess();
                setSubmitting(false);
            })
            .catch((err) => {
                console.log(err);
                setSubmitting(false);
            });
    };

    const handleRemove = (helpers, i) => (e) => {
        e.preventDefault();

        helpers.remove(i);
    };

    const handleAdd = (helpers) => (e) => {
        e.preventDefault();

        helpers.push({
            id: uuid(),
            buy: '',
            sell: '',
            eyesize: '',
            dbl: '',
            color: '',
        });
    }

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

            <Form
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialze={!!editing}
                render={({ handleSubmit: onSubmit, handleChange, values, errors }) => (console.log({errors}),
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
                            <FieldArray name="variants" render={arrHelpers => (
                                <>
                                    {values.variants.map((variant, i) => (
                                        <Row key={variant.id}>
                                            <Cell>
                                                <MoneyInput.Formik
                                                    value={variant.buy}
                                                    name={`variants[${i}].buy`}
                                                    placeholder={values.buy}
                                                />
                                            </Cell>
                                            <Cell>
                                                <MoneyInput.Formik
                                                    value={variant.sell}
                                                    name={`variants[${i}].sell`}
                                                    placeholder={values.sell}
                                                />
                                            </Cell>
                                            <Cell>
                                                <input
                                                    type="text"
                                                    id={`variants[${i}].eyesize`}
                                                    name={`variants[${i}].eyesize`}
                                                    onChange={handleChange}
                                                    value={variant.eyesize}
                                                />
                                            </Cell>
                                            <Cell>
                                                <input
                                                    type="text"
                                                    id={`variants[${i}].dbl`}
                                                    name={`variants[${i}].dbl`}
                                                    onChange={handleChange}
                                                    value={variant.dbl}
                                                />
                                            </Cell>
                                            <Cell>
                                                <input
                                                    type="text"
                                                    id={`variants.[${i}].color`}
                                                    name={`variants[${i}].color`}
                                                    onChange={handleChange}
                                                    value={variant.color}
                                                />
                                            </Cell>
                                            <Cell size="thin" centered>
                                                <a href="#remove" title="Remove" onClick={handleRemove(arrHelpers, i)}>
                                                    <BaselineRemoveCircle />
                                                </a>
                                            </Cell>
                                        </Row>
                                    ))}

                                    <Row>
                                        <Cell>
                                            <a
                                                href="#add"
                                                onClick={handleAdd(arrHelpers)}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <BaselineAddCircle style={{ marginRight: '.25rem' }} />
                                                Add Variation
                                            </a>
                                        </Cell>
                                    </Row>
                                </>
                            )} />
                        </VariationsTable>

                        <input type="submit" value={editing ? `Update` : `Create`} />
                    </form>
                )}
            />
        </Modal>
    );
};

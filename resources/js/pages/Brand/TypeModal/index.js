import React, { useCallback } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import { Modal } from "../../../components/Modal";
import { PageTitle } from "../../../components/PageTitle";
import { FormNew } from '../../../components/Form';
import { FieldErrorNew } from '../../../components/FieldError';
import { MoneyInput } from '../../../components/MoneyInput';
import { VariationsTable } from './VariationsTable';
import { Row, Cell } from '../../../components/Table';
import BaselineRemoveCircle from 'react-md-icon/dist/BaselineRemoveCircle';
import BaselineAddCircle from 'react-md-icon/dist/BaselineAddCircle';
import uuid from 'uuid/v4';
import { patch, post } from '../../../helpers';
import { useForm } from '../../../hooks/useForm';
import { DatePicker } from '../../../components/DatePicker';
import { nullableMomentSchema, momentSchema } from '../../../utilities/momentSchema';
import { Stepper } from '../../../components/Stepper';

const schema = yup.object().shape({
    name: yup.string().required().label('Name'),
    buy: yup.number().integer().positive().required().label('Buy'),
    sell: yup.number().integer().positive().required().label('Sell'),
    year: momentSchema,
    variants: yup.array().of(yup.object().shape({
        buy: yup.number().integer().positive().nullable().label('Buy'),
        sell: yup.number().integer().positive().nullable().label('Sell'),
        year: nullableMomentSchema.label('Year'),
        eyesize: yup.string().required().label('Eyesize'),
        dbl: yup.string().required().label('DBL'),
        color: yup.string().required().label('Color'),
        quantity: yup.number().required().label('Quantity'),
    })).min(1).required().label('Variation'),
});

export const TypeModal = ({ brand, show, hide, onSuccess, editing = null }) => {
    const getInitialValues = useCallback(async (type) => {
        if (!type) return {
            name: '',
            buy: '',
            sell: '',
            year: '',
            variants: [],
        }

        return {
            name: type.name,
            buy: type.buy,
            sell: type.sell,
            year: moment(type.year),
            variants: type.variants.map(v => ({
                ...v,
                year: v.year ? moment(v.year) : '',
            })),
        };
    }, []);

    const {
        values,
        loading,
        createHandler,
        createNativeHandler,
        createArrHandler,
        createNativeArrHandler,
        errors,
        submitHandler,
        isValid,
        newArrayItem,
        removeArrayItem,
    } = useForm({ getInitialValues, schema, editing, showing: show });

    const handleSubmit = submitHandler(() => {
        const { variants, ...type } = values;

        type.variants = variants.map(variant => ({
            quantity: 0,
            ...variant,
            year: variant.year ? variant.year.format('yyyy-MM-DD') : null,
            id: typeof variant.id === 'string' ? null : variant.id,
        }));

        const request = () => editing
            ? patch(`/api/brands/${brand.id}/types/${editing.id}`, type)
            : post(`/api/brands/${brand.id}/types`, type);

        request()
            .then(() => {
                hide();
                onSuccess();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const handleRemove = (i) => (e) => {
        e.preventDefault();

        removeArrayItem('variants', i);
    };

    const handleAdd = (e) => {
        e.preventDefault();

        newArrayItem('variants', {
            id: uuid(),
            buy: null,
            sell: null,
            eyesize: '',
            dbl: '',
            color: '',
        });
    }

    return (
        <Modal show={show} hide={hide}>
            <PageTitle>{editing ? 'Update Type' : 'Create Type'}</PageTitle>

            <FormNew values={values} loading={loading} onSubmit={handleSubmit} errors={errors}>
                {() => (
                    <>
                        <div className="input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={createNativeHandler('name')}
                            />
                        </div>
                        <FieldErrorNew name="name" />

                        <div className="input-wrapper">
                            <label htmlFor="buy">Buy</label>
                            <MoneyInput
                                name="buy"
                                value={values.buy}
                                onChange={createHandler('buy')}
                            />
                        </div>
                        <FieldErrorNew name="buy" />

                        <div className="input-wrapper">
                            <label htmlFor="sell">Sell</label>
                            <MoneyInput
                                name="sell"
                                value={values.sell}
                                onChange={createHandler('sell')}
                            />
                        </div>
                        <FieldErrorNew name="sell" />

                        <div className="input-wrapper">
                            <label htmlFor="year">Month/Year</label>
                            <DatePicker
                                name="year"
                                value={values.year}
                                onChange={createHandler('year')}
                                monthOnly
                            />
                        </div>
                        <FieldErrorNew name="year" />

                        <PageTitle small>Variations</PageTitle>
                        <VariationsTable>
                            {values.variants.map((variant, i) => (
                                <React.Fragment key={variant.id}>
                                    <Row>
                                        <Cell>
                                            <MoneyInput
                                                name={`variants[${i}].buy`}
                                                placeholder={values.buy}
                                                value={variant.buy}
                                                onChange={createArrHandler('variants', i, 'buy')}
                                            />
                                        </Cell>
                                        <Cell>
                                            <MoneyInput
                                                name={`variants[${i}].sell`}
                                                placeholder={values.sell}
                                                value={variant.sell}
                                                onChange={createArrHandler('variants', i, 'sell')}
                                            />
                                        </Cell>
                                        <Cell>
                                            <input
                                                type="text"
                                                id={`variants[${i}].eyesize`}
                                                name={`variants[${i}].eyesize`}
                                                value={variant.eyesize}
                                                onChange={createNativeArrHandler('variants', i, 'eyesize')}
                                            />
                                        </Cell>
                                        <Cell>
                                            <input
                                                type="text"
                                                id={`variants[${i}].dbl`}
                                                name={`variants[${i}].dbl`}
                                                value={variant.dbl}
                                                onChange={createNativeArrHandler('variants', i, 'dbl')}
                                            />
                                        </Cell>
                                        <Cell>
                                            <input
                                                type="text"
                                                id={`variants.[${i}].color`}
                                                name={`variants[${i}].color`}
                                                value={variant.color}
                                                onChange={createNativeArrHandler('variants', i, 'color')}
                                            />
                                        </Cell>
                                        <Cell>
                                            <DatePicker
                                                name="year"
                                                placeholder={values.year}
                                                value={variant.year ? moment(variant.year) : ''}
                                                onChange={createArrHandler('variants', i, 'year')}
                                                monthOnly
                                            />
                                        </Cell>
                                        <Cell>
                                            <Stepper
                                                value={variant.quantity}
                                                onChange={createArrHandler('variants', i, 'quantity')}
                                            />
                                        </Cell>
                                        <Cell size="thin" centered>
                                            <a href="#remove" title="Remove" onClick={handleRemove(i)}>
                                                <BaselineRemoveCircle />
                                            </a>
                                        </Cell>
                                    </Row>

                                    {errors[`variants[${i}]`] ? (
                                        <Row>
                                            <Cell>
                                                <FieldErrorNew name={`variants[${i}]`} />
                                            </Cell>
                                        </Row>
                                    ) : null}
                                </React.Fragment>
                            ))}

                            <Row>
                                <Cell>
                                    <a
                                        href="#add"
                                        onClick={handleAdd}
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
                        </VariationsTable>

                        <input type="submit" value={editing ? `Update` : `Create`} disabled={!isValid} />
                    </>
                )}
            </FormNew>
        </Modal>
    );
};

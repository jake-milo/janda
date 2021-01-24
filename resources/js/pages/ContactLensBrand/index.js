import React from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundMoreVert from 'react-md-icon/dist/RoundMoreVert';
import BaselineDelete from 'react-md-icon/dist/BaselineDelete';
import { useContactLensBrand } from './useContactLensBrand';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Cell, Row, Table } from '../../components/Table';
import { FloatingActionButton as FAB } from '../../components/FloatingActionButton';
import { ContactLensTypeModal } from './ContactLensTypeModal';
import { ContactLensBrandModal } from './ContactLensBrandModal';
import { remove } from '../../helpers';
import { Link, Route } from 'react-router-dom';
import { useSort } from '../../hooks/useSort';



export const ContactLensBrand = ({ match }) => {
    const [sortTypes, orderTypes, updateTypeOrdering] = useSort();
    const { brand, refresh } = useContactLensBrand(match.params.id, { sortTypes, orderTypes });

    const handleBrandSaved = () => {
        refresh();
    };

    const handleTypeSaved = () => {
        refresh();
    };

    const handleRemove = type => (e) => {
        e.preventDefault();

        remove(`/api/contact-lens-brands/${brand.id}/types/${type.id}`)
            .then(() => {
                refresh();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <PageTitle label="Contact Lens Brand">{brand ? brand.name : 'Loading...'}</PageTitle>

            <Page>
                <h2>Types</h2>
                {brand ? (
                    <Table headers={{
                        'Name': 'normal',
                        'Duration': 'normal',
                        '': 'thin',
                    }} sortable={{
                        'Name': 'name',
                        'Duration': 'duration'
                    }} sort={sortTypes} order={orderTypes} updateSorting={updateTypeOrdering}>
                        {brand.types.map(type => (
                            <Row key={type.id}>
                                <Cell>{type.name}</Cell>
                                <Cell>{type.duration}</Cell>
                                <Cell size="thin">
                                    <Link to={`${match.url}/edit-type/${type.id}`}>
                                        <RoundEdit />
                                    </Link>
                                    <a href="#remove" onClick={handleRemove(type)}>
                                        <BaselineDelete />
                                    </a>
                                </Cell>
                            </Row>
                        ))}
                    </Table>
                ) : (
                        <Spinner />
                    )}
            </Page>

            <FAB expander icon={() => (<RoundMoreVert />)}>
                <FAB.Button to={`${match.url}/edit`}>
                    <RoundEdit />
                </FAB.Button>

                <FAB.Button to={`${match.url}/create-type`}>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            <Route path={`${match.path}/edit`} render={() => (
                <ContactLensBrandModal
                    onSuccess={handleBrandSaved}
                    brand={brand}
                />
            )} />

            {brand ? (
                <>
                    <Route path={`${match.path}/create-type`} render={() => (
                        <ContactLensTypeModal
                            onSuccess={handleTypeSaved}
                            brand={brand}
                        />
                    )} />

                    <Route path={`${match.path}/edit-type/:typeId`} render={({ match }) => (
                        <ContactLensTypeModal
                            onSuccess={handleTypeSaved}
                            brand={brand}
                            editing={match.params.typeId}
                        />
                    )} />
                </>
            ) : null}
        </>
    );
}

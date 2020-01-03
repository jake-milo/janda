import React, { useState } from 'react';
import RoundEdit from 'react-md-icon/dist/RoundEdit';
import RoundAdd from 'react-md-icon/dist/RoundAdd';
import RoundMoreVert from 'react-md-icon/dist/RoundMoreVert';
import { useContactLensBrand } from './useContactLensBrand';
import { PageTitle } from '../../components/PageTitle';
import { Page } from '../../components/Page';
import { Spinner } from '../../components/Spinner';
import { Cell, Row, Table } from '../../components/Table';
import { FloatingActionButton as FAB } from '../../components/FloatingActionButton';
import { TypeModal } from '../Brand/TypeModal';
import { BrandModal } from '../../components/BrandModal';
import { ContactLensTypeModal } from './ContactLensTypeModal';
import { ContactLensBrandModal } from './ContactLensBrandModal';

export const ContactLensBrand = ({ match }) => {
    const { brand, refresh } = useContactLensBrand(match.params.id);
    const [showModal, setShowModal] = useState(false);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [editing, setEditing] = useState(null);

    const handleBrandSaved = () => {
        refresh();
    };

    const handleTypeSaved = () => {
        refresh();
    };


    const handleEditClick = type => (e) => {
        e.preventDefault();

        setEditing(type);
        setShowTypeModal(true);
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
                    }}>
                        {brand.types.map(type => (
                            <Row key={type.id}>
                                <Cell>{type.name}</Cell>
                                <Cell>{type.duration}</Cell>
                                <Cell size="thin">
                                    <a href="#edit" onClick={handleEditClick(type)}>
                                        <RoundEdit />
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
                <FAB.Button onClick={() => setShowModal(true)}>
                    <RoundEdit />
                </FAB.Button>

                <FAB.Button onClick={() => setShowTypeModal(true)}>
                    <RoundAdd />
                </FAB.Button>
            </FAB>

            {brand && (
                <>
                    <ContactLensBrandModal
                        show={showModal}
                        hide={() => setShowModal(false)}
                        onSuccess={handleBrandSaved}
                        brand={brand}
                    />

                    <ContactLensTypeModal
                        show={showTypeModal}
                        hide={() => setShowTypeModal(false)}
                        onSuccess={handleTypeSaved}
                        brand={brand}
                        editing={editing}
                    />
                </>
            )}
        </>
    );
}

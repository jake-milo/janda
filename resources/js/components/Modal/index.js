import React, { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useHistory } from '../../hooks/useRouter';

import './Modal.css';

const modalRoot = document.getElementById('modal-root');
const selectRoot = document.getElementById('select-root')

export const Modal = ({ show, hide, children }) => {
    const ref = createRef();

    useOnClickOutside(
        [ref, selectRoot],
        () => hide ? hide() : null,
    );

    useEffect(() => {
        document.body.style.position = show ? 'fixed' : 'static';
    }, [show]);

    return createPortal(show ? (
        <div className="modal-container">
            <div className="modal" ref={ref}>
                {children}
            </div>
        </div>
    ) : null, modalRoot);
};

export const RouterModal = (props) => {
    const history = useHistory();
    return <Modal {...props} show hide={() => history.goBack()} />
};
import React, { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Modal.css';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ show, hide, children }) => {
    const ref = createRef();
    useOnClickOutside(ref, () => hide());

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
    }, [show]);

    return createPortal(show ? (
        <div className="modal-container">
            <div className="modal" ref={ref}>
                {children}
            </div>
        </div>
    ) : null, modalRoot);
};

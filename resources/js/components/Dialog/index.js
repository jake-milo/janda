import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import './Dialog.css';
import { useWindowSize } from '../../hooks/useWindowSize';

const dialogRoot = document.getElementById('dialog-root');

export const Dialog = ({ show, hide, attachTo, render }) => {
    const [ref, setRef] = useState(null);
    useOnClickOutside(ref, () => hide());

    const [windowWidth, windowHeight] = useWindowSize();
    const position = useMemo(() => {
        if (!attachTo || !ref) return { x: 0, y: 0 };

        const box = attachTo.getBoundingClientRect();
        const dialogBox = ref.getBoundingClientRect();

        const inTopHalf = box.top < (windowHeight / 2);
        const inLeftEdge = box.left < (windowWidth * 0.2);
        const inRightEdge = box.left > (windowWidth * 0.8);

        const x = (box.left + (box.width / 2)) - (dialogBox.width / 2);
        const y = (inTopHalf
            ? box.top + box.height
            : box.top - dialogBox.height
        ) + window.scrollY;

        return { x, y, inTopHalf, inLeftEdge, inRightEdge };
    }, [attachTo, windowHeight, ref]);

    const style = {
        top: `calc(${position.y}px ${position.inTopHalf ? '+' : '-'} var(--triangle-height))`,
        left: `${position.x}px`,
    };

    let posClass = (position.inTopHalf ? '--top' : '--bottom') + ' '
        + (position.inLeftEdge ? '--left' : '')
        + (position.inRightEdge ? '--right' : '');

    return createPortal(show ? (
        <div className={`dialog ${posClass}`} ref={setRef} style={style}>
            {render({
                closeDialog: hide,
            })}
        </div>
    ) : null, dialogRoot);
};

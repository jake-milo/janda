import React, { useState, useRef, createContext, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import './FloatingActionButton.css';

const FabContext = createContext();

const config = {
    duration: 100,
};

const Button = ({ onClick, children }) => {
    const { expanded, setExpanded } = useContext(FabContext);
    const transitions = useTransition(expanded, null, {
        from: { transform: 'scale(0)' },
        enter: { transform: 'scale(1)' },
        leave: { transform: 'scale(0)' },
        config,
    });

    const handleClick = (e) => {
        e.preventDefault();
        setExpanded(false);

        onClick();
    };

    return transitions.map(({ item, key, props }) => item ? (
        <animated.button key={key} style={props} onClick={handleClick} className="fab --child">
            {children}
        </animated.button>
    ) : null);
};

export const FloatingActionButton = ({ children, onClick, expander = false, icon = null }) => {
    const [expanded, setExpanded] = useState(false);
    const container = useRef();

    useOnClickOutside(container, () => {
        setExpanded(false);
    });

    const handleClick = (e) => {
        e.preventDefault();

        if (expander) {
            setExpanded(!expanded);
        } else {
            onClick();
        }
    };

    return (
        <FabContext.Provider value={{ expanded, setExpanded }}>
            <div className="fab-container" ref={container}>
                {expander ? (
                    <>
                        <button onClick={handleClick} className="fab" id={expanded ? 'expanded' : ''}>
                            {icon()}
                        </button>

                        {/* {expanded ? children({ Button }) : null} */}
                        {children({ Button })}
                    </>
                ) : (
                    <button onClick={handleClick} className="fab">
                        {children}
                    </button>
                )}
            </div>
        </FabContext.Provider>
    );
};

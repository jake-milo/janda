import React, { useState, useRef, createContext, useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useHistory } from '../../hooks/useRouter';

import './FloatingActionButton.css';

const FabContext = createContext();

const config = {
    duration: 100,
};

const Button = ({ onClick, title, style, children }) => {
    const { setExpanded } = useContext(FabContext);

    const handleClick = (e) => {
        e.preventDefault();
        setExpanded(false);

        onClick();
    };

    return (
        <div className="button-container">
            <animated.button style={style} onClick={handleClick} className="fab --child">
                {children}
            </animated.button>

            {title ? (
                <p>{title}</p>
            ) : null}
        </div>
    );
};

const SubButtons = ({ buttons, ready }) => {
    const transitions = useTransition(
        ready ? buttons : [],
        item => item.key,
        {
            trail: 100,
            from: { transform: 'scale(0)' },
            enter: { transform: 'scale(1)' },
            leave: { transform: 'scale(0)' },
            config,
        },
    );

    return transitions.map(({ item, props }, i) => {
        if (!item) return;

        const el = buttons[i];

        return React.cloneElement(el, { style: props });
    });
};

export const FloatingActionButton = ({ children, onClick, to, expander = false, icon = null }) => {
    const [expanded, setExpanded] = useState(false);
    const container = useRef();
    const history = useHistory();

    useOnClickOutside(container, () => {
        setExpanded(false);
    });

    const handleClick = (e) => {
        e.preventDefault();

        if (expander) {
            setExpanded(!expanded);
        } else if (onClick) {
            onClick();
        } else if (to) {
            history.push(to);
        }
    };

    return (
        <FabContext.Provider value={{ expanded, setExpanded }}>
            <div className="fab-container" ref={container}>
                {expander ? (
                    <>
                        <button onClick={handleClick} className="fab">
                            {icon()}
                        </button>

                        <SubButtons
                            buttons={React.Children.toArray(children)}
                            ready={expanded}
                        />
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

FloatingActionButton.Button = Button;

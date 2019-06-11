import './App.css';
import './Forms.css';

import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

const container = document.getElementById('app');

render(
    <App />,
    container,
);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

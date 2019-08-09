import React from 'react';
import { hydrate } from 'react-dom';
import App from '../src/components/App.jsx';

hydrate(
  <App />,
  document.getElementById('header')
);

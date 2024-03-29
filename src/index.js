import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import ExampleSimple from './ExampleSimple';
import { RootStyle } from './global.style';
import SortExample from './SortExample';
import App from './components/Grid/App';
// import App from "./components/ContextMenu/App";
// import App from './components/Layout/App';

const Application = () => (
  <>
    <RootStyle />
    <ExampleSimple />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));

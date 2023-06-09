import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import MainPage from './MainPage';

const ConfiguredApp = () => (
  <HashRouter>
      <MainPage />
  </HashRouter>
)

ReactDOM.render(<ConfiguredApp />, document.getElementById('root'))

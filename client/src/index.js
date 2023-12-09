import './style.css'
import './index.css'
import './reponsive.css'
import App from './App'
import React from 'react'
import reduxStore from './redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import 'resize-observer-polyfill/dist/ResizeObserver.global';

const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persist, store } from './_store';

import './index.css';
import { history } from './_helpers'
import indexRoutes from "./routes/index";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
            <Router history={history}>
                {indexRoutes}
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

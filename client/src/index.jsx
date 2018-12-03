import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import './index.css';
import { history } from './_helpers'
import indexRoutes from "./routes/index";

ReactDOM.render(
    <Router history={history}>
        {indexRoutes}
    </Router>,
    document.getElementById("root")
);

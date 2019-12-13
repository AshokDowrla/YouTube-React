import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom";
import {configureStore} from "./store/configureStore"

import * as serviceWorker from './serviceWorker';


const store = configureStore();
ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />

        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));


serviceWorker.unregister();

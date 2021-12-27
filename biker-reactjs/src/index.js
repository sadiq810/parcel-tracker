import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";
import reportWebVitals from './reportWebVitals';
import ConfigureStore from "./redux/store/ConfigureStore";
import App from './App';
import './style.css';
import 'rsuite/dist/rsuite.min.css';
import 'react-notifications/lib/notifications.css';


const store = ConfigureStore();
let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

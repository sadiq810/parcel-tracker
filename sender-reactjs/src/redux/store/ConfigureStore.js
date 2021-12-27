import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import UserReducer from "../reducers/UserReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '.././sagas';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ParcelReducer from "../reducers/ParcelReducer";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
}

const store = () => {
    const persistedReducer = persistReducer(persistConfig, combineReducers({
        users: UserReducer,
        parcels: ParcelReducer
    }));

    let store = createStore(persistedReducer,
        storeEnhancers(applyMiddleware(sagaMiddleware))
        );

    sagaMiddleware.run(rootSaga);

    return store;
};

export default store;

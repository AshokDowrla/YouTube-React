import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore, compose } from 'redux';
import rootSaga from "./sagas"
import reducer from "./reducers"


export function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

    sagaMiddleware.run(rootSaga);

    return store;
}
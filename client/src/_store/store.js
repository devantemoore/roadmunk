import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    // blacklist: ['progress', 'alert'],
    whitelist: ['user', 'alert', 'users', 'dashboard', 'airlines', 'airports'],
    stateReconciler: autoMergeLevel2
};

const loggerMiddleware = createLogger();

let middleware = [thunkMiddleware];
if(process.env.NODE_ENV === 'development')
    middleware = [...middleware, loggerMiddleware];

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    pReducer,
    applyMiddleware(
        ...middleware
    )
);
export const persist = persistStore(store);



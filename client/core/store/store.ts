import { combineReducers, createStore } from 'redux';
import { loaderReducers } from './reducers';

const rootReducer = combineReducers({ loader: loaderReducers });

export interface StoreProps {
    loader: boolean
}

export const store = createStore(rootReducer);

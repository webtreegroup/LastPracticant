import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loaderReducers, profileReducers } from './reducers';
import { gameReducers } from './reducers/game.reducers';

const middlewares = [thunk];

const rootReducer = combineReducers({
    loader: loaderReducers,
    profile: profileReducers,
    game: gameReducers,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

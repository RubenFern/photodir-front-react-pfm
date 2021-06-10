import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import thunk from 'redux-thunk';

import { albumReducer } from '../reducers/albumReducer';
import { authReducer } from '../reducers/authReducer';
import { exploreReducer } from '../reducers/exploreReducer';
import { modalReducer } from '../reducers/modalReducer';
import { photoReducer } from '../reducers/photoReducer';
import { reloadReducer } from '../reducers/reloadReducer';
import { searchReducer } from '../reducers/searchReducer';
import { userLikedReducer } from '../reducers/userLikedReducer';
import { reportReducer } from '../reducers/reportReducer';
import { userReducer } from '../reducers/userReducer';

/**
 * Habilito la herramienta de desarrollo de redux tools y además aplico el middleware de thunk para
 * realizar peticiones http síncronas
*/ 
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/**
 * Almaceno todos los reducers creados en la aplicación para poder acceder a ellos desde
 * cualquier componente
 */
const reducers = combineReducers(
{
    auth: authReducer,
    album: albumReducer,
    modal: modalReducer,
    photos: photoReducer,
    reload: reloadReducer,
    search: searchReducer,
    explore: exploreReducer,
    userliked: userLikedReducer,
    reports: reportReducer,
    users: userReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

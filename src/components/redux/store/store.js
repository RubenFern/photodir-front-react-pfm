import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import thunk from 'redux-thunk';
import { albumReducer } from '../reducers/albumReducer';
import { authReducer } from '../reducers/authReducer';
import { modalReducer } from '../reducers/modalReducer';
import { photoReducer } from '../reducers/photoReducer';

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
    photos: photoReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

import React from 'react';
import { Provider } from 'react-redux';

import { store } from './components/redux/store/store';
import { AppRouter } from './routers/AppRouter';

export const App = () => 
{
    // Con el Provider de redux puedo acceder a la información del fichero store.js en toda la app
    return (
        <Provider store={ store }>
           <AppRouter /> 
        </Provider>
    )
}

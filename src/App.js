import React, { useEffect, useReducer } from 'react'

import { AuthContext } from './components/auth/AuthContext'
import { authReducer } from './components/auth/authReducer'
import { AppRouter } from './routers/AppRouter'

/**
 * Creo un useReducer para almacenar los datos del usuario y y con el useContext
 * comparto los valores a todos los componentes de mi aplicación.
 * 
 * El AuthContext me permite englobar toda mi aplicación en él y poder acceder a
 * los datos que le indique, en este caso el usuario y el método dispatch
*/
const init = () =>
{
    return JSON.parse(localStorage.getItem('user_connect')) || {logged: false};
}

export const App = () => 
{
    const [user, dispatch] = useReducer(authReducer, {}, init)

    // Cada vez que haya un cambio en el valor del usuario lo almaceno
    useEffect(() => {
        localStorage.setItem('user_connect', JSON.stringify(user));
        
    }, [user])

    return (
        <AuthContext.Provider value={ {user, dispatch} }>
           <AppRouter /> 
        </AuthContext.Provider>
    )
}

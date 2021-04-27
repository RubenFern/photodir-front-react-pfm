import React, { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../auth/AuthContext';
import { NavBar } from '../layout/NavBar';
import { types } from '../types/types';

import './LoginScreen.css';

export const LoginScreen = ({ history }) => 
{
    const [state, handleInputChange] = useForm({
        user_name: '',
        password: ''
    });

    const {user_name, password} = state;

    // Uso el método dispatch que almacené en el useContext
    const { dispatch } = useContext(AuthContext);

    // Obtengo los valores del usuario
    const login = (e) =>
    {
        e.preventDefault();

        dispatch({
            type: types.login,
            payload: {
                name: 'Ruben'
            }
        });

        history.replace('/home');
    }

    return (
        <>
            <NavBar />

            <div className="text-white center-content">
                <form className="form-login" onSubmit={login}>
                    <h1 className="text-center">Bienvenido</h1>
                    <div className="form-group">
                        <label htmlFor="user_name">Nombre de usuario:</label>
                        <input 
                            type="text" 
                            id="user_name" 
                            name="user_name"
                            className="form-control" 
                            placeholder="Introduce tu nombre de usuario"
                            onChange={handleInputChange}
                            value={user_name}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            className="form-control" 
                            placeholder="Introduce tu contraseña"
                            autoComplete="on"
                            onChange={handleInputChange}
                            value={password} 
                        />
                    </div>
                    <br />
                    <div className="form-group submit">
                        <button className="btn btn-danger">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

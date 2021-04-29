import React, { useContext } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../auth/AuthContext';
import { NavBar } from '../layout/NavBar';
import { login as authLogin } from '../auth/auth';

import './LoginScreen.css';


export const LoginScreen = ({ history }) => 
{
    const [state, handleInputChange] = useForm({
        user_name: '',
        password: ''
    });

    const {user_name, password} = state;

    // Uso el método dispatch para que almacené en el useContext los datos de usuario
    const { user: {message}, dispatch } = useContext(AuthContext);

    // Obtengo los valores del usuario
    const login = async(e) =>
    {
        e.preventDefault();

        // Llamo al método de autenticación para guardar los datos de sesión del usuario en toda la aplicación
        await authLogin(user_name, password, dispatch, history);       
    }

    return (
        <>
            <NavBar />

            {
                (message) &&
                    <div className="container mt-5 m-auto alert alert-danger" role="alert">
                        {message}
                    </div>
            }

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

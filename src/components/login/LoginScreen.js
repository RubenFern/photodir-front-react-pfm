import React, { useContext, useState } from 'react';

import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../hooks/useContext';
import { NavBar } from '../layout/NavBar';
import { login as authLogin } from '../auth/auth';

import './LoginScreen.css';
import { Link } from 'react-router-dom';


export const LoginScreen = ({ history }) => 
{
    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

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

        // Si algún campo está vacío marco el error
        if (user_name === '' || password === '')
        {
            setvalid(false);
            return;
        }

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
                            className={`form-control ${ (!valid && user_name === '') && "is-invalid" } `}
                            placeholder="Introduce tu nombre de usuario"
                            onChange={handleInputChange}
                            value={user_name}
                        />
                        <div className="invalid-feedback">
                            Debes introducir tu nombre de usuario
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            className={`form-control ${ (!valid && password === '') && "is-invalid" } `} 
                            placeholder="Introduce tu contraseña"
                            autoComplete="on"
                            onChange={handleInputChange}
                            value={password} 
                        />
                        <div className="invalid-feedback">
                            Debes introducir tu contraseña
                        </div>
                    </div>
                    <br />
                    <div className="form-group submit">
                        <button className="btn btn-danger">
                            Iniciar Sesión
                        </button>
                    </div>
                    <p
                        className="text-center m-auto mt-4"
                    >
                        ¿No tienes una cuenta? <Link to="/registro" className="link"> Regístrate</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

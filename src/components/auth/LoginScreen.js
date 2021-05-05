import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { NavBar } from '../layout/NavBar';
import { startLogin } from '../redux/actions/auth';

import './LoginScreen.css';


export const LoginScreen = ({ history }) => 
{
    // Llamo al dispatch de Redux
    const dispatch = useDispatch();

    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

    const [formValues, handleInputChange] = useForm({
        userName: '',
        password: ''
    });

    const {userName, password} = formValues;

    // Obtengo los valores del usuario
    const login = (e) =>
    {
        e.preventDefault();

        // Si algún campo está vacío marco el error
        if (userName === '' || password === '')
        {
            setvalid(false);
            return;
        }

        // Llamo al método startLogin del action auth.js con los datos del usuario
        dispatch( startLogin(userName, password) );
    }

    return (
        <>
            <NavBar />

            <div className="text-white center-content bg-image">
                <form className="form-login" onSubmit={login}>
                    <h1 className="text-center">Bienvenido</h1>
                    <div className="form-group">
                        <label htmlFor="user_name">Nombre de usuario:</label>
                        <input 
                            type="text" 
                            id="userName" 
                            name="userName"
                            className={`form-control ${ (!valid && userName === '') && "is-invalid" } `}
                            placeholder="Introduce tu nombre de usuario"
                            onChange={handleInputChange}
                            value={userName}
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
                        ¿No tienes una cuenta? <NavLink exact to="/registro" className="link"> Regístrate</NavLink>
                    </p>
                </form>
            </div>
        </>
    )
}

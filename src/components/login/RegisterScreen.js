import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { validatePassword } from '../../helpers/validatePassword';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../hooks/useContext';
import { NavBar } from '../layout/NavBar';
import { register as authRegister } from '../auth/auth';

export const RegisterScreen = ({ history }) => 
{
    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        name: '',
        user_name: '',
        email: '',
        password: '',
        password2: '',
        image: ''
    });

    const { name, user_name, email, password, password2, image } = state;

    const { user: {message}, dispatch } = useContext(AuthContext);


    const register = async(e) =>
    {
        e.preventDefault();

        const validFields = validatePassword(password, password2);

        // Si las contraseñas coinciden dejo seguir el proceso de registro
        if (validFields)
        {
            setvalid(true);
        } else
        {
            setvalid(false);
            return;
        }

        // Si algún campo está vacío marco el error
        if (name === '' || user_name === '' || email === '' || password === '')
        {
            setvalid(false);
            return;
        }

        // Realizo la petición a la API para añadir el usuario
        await authRegister(state, dispatch, history);
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
                <form className="form-login" onSubmit={register}>
                    <h1 className="text-center">REGISTRO</h1>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            className={`form-control ${ (!valid && name === '') && "is-invalid" } `} 
                            placeholder="Introduce tu nombre"
                            onChange={handleInputChange}
                            value={name}
                        />
                        <div className="invalid-feedback">
                            Debes introducir un nombre
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="user_name">Nombre de usuario:</label>
                        <input 
                            type="text" 
                            id="user_name" 
                            name="user_name"
                            className={`form-control ${ (!valid && user_name === '') && "is-invalid" } `} 
                            placeholder="Introduce un nombre de usuario"
                            onChange={handleInputChange}
                            value={user_name}
                        />
                        <div className="invalid-feedback">
                            El nombre de usuario no es válido
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email"
                            className={`form-control ${ (!valid && email === '') && "is-invalid" } `}  
                            placeholder="Introduce tu correo electrónico"
                            onChange={handleInputChange}
                            value={email}
                        />
                        <div className="invalid-feedback">
                            El correo electrónico no es valido
                        </div>
                    </div>
                    <br />
                    <div className="form-group has-validation">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            className={`form-control ${ (!valid && password === '') && "is-invalid" } `} 
                            placeholder="Introduce una contraseña"
                            autoComplete="on"
                            onChange={handleInputChange}
                            value={password} 
                        />
                        <div className="invalid-feedback">
                            Debes introducir una contraseña
                        </div>
                    </div>
                    <br />
                    <div className="form-group has-validation">
                        <label htmlFor="password">Repite la contraseña:</label>
                        <input 
                            type="password" 
                            id="password2"
                            name="password2"
                            className={`form-control ${ (!valid && (password !== password2)) && "is-invalid" } `}  
                            placeholder="Introduce una contraseña"
                            autoComplete="on"
                            onChange={handleInputChange}
                            value={password2} 
                        />
                        <div className="invalid-feedback">
                            La contraseña no coincide
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="image">Foto de Perfil: (Opcional)</label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image"
                            className="form-control" 
                            placeholder="Introduce tu nombre de usuario"
                            onChange={handleInputChange}
                            value={image}
                        />
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
                        ¿Ya tienes una cuenta? <Link to="/login" className="link"> Inicia Sesión</Link>
                    </p>
                </form>
            </div>
        </>
    )
}

import React, { useContext } from 'react';

import { validatePassword } from '../../helpers/validatePassword';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../auth/AuthContext';
import { NavBar } from '../layout/NavBar';

export const RegisterScreen = ({ history }) => 
{
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


    const register = (e) =>
    {
        e.preventDefault();

        console.log(state)

        const validFields = validatePassword(password, password2);

        // Si las contraseñas coinciden dejo seguir el proceso de registro
        if (validFields)
        {
            console.log("contraseñas iguales")
        } else
        {
            console.log("Contraseñas noooooooooo")
        }
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
                            className="form-control" 
                            placeholder="Introduce tu nombre"
                            onChange={handleInputChange}
                            value={name}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="user_name">Nombre de usuario:</label>
                        <input 
                            type="text" 
                            id="user_name" 
                            name="user_name"
                            className="form-control" 
                            placeholder="Introduce un nombre de usuario"
                            onChange={handleInputChange}
                            value={user_name}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico:</label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email"
                            className="form-control" 
                            placeholder="Introduce tu correo electrónico"
                            onChange={handleInputChange}
                            value={email}
                        />
                    </div>
                    <br />
                    <div className="form-group has-validation">
                        <label htmlFor="password">Contraseña:</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            className="form-control" 
                            placeholder="Introduce una contraseña"
                            autoComplete="on"
                            onChange={handleInputChange}
                            value={password} 
                        />
                        <div className="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>
                    <br />
                    <div className="form-group has-validation">
                        <label htmlFor="password">Repite la contraseña:</label>
                        <input 
                            type="password" 
                            id="password2"
                            name="password2"
                            className="form-control" 
                            placeholder="Introduce una contraseña"
                            autoComplete="on"
                            onChange={handleInputChange}
                            value={password2} 
                        />
                        <div className="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="image">Foto de Perfil:</label>
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
                </form>
            </div>
        </>
    )
}

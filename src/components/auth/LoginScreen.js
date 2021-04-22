import React from 'react';
import { useForm } from '../../hooks/useForm';
import './LoginScreen.css';

export const LoginScreen = () => 
{
    const [state, handleInputChange, handleSubmit] = useForm({
        user_name: '',
        password: ''
    });

    const {user_name, password} = state;

    return (
        <div className="text-white center-content">
            

            <form className="form-login" onSubmit={handleSubmit}>
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
    )
}

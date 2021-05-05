import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { startLogout } from '../redux/actions/auth';

export const NavBar = () => 
{
    const dispatch = useDispatch();

    const { logged, user: { user_name } } = useSelector(state => state.auth);

    const logout = () =>
    {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-header">
            <div className="container">
                <NavLink className="navbar-brand" exact to="/home">PhotoDir</NavLink>
                {
                    (logged) &&
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>  
                }
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            (logged) && // Condición de si está logueado el usuario
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                                <li className="nav-item dropdown ">
                                    <span className="nav-link dropdown-toggle user" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user_name}
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li className="text-white">
                                            <span className="dropdown-item text-white">
                                                <button
                                                    className="nav-link btn"
                                                    onClick={logout}
                                                >
                                                    <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                                </button>
                                            </span>
                                        </li>
                                    </ul>
                                </li>

                            </ul>
                        }
                </div>
            </div>
        </nav>
    )
}

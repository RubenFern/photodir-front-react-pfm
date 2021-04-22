import React from 'react'

export const NavBar = () => 
{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-header">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home/:usuario">PhotoDir</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown ">
                            <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Nombre de usuario
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li className="text-white">
                                    <a className="dropdown-item text-white" href="logout">
                                        <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

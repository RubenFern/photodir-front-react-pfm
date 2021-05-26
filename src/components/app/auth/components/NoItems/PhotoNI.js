import React from 'react';

import './PhotoNI.css';

export const PhotoNI = () => 
{
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="mx-5 text-center">
                <i className="bi bi-emoji-frown emoji"></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h2 className="text-light text-center">Para que no tienes ninguna fotografía</h2>
                <p className="text-light text-center">
                    ¡Prueba a subir una!
                </p>
            </div>
        </div>
    )
}

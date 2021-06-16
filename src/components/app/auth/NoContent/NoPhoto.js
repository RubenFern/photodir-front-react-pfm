import React from 'react';

export const NoPhoto = () => 
{
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="mx-5 text-center">
                <i className="bi bi-images emoji"></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h2 className="text-light text-center">Parece que no tienes ninguna fotografía</h2>
                <p className="text-light text-center fs-4">
                    ¡Prueba a subir una!
                </p>
            </div>
        </div>
    )
}

import React from 'react';

export const NoAlbum = () => 
{
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="mx-5 text-center">
                <i className="bi bi-folder-x emoji"></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h2 className="text-light text-center">Parece que no tienes ningún álbum</h2>
                <p className="text-light text-center">
                    ¡Prueba a crear uno! Podrás guardar todas las fotografías que quieras.
                </p>
            </div>
        </div>
    )
}

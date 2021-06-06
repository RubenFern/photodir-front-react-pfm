import React from 'react';

export const PrivateProfile = () => 
{
    return (
        <div className="container">
            <div className="d-flex justify-content-center flex-column flex-md-row">
                <i className="bi bi-lock-fill text-light private text-center"></i>
                <div className="text-light text-center d-flex flex-column justify-content-center">
                    <h1>El perfil de este usuario es privado</h1>
                    <h3 className="text-gray mt-3">No puedes visualizar ninguno de sus álbumes ni fotografías.</h3>
                </div>
            </div>
        </div>
    )
}

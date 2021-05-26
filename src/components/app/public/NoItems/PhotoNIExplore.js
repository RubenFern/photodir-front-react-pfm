import React from 'react';

export const PhotoNIExplore = () => 
{
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="mx-5 text-center">
                <i className="bi bi-images emoji"></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h2 className="text-light text-center">Este usuario no tiene ninguna fotografía subida</h2>
            </div>
        </div>
    )
}

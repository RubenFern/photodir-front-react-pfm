import React from 'react';

export const NoAlbum = () => 
{
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="mx-5 text-center">
                <i className="bi bi-folder-x emoji"></i>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
                <h2 className="text-light text-center">Este usuario no cuenta con ningún álbum</h2>
            </div>
        </div>
    )
}
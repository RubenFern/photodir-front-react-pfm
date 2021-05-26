import React from 'react'
import { AlbumNI } from './AlbumNI'
import { PhotoNI } from './PhotoNI'

// Componente para mostrar que no hay contenido

export const NoItems = ({ object }) => 
{
    return (
        <div className="container d-flex justify-content-center align-items-center w-100">
        {
            (object === 'album') && <AlbumNI />
        }
        {
            (object === 'photo') && <PhotoNI />
        }
        </div>
    )
}

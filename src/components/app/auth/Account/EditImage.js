import React from 'react';
import { previewImage } from '../../../../helpers/previewImage';

export const EditImage = ({ setimage, setpath }) => 
{
    return (
        <div className="upload-image">
            <button className="button">Editar Imagen</button>
            <input 
                type="file"
                id="image"
                name="image" 
                onChange={(e) => previewImage(e, setimage, setpath)}
            />
        </div>
    )
}

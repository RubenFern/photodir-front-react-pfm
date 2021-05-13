import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../../../../hooks/useForm';
import { addPhoto } from '../../../../redux/actions/photo';

export const AddPhotoForm = ({closeModal, album}) => 
{
    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        title: '',
        description: '',
    });

    const [image, setimage] = useState(null);
    const { title, description } = state;

    const dispatch = useDispatch();

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Obligo a añadir una imagen
        if (!image)
        {
            setvalid(false);
            return;
        }

        // Realizo las peticiones a la API para guardar el álbum
        dispatch(addPhoto({title, description, image}, album));

        closeModal();
    }

    return (
        <form className="form-login" onSubmit={onSubmit} encType="multipart/formdata">
            <h3 className="text-center mb-3">Selecciona tu fotografía</h3>
            <div className="form-group">
                <label htmlFor="name">Título: <small className="small">(Opcional)</small></label>
                <input 
                    type="text" 
                    id="title" 
                    name="title"
                    className="form-control"
                    placeholder="Añade un título a la fotografía"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={title}
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="name">Descripción: <small className="small">(Opcional)</small></label>
                <textarea 
                    id="description" 
                    name="description"
                    rows="6"
                    className="form-control"
                    placeholder="Añade una descripción"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={description}
                >
                </textarea>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="image">Fotografía</label>
                <input
                    type="file"
                    className={`form-control ${ (!valid) && "is-invalid" } `} 
                    id="image"
                    name="image"
                    onChange={(e) => setimage(e.target.files[0])}
                />    
                <div className="invalid-feedback">
                    Debes subir una imagen
                </div>
            </div>
            <br />
            <button
                type="submit"
                className="btn w-100 bg-main-color"
            >
                
                <span className="text-light">Añadir</span>
            </button>
        </form>
    )
}

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../../hooks/useForm';
import { editAlbum } from '../../../redux/actions/album';

export const EditAlbumForm = ({ closeModal}) => 
{
    // Recibo los datos del álbum desde el state
    const { modalOpen, data: { uid, name: oldName, image: oldImage, description: oldDescription, creation_date } } = useSelector(state => state.modal);
    const { user: { user_name } } = useSelector(state => state.auth);

    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        name: oldName,
        description: oldDescription,
    });

    const [image, setimage] = useState(oldImage);
    const { name, description } = state;

    const dispatch = useDispatch();

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Obligo a escribir el nombre del álbum
        if (name === '')
        {
            setvalid(false);
            return;
        }

        // Realizo las peticiones a la API para editar el álbum
        dispatch(editAlbum({uid, name, description, image, creation_date, oldName, oldImage}));

        closeModal();
    }


    return (
        (modalOpen) &&
        <form className="form-login" onSubmit={onSubmit} encType="multipart/formdata">
            <div className="form-group d-flex justify-content-md-around mb-3">
                <div className="upload-image">
                    <button className="button">Editar Imagen</button>
                    <input 
                        type="file"
                        id="image"
                        name="image" 
                        onChange={(e) => setimage(e.target.files[0])}
                    />
                </div>
                <div>
                    <button className="button">Eliminar Imagen</button>
                </div>
            </div>
            
            <div className="form-group centrado">
                <div className="radius-image">
                    <img id="img" src={`http://localhost:3010/api/upload/album/${user_name}/${image}`} alt={image} />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className={`form-control ${ (!valid && oldName === '') && "is-invalid" } `} 
                    placeholder="¿Cómo quieres llamar al álbum?"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />
                <div className="invalid-feedback">
                    El álbum debe tener un nombre
                </div>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="name">Descripción: <small className="small">(Opcional)</small></label>
                <textarea 
                    id="description" 
                    name="description"
                    rows="4"
                    className="form-control"
                    placeholder="Añade una descripción"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={description}
                >
                </textarea>
            </div>
            <br />
            <button
                type="submit"
                className="btn btn-warning w-100 bg-secondary-color"
            >
                
                <span>Editar</span>
            </button>
        </form>
    )
}

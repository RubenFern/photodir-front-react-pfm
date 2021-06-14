import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { previewImage } from '../../../../../helpers/previewImage';
import { useForm } from '../../../../../hooks/useForm';
import { addAlbum } from '../../../../redux/actions/album';
import { Picture } from '../../components/Picture';

export const AddAlbum = ({ closeModal }) => 
{
    const { user: { user_name } } = useSelector(state => state.auth);

    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        name: '',
        description: '',
    });

    const [infoImage, setimage] = useState(null);
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

        // Compruebo que no use más de 180 caracteres
        if (description.length > 180)
        {
            setvalid(false);
            return;
        }

        // Realizo las peticiones a la API para guardar el álbum
        dispatch(addAlbum({user_name, name, description, infoImage}));

        closeModal();
    }

    // Path de la imagen del formulario
    const [path, setpath] = useState('');

    return (
        <form className="form" onSubmit={onSubmit} encType="multipart/formdata">
            <h3 className="text-center mb-3">Completa los datos del álbum</h3>
            <div className="form-group">
                {(path !== '') &&
                    <div className="form-group centrado">
                        <Picture path={path} image="preview.png" />
                    </div>}

                <label htmlFor="name">Nombre:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className={`form-control ${ (!valid && name === '') && "is-invalid" } `} 
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
                    rows="6"
                    className={`form-control ${ (!valid && description.length > 180) && "is-invalid" } `}
                    placeholder="Añade una descripción"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={description}
                >
                </textarea>
                <div className="invalid-feedback">
                    Has superado el límite de 180 caracteres
                </div>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="image">Imagen del álbum: <small className="small">(Opcional)</small></label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={(e) => previewImage(e, setimage, setpath)}
                />    
            </div>
            <br />
            <button
                type="submit"
                className="btn btn-warning w-100 bg-secondary-color"
            >
                
                <span> Crear</span>
            </button>
        </form>
    )
}

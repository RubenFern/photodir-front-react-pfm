import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../../../../../hooks/useForm';
import { addAlbum } from '../../../../redux/actions/album';

export const AddAlbumForm = ({ closeModal }) => 
{
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

        // Realizo las peticiones a la API para guardar el álbum
        dispatch(addAlbum({name, description, infoImage}));

        closeModal();
    }


    return (
        <form className="form-login" onSubmit={onSubmit} encType="multipart/formdata">
            <h3 className="text-center mb-3">Completa los datos del álbum</h3>
            <div className="form-group">
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
                <label htmlFor="image">Imagen del álbum: <small className="small">(Opcional)</small></label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    name="image"
                    onChange={(e) => setimage(e.target.files[0])}
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

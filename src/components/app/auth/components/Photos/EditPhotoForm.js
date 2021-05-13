import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../../../hooks/useForm';
import { editPhoto } from '../../../../redux/actions/photo';

export const EditPhotoForm = ({closeModal}) => 
{
    // Recojo los datos del state
    const { modalOpen, data: { uid, title: oldTitle, description: oldDescription } } = useSelector(state => state.modal);


    const [state, handleInputChange] = useForm({
        title: oldTitle,
        description: oldDescription,
    });

    const { title, description } = state;

    const dispatch = useDispatch();

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Si no hay ningún cambio no realizo la llamada a la API
        if (title === oldTitle && description === oldDescription)
        {
            closeModal();
            return;
        }

        // Realizo las peticiones a la API para guardar el álbum
        dispatch(editPhoto({uid, title, description}));

        closeModal();
    }

    return (
        (modalOpen) &&
        <form className="form-login" onSubmit={onSubmit} encType="multipart/formdata">
            <h3 className="text-center mb-3">¿Qué quieres editar?</h3>
            <div className="form-group">
                <label htmlFor="name">Título: </label>
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
                <label htmlFor="name">Descripción: </label>
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
            <button
                type="submit"
                className="btn w-100 bg-main-color"
            >
                
                <span className="text-light">Editar</span>
            </button>
        </form>
    )
}

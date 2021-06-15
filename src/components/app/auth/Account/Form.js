import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { useForm } from '../../../../hooks/useForm';
import { editUser } from '../../../redux/actions/user';
import { Picture } from '../components/Picture';
import { DeleteAvatar } from './DeleteAvatar';
import { EditAvatar } from './EditAvatar';

export const Form = ({ oldName, image, oldImage, setimage }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();
    const [valid, setvalid] = useState(true);

    // Path de la imagen del formulario
    const [path, setpath] = useState('');

    const [state, handleInputChange] = useForm({
        name: oldName,
        password: '',
        password2: '',
    });

    const { name, password, password2 } = state;

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Si no hay ningún cambio bloqueo la petición
        if (name === oldName && password === '' && path === '')
        {
            return;
        }

        if (password !== '' && (password !== password2))
        {
            setvalid(false);
            return;
        }

        dispatch(editUser({ name, password, image, oldImage }, history));
    }

    return (
        <form className="form-login mt-5" onSubmit={onSubmit} encType="multipart/formdata">
            <div className="form-group d-flex justify-content-md-around mb-3">
                <EditAvatar setimage={ setimage } setpath={ setpath } />
                <DeleteAvatar image={ oldImage } />
            </div>
            
            <div className="form-group centrado">
                {(path !== '') &&
                <div className="form-group centrado">
                    <Picture path={path} image="preview.png" avatar={true} />
                </div>}
            </div>

            <div className="form-group">
                <label htmlFor="name" className="text-light">Nombre:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="form-control" 
                    placeholder="Edita tu nombre (No aplica al nombre de usuario)"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={name}
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="name" className="text-light">Contraseña:</label>
                <input 
                    id="password" 
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Cambia tu contraseña actual"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={password}
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="name" className="text-light">Repite la Contraseña:</label>
                <input 
                    id="password2" 
                    name="password2"
                    type="password"
                    className={`form-control ${ (!valid && (password !== password2)) && "is-invalid" } `}
                    placeholder="Repite la nueva contraseña"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={password2}
                />
                <div className="invalid-feedback">
                    La contraseña no coincide
                </div>
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

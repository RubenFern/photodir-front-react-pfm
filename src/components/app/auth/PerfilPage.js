import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import { NavBar } from '../../layout/NavBar';
import { editUser } from '../../redux/actions/user';
import { DeleteUser } from './components/User/DeleteUser';

export const PerfilPage = ({ history }) => 
{
    const { user: { user_name, name: oldName, image: oldImage } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        name: oldName,
        password: '',
        password2: '',
    });

    const [image, setimage] = useState(oldImage);
    const { name, password, password2 } = state;

    const onSubmit = (e) =>
    {
        e.preventDefault();

        if (password !== '' && (password !== password2))
        {
            setvalid(false);
            return;
        }

        dispatch(editUser({ name, password, image, oldImage }, history));
    }

    return (
        <>
            <NavBar />

            <div className="container mt-5">

                {
                    // Cabecera con la información del usuario
                }
                <div className="container">
                    
                </div>    
                
                {
                    // Formulario para editar el usuario
                }
                <div className="container d-flex justify-content-center">
                <form className="form-login w-50" onSubmit={onSubmit} encType="multipart/formdata">
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
                            <img id="img" src={`http://localhost:3010/api/upload/avatar/${user_name}/${image}`} alt={image} />
                        </div>
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
                </div>
                
                <DeleteUser history={history} />
            </div>
        </>
    )
}

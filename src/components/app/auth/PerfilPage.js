import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import { NavBar } from '../../layout/NavBar';
import { editUser } from '../../redux/actions/user';
import { Avatar } from './components/User/Avatar';
import { DeleteUser } from './components/User/DeleteUser';
import { Picture } from './components/Picture';
import { previewImage } from '../../../helpers/previewImage';

export const PerfilPage = ({ history }) => 
{
    const { user: { user_name, name: oldName, image: oldImage, creation_date } } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        name: '',
        password: '',
        password2: '',
    });

    const [image, setimage] = useState(oldImage);
    const { name, password, password2 } = state;

    const onSubmit = (e) =>
    {
        e.preventDefault();

        console.log(1)

        if (password !== '' && (password !== password2))
        {
            setvalid(false);
            return;
        }

        dispatch(editUser({ name, password, image, oldImage }, history));
    }

    // Path de la imagen del formulario
    const [path, setpath] = useState('');

    return (
        <>
            <NavBar />

            <div className="container-fluid mt-5">

                {
                    // Cabecera con la información del usuario
                }
                <div className="d-flex container flex-column flex-md-row justify-content-between align-items-center">
                    <div className="d-flex">
                        <div>
                            <Avatar user_name={user_name} image={image} />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-center">
                            <h3 className="text-light fw-bold">{ user_name }</h3>
                            <h5 className="text-grey-cs">{ oldName }</h5>
                            <h4 className="text-grey-cs"><small className="text-light">Cuenta creada: </small> { creation_date }</h4>
                        </div>
                    </div>

                    <div>
                        <DeleteUser history={history} />
                    </div>
                </div> 
                
                {
                    // Formulario para editar el usuario
                }
                <div className="container d-flex align-items-center flex-column">
                <form className="form-login" onSubmit={onSubmit} encType="multipart/formdata">
                    <div className="form-group d-flex justify-content-md-around mb-3">
                        <div className="upload-image">
                            <button className="button">Editar Imagen</button>
                            <input 
                                type="file"
                                id="image"
                                name="image" 
                                onChange={(e) => previewImage(e, setimage, setpath)}
                            />
                        </div>
                        <div>
                            <button className="button">Eliminar Imagen</button>
                        </div>
                    </div>
                    
                    <div className="form-group centrado">
                        {(path !== '') &&
                        <div className="form-group centrado">
                            <Picture path={path} image="preview.png" />
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
                </div>
                   
            </div>
        </>
    )
}

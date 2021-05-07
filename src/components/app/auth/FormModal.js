import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../../hooks/useForm';
import { addAlbum } from '../../redux/actions/album';
import { types } from '../../redux/types/types';


// CSS de React-Modal
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
ReactModal.setAppElement('#root');

export const FormModal = () => 
{
    const dispatch = useDispatch();
    const { modalOpen } = useSelector(state => state.modal)   

    const closeModal = () =>
    {
        dispatch({type: types.closeModal});
    }

    // Creo el state para validar los campos del formulario
    const [valid, setvalid] = useState(true);

    const [state, handleInputChange] = useForm({
        name: 'test17',
        description: 'test17',
    });

    const [infoImagen, setimage] = useState(null);
    const { name, description } = state;

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
        dispatch(addAlbum({name, description, infoImagen}));

        closeModal();
    }

    return (
        <ReactModal
          isOpen={modalOpen}
          //onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS={250}
          className="modal"
          overlayClassName="modal-fondo"
        >
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
                    <label htmlFor="name">Descripción:</label>
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
                    <label htmlFor="image">Imagen del álbum:</label>
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
        </ReactModal>
    )
}

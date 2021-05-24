import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';

import { back } from '../../../helpers/back';
import { NavBar } from '../../layout/NavBar';
import { getPhotos } from '../../redux/actions/photo';

export const AlbumUserPage = ({ history }) => 
{
    const { username, album } = useParams();
    const photos = useSelector(state => state.photos);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        // Busco las imágenes del álbum del usuario
        dispatch(getPhotos(`${username}/${album}`));
        console.log("Albums users")

    }, [dispatch, username, album]);

    return (
        <>
            <NavBar />

            <div className="container-fluid w-img mt-5 animate__animated animate__fadeIn">
                <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                    <div className="d-flex align-items-center">
                        <h1 className="text-light text-center"><i className="bi bi-arrow-left-circle text-light pointer" onClick={() => back(history)}></i> {album}</h1>
                    </div>
                </div>                

                <div className="container-fluid gallery pointer mt-3">
	
                {
                // Usar 2 componentes 
                (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({image, uid = '', title, description, creation_date}) => 
                (
                    // En el NavLink retorno las props de la imagen
                    <NavLink to={`/explore/${username}/${album}/${image}`} className="gallery-item" key={uid}>
                        <img 
                            className="gallery-img" 
                            src={`http://localhost:3010/api/upload/photo/${username}/${image}`} 
                            alt={image}
                        />
                    </NavLink>

                )) : <h2 className="text-light">Este usuario no tiene fotografías :(</h2>
                }
                    
                </div>
            </div>
        </>
    )
}

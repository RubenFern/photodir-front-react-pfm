import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { back } from '../../../../helpers/back';
import { getPhotos } from '../../../redux/actions/explore';
import { NoItemsExplore } from '../NoItems/NoItemsExplore';
import { PhotoCardExplore } from './PhotoCardExplore';

export const Album = ({ user_name, album }) => 
{
    const [loading, setloading] = useState(true);

    // Le doy margen de carga a las imágenes
    setTimeout(() => 
    {
        setloading(false);
    }, 100);

    const photos = useSelector(state => state.photos);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => 
    {
        // Busco las imágenes del álbum del usuario
        dispatch(getPhotos({user_name, album}, history));
        console.log("Albums users")

    }, [dispatch, user_name, album, history]);

    return (
        <div className="container-fluid w-img mt-5 animate__animated animate__fadeIn">
            <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                <div className="d-flex align-items-center">
                    <h1 className="text-light text-center">
                        <i className="bi bi-arrow-left-circle text-light pointer" onClick={() => back(history)}></i>
                        <span className="text-white-50"> Álbum:</span> {album}
                    </h1>
                </div>
            </div>                

        {
            (loading)
            ?
            <div className="container-fluid gallery pointer mt-3">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <div className="container-fluid gallery pointer mt-3">
            {
            (photos !== undefined && photos.length > 0) ? photos.reverse().map( ({ image, fileImage, uid = '' }) => 
            (
                <PhotoCardExplore key={uid} uid={uid} album={album} image={image} fileImage={fileImage} user_name={user_name} />

            )) : <NoItemsExplore object="photo" />
            }   
            </div>
        }
            
        </div>
    )
}

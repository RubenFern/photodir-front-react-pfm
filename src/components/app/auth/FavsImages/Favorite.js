import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { back } from '../../../../helpers/back';
import { getFavImages } from '../../../redux/actions/like';
import { PhotoCardExplore } from '../../public/Album/PhotoCardExplore';

export const Favorite = () => 
{
    // Monto el componente
    const mounted = useRef(true);
    const dispatch = useDispatch();
    const history = useHistory();

    const { user: { user_name } } = useSelector(state => state.auth);

    const photos = useSelector(state => state.favorite);

    const [loading, setloading] = useState(true);


    useEffect(() => 
    {
        if (mounted.current)
        {
            dispatch(getFavImages(user_name));
        }

        return () => 
        {
            mounted.current = false;
        }
    }, [user_name, dispatch]);

    // Le doy margen de carga a las imágenes
    setTimeout(() => 
    {
        if (mounted.current)
        {
            setloading(false);
        }
    }, 250);

    return (
        <>
        <div className="container-fluid w-img mt-5 pb-4">
            <div className="d-flex flex-column flex-md-row justify-content-md-around align-items-center">
                <div className="d-flex align-items-center">
                    <h1 className="text-light text-center">
                        <i className="bi bi-arrow-left-circle text-light pointer" onClick={() => back(history)}></i>
                        <span className="text-white-50"> 
                        { (photos !== undefined && photos.length > 0) ? ' Imágenes que te han gustado' : ' Parece que no te gusta ninguna imagen...' }
                        </span>
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
            <div className="container-fluid gallery pointer mt-3 animate__animated animate__fadeIn">
                {(photos !== undefined && photos.length > 0) ? photos.map( ({ uid, album_name, image, fileImage, user_name: username }) => 
                (
                    <PhotoCardExplore key={uid} uid={uid} album={album_name} image={image} fileImage={fileImage} user_name={username} />

                )) : <div className="text-light mt-4">
                        <h2 className="text-center">
                            ¡Usa el buscador para mirar las fotografías de otros usuarios! <i className="bi bi-globe"></i>
                        </h2>
                    </div>}
            </div>
            
            }
        </div>
        </>
    )
}

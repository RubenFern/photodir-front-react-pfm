import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { back } from '../../../helpers/back';
import { NavBar } from '../../layout/NavBar';
import { getAlbums } from '../../redux/actions/album';
import { getUser } from '../../redux/actions/explore';
import { types } from '../../redux/types/types';
import { AlbumCard } from '../auth/components/Albums/AlbumCard';
import { InfoUser } from '../auth/components/User/InfoUser';
import { NoItemsExplore } from './NoItems/NoItemsExplore';


export const HomeUserPage = ({ history }) => 
{
    const { username } = useParams();
    const user = useSelector(state => state.explore);

    const album = useSelector(state => state.album);

    const dispatch = useDispatch();

    useEffect(() => 
    {
        dispatch({
            type: types.viewUsers,
            payload: []
        });

        // Realizo las peticiones para obtener la información de usuario y los álbumes
        dispatch(getUser(username));
        dispatch(getAlbums(username, history));

        console.log("Home usuarios")

    }, [dispatch, history, username]);

    return (
        <>
        <NavBar />

        <div className="container-fluid mt-5">
            <div className="container">
                <i className="bi bi-arrow-left-circle text-light pointer fs-1" onClick={() => back(history)}></i>
            </div>
            {(user.length > 0) &&<InfoUser user={user[0]} numAlbums={album.length} />}
           
            <ul className="container-fluid card-list animate__animated animate__fadeIn">

                {
                    // Usar 2 componentes 
                    (album !== undefined && album.length > 0) ? album.reverse().map( ({image, uid = '', name, description, creation_date}) => 
                    (
                        <AlbumCard key={uid} uid={uid} image={image} name={name} description={description} creation_date={creation_date} user_name={username} />

                    )) : <NoItemsExplore object="album" />
                }
                
            </ul>
            </div>
        </>
    )
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { getAlbums } from '../../../redux/actions/explore';
import { NoItemsExplore } from '../NoItems/NoItemsExplore';
import { AlbumCardExplore } from './AlbumCardExplore';


export const Home = ({ username }) => 
{
    const dispatch = useDispatch();
    const history = useHistory();

    const album = useSelector(state => state.album);

    useEffect(() => 
    {
        dispatch(getAlbums(username, history));

        console.log("imprimo albums")

    }, [dispatch, history, username]);

    return (
        <>
            <ul className="container-fluid card-list animate__animated animate__fadeIn">
            {// Usar 2 componentes 
                (album !== undefined && album.length > 0) ? album.reverse().map( ({image, fileImage, uid = '', name, description, creation_date}) => 
                (
                    <AlbumCardExplore key={uid} uid={uid} image={image} fileImage={fileImage} name={name} description={description} creation_date={creation_date} user_name={username} />

                )) : <NoItemsExplore object="album" />}
            </ul>
        </>
    )
}

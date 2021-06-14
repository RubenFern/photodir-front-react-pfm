import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { NavBar } from '../../layout/NavBar';
import { Album } from './Album/Album';
import { PrivateProfile } from './PrivateProfile';
import { getUser } from '../../redux/actions/explore';
import { useHistory } from 'react-router-dom';


export const AlbumUserPage = () => 
{
    const { username, album } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.explore);
    const { private_profile } = user;

    useEffect(() => 
    {
        // Realizo las peticiones para obtener la información de usuario
        dispatch(getUser(username, history));
        console.log('fotos usuarios explore')

    }, [dispatch, history, username]);
    
    return (
        <>
            <NavBar />

            { (private_profile) ? <PrivateProfile /> : <Album user_name={username} album={album} /> }  
        </>
    )
}

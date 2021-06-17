import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { NavBar } from '../../layout/NavBar';
import { Photo } from './Photo/Photo';
import { getUser } from '../../redux/actions/explore';
import { PrivateProfile } from './PrivateProfile';

import './../auth/PhotoItem.css';

export const PhotoUserPage = () => 
{
    // Monto el componente. Si al entrar en la página se monta y seguidameete se desmonta el componete limpio el proceso
    const mounted = useRef(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const { username, photo } = useParams();
    const { private_profile } = useSelector(state => state.explore);

    useEffect(() => 
    {
        if (mounted.current)
        {
            // Realizo las peticiones para obtener la información de usuario
            dispatch(getUser(username, history));
        }

        // Desmonto el componente al salir
        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, history, username]);

    return (
        <>
            <NavBar />
            
            { (private_profile) 
            ? 
            <PrivateProfile /> 
            : 
            <div className="container">
                <Photo user_name={username} photo={photo} />
            </div> }  
        </>
    )
}

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { back } from '../../../helpers/back';

import { NavBar } from '../../layout/NavBar';
import { getUser } from '../../redux/actions/admin';
import { Albums } from './albums/Albums';

export const UserAlbumsPage = ({ history }) => 
{
    // Monto el componente
    const mounted = useRef(true);

    const { username } = useParams();
    const user = useSelector(state => state.explore);

    // Si el usuario es admin no tiene álbumes por que lo saco
    if (user.is_admin)
    {
        back(history);
    }

    const dispatch = useDispatch();

    useEffect(() => 
    {
        if (mounted.current)
        {
            // Realizo las peticiones para obtener la información de usuario
            dispatch(getUser(username, history));
        }
        
        console.log("albums del usuario")

        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, history, username]);

    return (
        <>
        <NavBar />

        <div className="container mt-3 pb-4">
            <h1 className="text-gray mb-4">Álbums del usuario <span className="text-light">{ username }</span></h1>

            <Albums />
        </div>
        </>
    )
}

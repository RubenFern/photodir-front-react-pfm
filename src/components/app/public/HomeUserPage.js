import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { back } from '../../../helpers/back';
import { NavBar } from '../../layout/NavBar';
import { getUser } from '../../redux/actions/explore';
import { InfoUser } from '../auth/components/User/InfoUser';
import { ReportImage } from './components/ReportImage';
import { Home } from './Home/Home';
import { PrivateProfile } from './PrivateProfile';

export const HomeUserPage = ({ history }) => 
{
    // Monto el componente
    const mounted = useRef(true);

    // Si al entrar en la página se monta y seguidameete se desmonta el componete limpio el proceso
    useEffect(() => 
    {
        return () => 
        {
            mounted.current = false;
        }
    }, []);

    const { username } = useParams();

    const user = useSelector(state => state.explore);
    const album = useSelector(state => state.album);

    // Compruebo si el usuario tiene el perfil público
    const { private_profile } = user;

    const dispatch = useDispatch();

    useEffect(() => 
    {
        if (mounted.current)
        {
            // Realizo las peticiones para obtener la información de usuario
            dispatch(getUser(username, history));
        }
        
        console.log("Home usuarios")

        return () => 
        {
            mounted.current = false;
        }

    }, [dispatch, history, username]);

    return (
        <>
        <NavBar />

        <div className="container-fluid mt-4">
            <div data-bs-toggle="tooltip" data-bs-html="true" title="Reporta el avatar del usuario"><ReportImage /></div>
            <div className="container">
                <i className="bi bi-arrow-left-circle text-light pointer fs-1" onClick={() => back(history)}></i>
            </div>
                
            <InfoUser user={user} numAlbums={album.length} />
           
            { (private_profile) ? <PrivateProfile /> : <Home username={username} /> }
            
        </div>
        </>
    )
}

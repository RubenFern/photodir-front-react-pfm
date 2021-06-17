import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { back } from '../../../helpers/back';
import { NavBar } from '../../layout/NavBar';
import { getAlbums, getUser } from '../../redux/actions/explore';
import { InfoUser } from '../auth/User/InfoUser';
import { ReportImage } from './components/ReportImage';
import { Home } from './Home/Home';
import { PrivateProfile } from './PrivateProfile';

export const HomeUserPage = () => 
{
    const history = useHistory();

    const { username } = useParams();

    const user = useSelector(state => state.explore);
    const album = useSelector(state => state.album); // Obtengo los álbumes en el componente Home

    // Compruebo si el usuario tiene el perfil público
    const { private_profile } = user;

    const dispatch = useDispatch();

    useEffect(() => 
    {
        // Realizo las peticiones para obtener la información de usuario
        dispatch(getUser(username, history));
        dispatch(getAlbums(username, history)); 
        
    }, [dispatch, history, username]);

    return (
        <>
        <NavBar />

        <div className="container-fluid mt-4 pb-4">
            <div data-bs-toggle="tooltip" data-bs-html="true" title="Reporta el avatar del usuario">
                <ReportImage category='avatar' image={user.image} user_reported={user.user_name} />
            </div>
            <div className="container">
                <i className="bi bi-arrow-left-circle text-light pointer fs-1" onClick={() => back(history)}></i>
            </div>
                
            <InfoUser user={user} numAlbums={album.length} />
           
            { (private_profile) ? <PrivateProfile /> : <Home username={username} /> }
            
        </div>
        </>
    )
}

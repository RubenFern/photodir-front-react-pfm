import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { back } from '../../../helpers/back';
import { NavBar } from '../../layout/NavBar';
import { getUser } from '../../redux/actions/explore';
import { InfoUser } from '../auth/components/User/InfoUser';
import { Home } from './Home/Home';
import { PrivateProfile } from './PrivateProfile';

export const HomeUserPage = ({ history }) => 
{
    const { username } = useParams();

    const user = useSelector(state => state.explore);
    const album = useSelector(state => state.album);

    // Compruebo si el usuario tiene el perfil público
    const { private_profile } = user;

    const dispatch = useDispatch();

    useEffect(() => 
    {
        // Realizo las peticiones para obtener la información de usuario
        dispatch(getUser(username, history));
        
        console.log("Home usuarios")

    }, [dispatch, history, username]);

    return (
        <>
        <NavBar />

        <div className="container-fluid mt-5">
            <div className="container">
                <i className="bi bi-arrow-left-circle text-light pointer fs-1" onClick={() => back(history)}></i>
            </div>
                
            <InfoUser user={user} numAlbums={album.length} />
           
            { (private_profile) ? <PrivateProfile /> : <Home username={username} /> }
            
        </div>
        </>
    )
}

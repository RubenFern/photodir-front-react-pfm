import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { searchUsers } from '../redux/actions/user';
import { types } from '../redux/types/types';

import './Search.css';

export const Search = () => 
{
    /**
     * Mediante el estado de la búsqueda, cada vez que cambia realizo una petición a la API para listar los usuarios
     */
    const [search, setSearch] = useState('');
    const [show, setshow] = useState(false);
    const dispatch = useDispatch();
    
    // recojo los usarios buscados
    const users = useSelector(state => state.user);

    const handleInputChange = ({ target }) =>
    {
        setSearch(target.value);
    }

    // Cuando el buscador sufra un cambio realizo la petición a la API
    useEffect(() => 
    {
        if (search !== '')
        {
            dispatch(searchUsers(search));
            setshow(true);
        } else
        {
            dispatch({
                type: types.viewUsers,
                payload: []
            });
        }   
    }, [dispatch, search]);

    // Elimino el contenido del buscador al renderizar la página
    useEffect(() => 
    {
        setSearch('');        
    }, []);

    // Al pinchar fuera del buscador cierro la sugerencia
    const closeAutocomplete = () =>
    {
        setshow(false);
    }

    return (
        <div className="searchbox">
            <div className="searchbar">
                <input
                    id="search"
                    name="search"
                    value={search}
                    onChange={handleInputChange}
                    onBlur={closeAutocomplete}
                    autoComplete="off"
                    type="text" 
                    placeholder="Busca a un usuario..."
                    className="form-control"
                />

            {
            (users.length > 0 && show) 
            ? 
                <div className="results">
                {
                users.map( ({ user_name, image, private_profile }) =>
                (
                    <NavLink 
                        className="li list-group-item" 
                        to={`/explore/${user_name}`} 
                        key={user_name}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                            <img 
                                className="image_user" 
                                src={`http://localhost:3010/api/upload/avatar/${user_name}/${image}`} 
                                alt={image} 
                                />
                                
                                <span className="mx-2">{user_name}</span>  
                            </div>
                            <div>
                                {
                                (private_profile)
                                ?
                                <i className="bi bi-lock-fill"></i>
                                :
                                <i className="bi bi-unlock-fill"></i>
                                }
                            </div>
                            
                        </div>
                    </NavLink>
                ))
                }
                </div>
            :
                <div></div>
            }

                <div className="icon">
                    <i className="bi bi-search"></i>
                </div>
            </div>     
        </div>
    )
}

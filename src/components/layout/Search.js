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
    }, [])

    return (
        <div className="searchbox">
            <div className="searchbar">
                <input
                    id="search"
                    name="search"
                    value={search}
                    onChange={handleInputChange}
                    autoComplete="off"
                    type="text" 
                    placeholder="Busca a un usuario..."
                    className="form-control"
                />

            {
            (users.length > 0) 
            ? 
                <div className="results">
                {
                users.map( ({ user_name }) =>
                (
                    <NavLink 
                        className="li list-group-item" 
                        to={`/explore/${user_name}`} 
                        key={user_name}
                    >
                        {user_name}
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

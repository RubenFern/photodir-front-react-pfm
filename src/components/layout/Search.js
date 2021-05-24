import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { searchUsers } from '../redux/actions/user';
import { types } from '../redux/types/types';



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
        
    }, [dispatch, search])


    return (
        <div className="d-flex w-100 flex-column searchbar mx-lg-5 mt-2 mt-lg-0">
            <input 
                id="search"
                name="search"
                value={search}
                onChange={handleInputChange}
                autoComplete="off"
                type="search"
                placeholder="Busca un usuario..."
                className="form-control"
            />
            {
            (users.length > 0) 
            ? 
            <div id="results" className="list-group">
                {
                users.map( ({ user_name }) =>
                (
                    <NavLink 
                        className="bg-success list-group-item" 
                        to={`/explore/${user_name}`} 
                        key={user_name}
                    >
                        <h3>{user_name}</h3>
                    </NavLink>
                ))
                }
            </div>
            :
            <div></div>
            }
        </div>
    )
}

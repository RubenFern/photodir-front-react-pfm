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
        <div className="d-flex flex-column text-center w-100 mx-5">
            <input 
                id="search"
                name="search"
                value={search}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Busca un usuario..."
                className="h-25 w-100"
            />
            {
            (users.length > 0) 
            ? 
            <div id="results" className="d-block">
                {
                users.map( ({ user_name }) =>
                (
                    <NavLink to={`/explore/${user_name}`} key={user_name}>
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

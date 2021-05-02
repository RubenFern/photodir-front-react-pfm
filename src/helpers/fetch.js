const api = process.env.REACT_APP_API_URL;

// Peticiones a mi API sin Token de acceso
const fetchNoToken = (endpoint, data, method = 'GET') =>
{
    const url = `${api}/${endpoint}`;

    if (method === 'GET')
    {
        return fetch(url);
    } else
    {
        return fetch(url, 
        {
            method,
            headers: 
            {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

// Peticiones a mi API con Token de acceso
const fetchWithToken = (endpoint, data, method = 'GET') =>
{
    const url = `${api}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET')
    {
        return fetch(url,
        {
            method,
            headers: {
                'ky-token': token,
            }
        });
    } else
    {
        return fetch(url, 
        {
            method,
            headers: 
            {
                'Content-type': 'application/json',
                'ky-token': token
            },
            body: JSON.stringify(data)
        });
    }
}

export 
{
    fetchNoToken,
    fetchWithToken
}
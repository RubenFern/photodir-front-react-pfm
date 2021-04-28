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
const fetchToken = (path, data, method = 'GET') =>
{

}

export 
{
    fetchNoToken,
    fetchToken
}
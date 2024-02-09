import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/`;
const header = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
};

const doRequest = ( endpoint: string, method:string, data: any ) => {
    return callAxios(endpoint, method, data, {...header});
};

const addAnnonce = ( endpoint: string, method: string, data:any ) => {
    let headers = {...header,  'Content-Type': 'application/json' };
    console.log(headers);
    return callAxios( endpoint, method, data, headers ); 
};

const callAxios = ( endpoint: string, method:string, data: any, headers: any ) => {
    return axios.request( {
        headers: headers,
        method: method,
        url: apiUrl + endpoint,
        data: data
    } );
};

export {doRequest, addAnnonce};

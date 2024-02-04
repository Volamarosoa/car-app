import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/`;
const header = {
    Authorization: 'Bearer ' + sessionStorage.getItem('token')
};
const fetchData = ( endpoint: string ) => {
    return axios.request( {
        headers: header,
        method: 'GET',
        url: apiUrl + endpoint
    } );
};

const addCar = ( endpoint: string, data: any ) => {
    return axios.request(
        {
            headers: {...header, "Content-Type" : "Application/json"},
            method: 'POST',
            data: data,
            url: apiUrl + endpoint
        }
    )
};

export { fetchData, addCar };

// Bon ny marque manana modele[] -> Ny modele indray manana -> categorie
//                                                          -> moteur -> moteur manana -> type de carburant
//                                                                                     -> type de vitesse
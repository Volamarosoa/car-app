import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/annonces`; // Remplacez par l'URL de votre API

const annonceService = async (method : string, endpoint : string, data : null | object) => {
  try {
    console.log(data);
    const response = await axios({
      method,
      url: `${apiUrl}/${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default annonceService;

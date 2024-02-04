import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/users`; // Remplacez par l'URL de votre API

const usersService = async (method : string, endpoint : string, data : null | object) => {
  try {
    console.log(data);
    const response = await axios({
      method,
      url: `${apiUrl}/${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default usersService;

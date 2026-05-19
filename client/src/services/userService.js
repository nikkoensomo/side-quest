import api from '../api/axios.js';

export const getLoggedInUser = async () => {
    const response = await api.get('/users');
    return response.data;
}

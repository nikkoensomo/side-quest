import api from '../api/axios.js';

export const getLoggedInUser = async () => {
    const response = await api.get('/users/logged-user');
    return response.data;
}

export const deleteUserAccountService = async (userId) => {
    const response = await api.delete('/users');
    return response.data;
}
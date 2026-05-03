import api from '../api/axios.js';

export const getLoggedInUser = async () => {
    const response = await api.get('/users/get-logged-user');
    return response.data;
}

export const getUserTask = async () => {
    const response = await api.get('/users/display-task')
}
import api from '../api/axios.js';

export const signupService = async (formData) => {
    const response = await api.post('/auth/signup', formData);
    return response.data;
}

export const loginService = async (formData) => {
    const response = await api.post('/aut/login', formData);
    return response.data;
}  
import api from "../api/axios";

export const getUserTasksService = async () => {
    const response = await api.get('/tasks');
    return response.data;
}

export const createTasksService = async (formData) => {
    const response = await api.post('/tasks', formData);
    return response.data;
}

export const deleteUserTask = async () => {
    // TODO:
}
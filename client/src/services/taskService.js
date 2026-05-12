import api from "../api/axios";

export const getUserTasksService = async () => {
    const response = await api.get('/tasks/display-task');
    return response.data;
}

export const deleteUserTask = async () => {
    // TODO:
}
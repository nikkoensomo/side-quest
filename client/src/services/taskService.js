import api from "../api/axios";

export const getUserTask = async () => {
    const response = await api.get('/users/display-task');
    return response.data;
}

export const deleteUserTask = async () => {
    // TODO:
}
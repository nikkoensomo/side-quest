import api from "../api/axios";

export const getUserQuestService = async () => {
    const response = await api.get('/quests');
    return response.data;
}

export const createQuestService = async (formData) => {
    const response = await api.post('/quests', formData);
    return response.data;
}

export const deleteQuestService = async () => {
    // TODO:
}
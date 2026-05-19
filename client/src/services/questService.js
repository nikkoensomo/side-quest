import api from "../api/axios";

export const getAllQuestsService = async () => {
    const response = await api.get('/quests');
    return response.data;
}

export const getUserQuestService = async () => {
    const response = await api.get('/quests/my-quests');
    return response.data;
}

export const createQuestService = async (formData) => {
    const response = await api.post('/quests', formData);
    return response.data;
}

export const acceptQuestService = async (questId) => {
    const response = await api.put(`/quests/accept/${questId}`);
    return response.data;
}

export const deleteQuestService = async () => {
    // TODO:
}
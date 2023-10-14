import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:7007"
});

export const retrieveAllSession = () => apiClient.get(`/academicsession`)

export const retrieveSession = (id) => apiClient.get(`/academicsession/${id}`)

export const createSession = (session) => apiClient.post(`/academicsession`,session)

export const updateSession = (id, session) => apiClient.put(`/academicsession/${id}`,session)
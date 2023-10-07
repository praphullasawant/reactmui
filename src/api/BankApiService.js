import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:7007"
});

export const retriveAllBanks = () => apiClient.get(`/bank`)

export const retrieveBankApi = (id) => apiClient.get(`/bank/${id}`) 
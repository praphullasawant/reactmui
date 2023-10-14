import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:7007"
});

export const retrieveAllCashbook = () => apiClient.get(`/cashbook`);

export const retrieveCashbook = (id) => apiClient.get(`/cashbook/${id}`)

export const createCashbook = (cashbook) => apiClient.post(`/cashbook`,cashbook)

export const updateCashbook = (id, cashbook) => apiClient.put(`/cashbook/${id}`,cashbook);
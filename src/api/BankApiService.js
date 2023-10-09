import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7007",
});

export const retriveAllBanks = () => apiClient.get(`/bank`);

export const retrieveBankApi = (id) => apiClient.get(`/bank/${id}`);

export const updateBankApi = (id, bank) => apiClient.put(`/bank/${id}`, bank);

export const createBankApi = (bank) => apiClient.post(`/bank`, bank);

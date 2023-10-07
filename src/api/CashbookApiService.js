import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:7007"
});

export const retrieveBanks
    = () => apiClient.get("/cbbank");

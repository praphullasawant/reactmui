import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7007",
});

export const retrieveReceiptBook = () => apiClient.get(`/cashbookformenu`);

export const retrieveFeeheadForCashbook = (id) => apiClient.get(`/cashbook/${id}/feeheadforlink`)

export const retriveAllBank = () => apiClient.get(`/bankforlinking`);

export const retrieveAccountForBank = (id) => apiClient.get(`/bank/${id}/bankaccountforlink`)
import axios from "axios";

const apiClient = axios.create({
    baseURL:"http://localhost:7007"
});

// export const retrievefhCashbook = async () => {
//     try {
//       const response = await apiClient.get("/fhcashbook");
//       return response.data; // Assuming the response is an array
//     } catch (error) {
//       console.error("Error fetching feeheads:", error);
//       return [];
//     }
//   };
export const retrievefhCashbook = () => apiClient.get(`/cashbook`);
  
  export const retrieveFeehead = (id) => apiClient.get(`/feehead/${id}`)

  // export const createFeehead = (feehead) => apiClient.post(`/feehead`, feehead)
  
  export const updateFeehead = (id,feehead) => apiClient.put(`/feehead/${id}`,feehead)
  
  export const retrieveFeeheadForCashbook = (id) => apiClient.get(`/cashbook/${id}/feehead`)
  
  export const createFeeheadForCashbook = (id,feehead) => apiClient.post(`/cashbook/${id}/feehead`,feehead)
  
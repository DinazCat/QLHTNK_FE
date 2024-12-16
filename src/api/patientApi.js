import { client } from "./client";


const createPatient = async(Patient)=>{
    try {
        const response = await client.post('/Patient', Patient);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllPatient= async () => {
    const endpoint = "/Patient";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all Patient data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updatePatient = async (id, PatientData) => {
    try {
      const response = await client.put(`/Patient/${id}`,PatientData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update Patient data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deletePatient= async (id) => {
    try {
      const response = await client.delete(`/Patient/${id}`);
      return { success: true, message: response.data.message };
    } catch (error) {
      if (error.response) {
        // Lỗi từ server
        console.error(error.response.data);
        return { success: false, message: error.response.data.message || "An error occurred." };
      } else {
        // Lỗi từ client
        console.error(error.message);
        return { success: false, message: "Unable to connect to the server." };
      }
    }
  };
  const searchPatient= async (params) => {
    const endpoint = "/Patient/search";
     // Chuyển các tham số thành query string
  const queryParams = new URLSearchParams(params).toString(); 
  
  try {
    // Gửi request đến API với query string
    const response = await client.get(`${endpoint}?${queryParams}`);
        return response.data.patients;
    } catch (error) {
        console.error("Error get all Patient data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const getPatientData = async (PatientId) => {
    const endpoint = "/Patient/" + PatientId.toString();
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get Patient data:", error.response?.data || error.message);
      return error.response?.data;
    }
  };
export default {
    createPatient, getAllPatient, updatePatient, deletePatient, searchPatient,getPatientData
}
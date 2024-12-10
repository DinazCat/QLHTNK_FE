import { client } from "./client";


const createStaff = async(Staff)=>{
    try {
        const response = await client.post('/Employee', Staff);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllStaff= async () => {
    const endpoint = "/Employee";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all Staff data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updateStaff = async (id, employeeData) => {
    try {
      const response = await client.put(`/Employee/${id}`,employeeData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update Staff data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deleteEmployee = async (id) => {
    try {
      const response = await client.delete(`/Employee/${id}`);
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
  const searchStaff= async (params) => {
    const endpoint = "/Employee/search";
     // Chuyển các tham số thành query string
  const queryParams = new URLSearchParams(params).toString(); 
  
  try {
    // Gửi request đến API với query string
    const response = await client.get(`${endpoint}?${queryParams}`);
        return response.data.staffs;
    } catch (error) {
        console.error("Error get all Staff data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const getStaffData = async (StaffId) => {
    const endpoint = "/Employee/" + StaffId;
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get Staff data:", error.response?.data || error.message);
      return error.response?.data;
    }
  };
export default {
    createStaff, getAllStaff, updateStaff, deleteEmployee, searchStaff,getStaffData
}
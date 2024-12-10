import { client } from "./client";


const createBill = async(bill)=>{
    try {
        const response = await client.post('/HoaDon', bill);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllBill= async () => {
    const endpoint = "/HoaDon";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all bill data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updateBill = async (id, BillData) => {
    try {
      const response = await client.put(`/HoaDon/${id}`,BillData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update bill data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deleteBill = async (id) => {
    try {
      const response = await client.delete(`/HoaDon/${id}`);
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
  const searchBill= async (params) => {
    const endpoint = "/HoaDon/search";
     // Chuyển các tham số thành query string
  const queryParams = new URLSearchParams(params).toString(); 
  
  try {
    // Gửi request đến API với query string
    const response = await client.get(`${endpoint}?${queryParams}`);
        return response.data.bills;
    } catch (error) {
        console.error("Error get all bill data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
export default {
    createBill, getAllBill, updateBill, deleteBill, searchBill
}
import { client } from "./client";


const createDiscount = async(Discount)=>{
    try {
        const response = await client.post('/Discount', Discount);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllDiscount= async () => {
    const endpoint = "/Discount";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all Discount data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updateDiscount = async (id, DiscountData) => {
    try {
      const response = await client.put(`/Discount/${id}`,DiscountData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update Discount data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deleteDiscount= async (id) => {
    try {
      const response = await client.delete(`/Discount/${id}`);
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
  const searchDiscount= async (params) => {
    const endpoint = "/Discount/search";
     // Chuyển các tham số thành query string
  const queryParams = new URLSearchParams(params).toString(); 
  
  try {
    // Gửi request đến API với query string
    const response = await client.get(`${endpoint}?${queryParams}`);
        return response.data.discounts;
    } catch (error) {
        console.error("Error get all discount data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
export default {
    createDiscount, getAllDiscount, updateDiscount, deleteDiscount, searchDiscount
}
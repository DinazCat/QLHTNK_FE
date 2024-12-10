import { client } from "./client";


const createItem = async(item)=>{
    try {
        const response = await client.post('/MaterialHistory', item);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllItem= async () => {
    const endpoint = "/MaterialHistory";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all item data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updateItem = async (id, itemData) => {
    try {
      const response = await client.put(`/MaterialHistory/${id}`,itemData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update item data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deleteItem= async (id) => {
    try {
      const response = await client.delete(`/MaterialHistory/${id}`);
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
  const searchItem= async (params) => {
    const endpoint = "/MaterialHistory/search";
     // Chuyển các tham số thành query string
  const queryParams = new URLSearchParams(params).toString(); 
  
  try {
    // Gửi request đến API với query string
    const response = await client.get(`${endpoint}?${queryParams}`);
        return response.data.items;
    } catch (error) {
        console.error("Error get all user data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
export default {
    createItem, getAllItem, updateItem, deleteItem, searchItem
}
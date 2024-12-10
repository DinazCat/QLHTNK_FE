import { client } from "./client";


const createBonus = async(bonus)=>{
    try {
        const response = await client.post('/Bonus', bonus);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllBonus= async () => {
    const endpoint = "/Bonus";
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all bonus data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updateBonus = async (id, bonusData) => {
    try {
      const response = await client.put(`/Bonus/${id}`,bonusData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update bonus data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deleteBonus= async (id) => {
    try {
      const response = await client.delete(`/Bonus/${id}`);
      console.log(response.data);
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
//   const searchStaff= async (params) => {
//     const endpoint = "/Employee/search";
//      // Chuyển các tham số thành query string
//   const queryParams = new URLSearchParams(params).toString(); 
  
//   try {
//     // Gửi request đến API với query string
//     const response = await client.get(`${endpoint}?${queryParams}`);
//         return response.data.staffs;
//     } catch (error) {
//         console.error("Error get all user data:", error.response?.data || error.message);
//         return error.response?.data
//     }
//   };
export default {
    createBonus, getAllBonus, updateBonus, deleteBonus
}
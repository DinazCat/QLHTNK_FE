import { client } from "./client";


const createCTHSDT = async(CTHSDT, dichvu, thuoc, anh, hoadon)=>{
    try {
        const param = {
            ChiTietHsdt:CTHSDT,
            DichVus: dichvu,
            Thuocs: thuoc,
            Anhs: anh,
            HoaDon: hoadon
        }
        const response = await client.post('/CTHSDT', param);

        return response.data;
    } catch (error) {
        return error.response?.data
    }
}

const getAllCTHSDT= async (patientId) => {
    const endpoint = `/CTHSDT/${patientId}/treatment-details`;
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get all CTHSDT data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updateCTHSDT = async (id, CTHSDTData) => {
    try {
      const response = await client.put(`/CTHSDT/${id}`,CTHSDTData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update CTHSDT data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const deleteCTHSDT= async (id) => {
    try {
      const response = await client.delete(`/CTHSDT/${id}`);
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
  const searchCTHSDT= async (params) => {
    const endpoint = "/CTHSDT/search";
     // Chuyển các tham số thành query string
  const queryParams = new URLSearchParams(params).toString(); 
  
  try {
    // Gửi request đến API với query string
    const response = await client.get(`${endpoint}?${queryParams}`);
        return response.data.cthsdts;
    } catch (error) {
        console.error("Error get all CTHSDT data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
export default {
    createCTHSDT, getAllCTHSDT, updateCTHSDT, deleteCTHSDT, searchCTHSDT
}
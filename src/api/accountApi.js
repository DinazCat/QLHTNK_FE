import axios from "axios";

const client = axios.create({
    baseURL:'https://localhost:7132/api',
    headers: {
        'Content-Type': 'application/json',
      },
})
// client.interceptors.request.use(
//     (config) => {
//       const token = localStorage.Item('accessToken');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

const createAccount = async(user)=>{
    try {
        const response = await client.post('/Account', user);
        return response.data;
    } catch (error) {
        console.error("Error register:", error.response?.data || error.message);
        return error.response?.data
    }
}
const Login = async(user)=>{
    try {
        const response = await client.post('/Account/Login', user);
        return response.data;
    } catch (error) {
        console.error("Error login:", error.response?.data || error.message);
        return {message:"unauthorized"}
    }
}

const getUserData = async (userId) => {
    const endpoint = "/User/" + userId;
    try {
      const response = await client.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error get user data:", error.response?.data || error.message);
      return null;
    }
  };

  const getCode = async (email) => {
    try {
      const response = await client.get(`/Account/getCode`, {
        params: { email },
      });
  
      return response.data; // Trả về dữ liệu JSON
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response?.data
      } 
    }
  };

  const updateUser = async (id, UserData) => {
    try {
      const response = await client.put(`/User/${id}`,UserData);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update User data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
  const updatePass = async (acc) => {
    try {
      const response = await client.put("/Account/update-password",acc);
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Error update User data:", error.response?.data || error.message);
        return error.response?.data
    }
  };
export default {
    createAccount,
    Login,
    getUserData,
    getCode,
    updateUser,
    updatePass
}
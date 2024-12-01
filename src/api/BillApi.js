import { client } from "./client";

const getAllBills = async () => {
  try {
    const response = await client.get("/BillManagement/getBills");
    if (response.data.success) {
      return response.data.bills;
    } else {
      console.log("not get bills");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addBill = async (data) => {
  const endpoint = "/BillManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateBill = async (data, id) => {
  const endpoint = "/BillManagement/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteBill = async (id) => {
  try {
    await client.delete("/BillManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getBillsBySearch = async (searchCriteria) => {
  try {
    alert("Hehe");
    const queryParams = new URLSearchParams(searchCriteria).toString();
    alert(queryParams);
    const response = await client.get(`/BillManagement/Bills${queryParams}`);
    alert("hihi");
    if (response.data.success) {
      alert("true");
      return response.data.bills;
    } else {
      console.log("not get bills");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

export default {
  getAllBills,
  addBill,
  updateBill,
  getBillsBySearch,
};

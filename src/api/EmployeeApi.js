import { client } from "./client";

const getAllStaffs = async () => {
  try {
    const response = await client.get("/StaffManagement/getStaffs");
    if (response.data.success) {
      return response.data.staffs;
    } else {
      console.log("not get staffs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addStaff = async (data) => {
  const endpoint = "/StaffManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const deleteStaff = async (id) => {
  try {
    await client.delete("/StaffManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateStaff = async (data, id) => {
  const endpoint = "/StaffManagement/update/" + id;
  console.log(id);
  console.log(data);
  try {
    const response = await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const getStaffsBySeacrh = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/StaffManagement/Staffs?${queryParams}`);

    if (response.data.success) {
      return response.data.staffs;
    } else {
      console.log("not get staffs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

export default {
  getAllStaffs,
  addStaff,
  updateStaff,
  deleteStaff,
  getStaffsBySeacrh,
};

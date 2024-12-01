import { client } from "./client";

const addDoctorSchedule = async (data) => {
  const endpoint = "/ScheduleManagement/DoctorSchedule/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateDoctorSchedule = async (endpoint, data) => {
  try {
    const response = await client.put(endpoint, data);
    return response.data.success;
  } catch (error) {
    console.error("error: ", error.message);
  }
};

export default {
  addDoctorSchedule,
  updateDoctorSchedule,
};

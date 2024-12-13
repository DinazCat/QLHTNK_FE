import { client } from "./client";
import BranchApi from "./BranchApi";
import ServiceApi from "./ServiceApi";
import InventoryApi from "./InventoryApi";
import FeedbackApi from "./FeedbackApi";
import BillApi from "./BillApi";
import DiscountApi from "./DiscountApi";
import EmployeeApi from "./EmployeeApi";
import ScheduleApi from "./ScheduleApi";
import cthsdtApi from "./cthsdtApi";
import materialUsedApi from "./materialUsedApi";
import patientApi from "./patientApi";
import bonusApi from "./bonusApi";

const addDoc = async (controller, data) => {
  try {
    const response = await client.post(`/${controller}`, data);
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateDoc = async (controller, id, data) => {
  try {
    await client.put(`/${controller}/${id}`, data);
    console.log("Doc updated successfully.");
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteDoc = async (controller, id) => {
  try {
    await client.delete(`/${controller}/${id}`);
    console.log("Doc deleted successfully.");
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getDoc = async (collection, id) => {
  try {
    const response = await client.get(`/${collection}/${id}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
    return null;
  }
};
const getDocs = async (controller) => {
  try {
    const response = await client.get(`/${controller}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getDocByField = async (endpoint) => {
  try {
    const response = await client.get(endpoint);
    if (response.data.success) {
      return response.data;
    } else {
      console.log("not get list");
      return [];
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const getDocsBySeacrh = async (endpoint, searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`${endpoint}/search?${queryParams}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

export default {
  ...BranchApi,
  ...ServiceApi,
  ...InventoryApi,
  ...FeedbackApi,
  ...BillApi,
  ...DiscountApi,
  ...EmployeeApi,
  ...ScheduleApi,
  ...cthsdtApi,
  ...bonusApi,
  ...patientApi,
  ...materialUsedApi,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocByField,
  getDocsBySeacrh,
};

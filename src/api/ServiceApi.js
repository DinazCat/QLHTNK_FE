import { client } from "./client";

const getAllServices = async () => {
  try {
    const response = await client.get("/Service");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching services:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return [];
  }
};

const addService = async (data) => {
  try {
    console.log(data);
    const response = await client.post("/Service", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error creating service:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const deleteService = async (id) => {
  try {
    await client.delete(`/Service/${id}`);
    console.log("Service deleted successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error deleting service:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return "error";
  }
};

const updateService = async (id, data) => {
  try {
    await client.put(`/Service/${id}`, data);
    console.log("Service updated successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error updating service:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const getServicesBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/Service/search?${queryParams}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error searching services:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return [];
  }
};

export default {
  getAllServices,
  addService,
  updateService,
  deleteService,
  getServicesBySearch,
};

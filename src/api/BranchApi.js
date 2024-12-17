import { client } from "./client";

const getAllBranchs = async () => {
  try {
    const response = await client.get("/Branch");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching branches:",
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

const addBranch = async (data) => {
  try {
    const response = await client.post("/Branch", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error creating branch:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const deleteBranch = async (id) => {
  try {
    await client.delete(`/Branch/${id}`);
    console.log("Branch deleted successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error deleting branch:",
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

const updateBranch = async (id, data) => {
  try {
    await client.put(`/Branch/${id}`, data);
    console.log("Branch updated successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error updating branch:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const getBranchsBySeacrh = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(`/Branch/search?${queryParams}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error searching branches:",
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
  getAllBranchs,
  addBranch,
  updateBranch,
  deleteBranch,
  getBranchsBySeacrh,
};

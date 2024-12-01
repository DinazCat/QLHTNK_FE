import { client } from "./client";

const getAllMaterials = async () => {
  try {
    const response = await client.get("/Inventory/supply");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching supplies:",
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

const addMaterial = async (data) => {
  try {
    const response = await client.post("/Inventory/supply", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error creating supply:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const updateMaterial = async (data, id) => {
  try {
    await client.put(`/Inventory/supply/${id}`, data);
    console.log("Supply updated successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error updating supply:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const deleteMaterial = async (id) => {
  try {
    await client.delete(`/Inventory/supply/${id}`);
    console.log("Supply deleted successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error deleting supply:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const getMaterialsBySeacrh = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `/Inventory/supply/search?${queryParams}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error searching supplies:",
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

const getAllDrugs = async () => {
  try {
    const response = await client.get("/Inventory/medicine");
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching medicines:",
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

const addDrug = async (data) => {
  try {
    const response = await client.post("/Inventory/medicine", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error creating medicine:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const updateDrug = async (data, id) => {
  try {
    await client.put(`/Inventory/medicine/${id}`, data);
    console.log("Medicine updated successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error updating medicine:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const deleteDrug = async (id) => {
  try {
    await client.delete(`/Inventory/medicine/${id}`);
    console.log("Medicine deleted successfully.");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error deleting medicine:",
        error.response.data.Message || "Unknown error"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};

const getDrugsBySeacrh = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    const response = await client.get(
      `/Inventory/medicine/search?${queryParams}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Error searching medicines:",
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
  getAllMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  getMaterialsBySeacrh,
  getAllDrugs,
  addDrug,
  updateDrug,
  deleteDrug,
  getDrugsBySeacrh,
};

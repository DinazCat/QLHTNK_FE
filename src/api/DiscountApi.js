import { client } from "./client";

const getAllDiscounts = async () => {
  try {
    const response = await client.get("/DiscountManagement/getDiscounts");
    if (response.data.success) {
      return response.data.discounts;
    } else {
      console.log("not get discounts");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addDiscount = async (data) => {
  const endpoint = "/DiscountManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const updateDiscount = async (data, id) => {
  const endpoint = "/DiscountManagement/update/" + id;
  try {
    await client.put(endpoint, data);
  } catch (error) {
    console.error("error: ", error.message);
  }
};
const deleteDiscount = async (id) => {
  try {
    await client.delete("/DiscountManagement/delete/" + id);
  } catch (error) {
    console.log("error: ", error.message);
  }
};
const getDiscountsBySearch = async (searchCriteria) => {
  try {
    const queryParams = new URLSearchParams(searchCriteria).toString();
    alert(queryParams);
    const response = await client.get(
      `/DiscountManagement/Discounts?${queryParams}`
    );

    if (response.data.success) {
      return response.data.discounts;
    } else {
      console.log("not get discounts");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};

export default {
  getAllDiscounts,
  addDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountsBySearch,
};

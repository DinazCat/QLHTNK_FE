import { client } from "./client";

const getAllFeedbacks = async (sortOrder) => {
  try {
    const queryParams = new URLSearchParams({
      sortOrder: sortOrder,
    }).toString();
    const response = await client.get(
      `/FeedbackManagement/getFeedbacks?${queryParams}`
    );
    if (response.data.success) {
      return response.data.feedbacks;
    } else {
      console.log("not get drugs");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
const addFeedback = async (data) => {
  const endpoint = "/FeedbackManagement/add";
  try {
    const response = await client.post(endpoint, data);
    return response.data.docId;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export default {
  getAllFeedbacks,
  addFeedback,
};

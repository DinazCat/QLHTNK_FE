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

const getTreatmentRecordDetailById = async (id) => {
  try {
    const response = await client.get(
      "/TreatmentRecordDetailManagement/getTreatmentRecordDetailById/" + id
    );
    if (response.data.success) {
      console.log(response.data.cthsdtById);
      return response.data.cthsdtById;
    } else {
      console.log("not get treatment record detail");
    }
  } catch (error) {
    console.log("error: ", error.message);
    return [];
  }
};
export default {
  getTreatmentRecordDetailById,
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
  ...materialUsedApi
};

import axios from "axios";

export const createLead = async (payload: any) => {
  try {
    const { data } = await axios.post("/api/leads", payload);
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to submit lead";
    throw new Error(message);
  }
};

export const getLeads = async () => {
  try {
    const { data } = await axios.get("/api/leads");
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch leads";
    throw new Error(message);
  }
};

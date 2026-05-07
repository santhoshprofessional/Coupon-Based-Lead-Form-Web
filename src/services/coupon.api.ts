import axios from "axios";

export const validateCouponApi = async (payload: {
  couponCode: string;
  requirementType: string;
  budgetRange: number;
  email: string;
}) => {
  try {
    const { data } = await axios.post(
      "https://coupon-based-lead-form-api-1.onrender.com/api/coupons/validate",
      payload,
    );
    return data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || "Invalid coupon";
    throw new Error(message);
  }
};

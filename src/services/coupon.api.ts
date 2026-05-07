import axios from 'axios';

export const validateCouponApi = async (payload: {
  couponCode: string;
  requirementType: string;
  budgetRange: number;
  email: string;
}) => {
  try {
    const response = await axios.post('/api/coupons/validate', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Invalid coupon');
  }
};
import { useState } from 'react';
import { validateCouponApi } from '../services/coupon.api';

export const useCoupon = (
  requirementType: string,
  budgetRange: string,
  email: string,
) => {
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [error, setError] = useState('');

  const applyCoupon = async (couponCode: string) => {
    try {
      setError('');

      const data = await validateCouponApi({
        couponCode,
        requirementType,
        budgetRange: Number(budgetRange),
        email,
      });

      setDiscountAmount(data.discountAmount);
      setFinalPrice(data.finalPrice);
    } catch (err: any) {
      setDiscountAmount(0);
      setFinalPrice(0);
      setError(err.message);
    }
  };

  const clearCoupon = () => {
    setDiscountAmount(0);
    setFinalPrice(0);
    setError('');
  };

  return {
    discountAmount,
    finalPrice,
    error,
    applyCoupon,
    clearCoupon,
  };
};
export type ApplyCouponDto = {
  code: string;
  requirementType: string;
  budgetRange: number;
};

export type CouponResult = {
  valid: boolean;
  discountAmount: number;
  finalPrice: number;
  error?: string;
};
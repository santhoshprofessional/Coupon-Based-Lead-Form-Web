export const REQUIREMENT_TYPES = ['Service', 'Product', 'Consultation'] as const;
export type RequirementType = (typeof REQUIREMENT_TYPES)[number];

export const CITIES = [
  'Chennai',
  'Bangalore',
  'Hyderabad',
  'Mumbai',
  'Delhi',
] as const;
export type City = (typeof CITIES)[number];

export const BUDGET_OPTIONS = [
  { value: '500', label: '₹ 500' },
  { value: '1000', label: '₹ 1,000' },
  { value: '2000', label: '₹ 2,000' },
  { value: '5000', label: '₹ 5,000' },
  { value: '10000', label: '₹ 10,000' },
] as const;

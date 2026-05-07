import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createLead } from "../services/lead.api";
import { useCoupon } from "../hooks/useCoupon";
import { leadFormSchema } from "../types/form.schema";
import { type RequirementType } from "../constants";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  city: string;
  requirementType: RequirementType;
  budgetRange: string;
  message?: string;
  couponCode?: string;
};

export const useLeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      requirementType: "Service",
      budgetRange: "",
      message: "",
      couponCode: "",
    },
  });

  // Watch form values
  const requirementType = watch("requirementType");
  const budgetRange = watch("budgetRange");
  const email = watch("email");
  const couponCode = watch("couponCode");

  const {
    discountAmount,
    finalPrice,
    error: couponError,
    applyCoupon,
    clearCoupon,
  } = useCoupon(requirementType, budgetRange, email);

  // Apply Coupon
  const handleApplyCoupon = async () => {
    await applyCoupon(couponCode);
  };

  // Submit Form
  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setSubmitError("");

      await createLead({
        ...data,
        budgetRange: Number(data.budgetRange),
      });

      setIsSubmitted(true);

      reset({
        name: "",
        phone: "",
        email: "",
        city: "Chennai",
        requirementType: "Service",
        budgetRange: "1000",
        message: "",
        couponCode: "",
      });

      clearCoupon();
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form: {
      register,
      handleSubmit,
      formState: {
        errors,
      },
    },

    loading,
    isSubmitted,
    submitError,

    discountAmount,
    finalPrice,
    couponError,

    handleApplyCoupon,
    onSubmit,

    resetStatus: () => setIsSubmitted(false),
  };
};

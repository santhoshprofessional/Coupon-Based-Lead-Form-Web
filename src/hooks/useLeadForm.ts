import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLead } from "../services/lead.api";
import { useCoupon } from "../hooks/useCoupon";
import { leadFormSchema, type LeadFormData } from "../types/form.schema";

export const useLeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      requirementType: "Product",
      budgetRange: "",
      message: "",
      couponCode: "",
    },
  });

  const requirementType = form.watch("requirementType");
  const budgetRange = form.watch("budgetRange");
  const email = form.watch("email");
  const couponCode = form.watch("couponCode");

  const {
    discountAmount,
    finalPrice,
    error: couponError,
    applyCoupon,
    clearCoupon,
  } = useCoupon(requirementType, budgetRange, email);

  const handleApplyCoupon = async () => {
    if (couponCode) {
      await applyCoupon(couponCode);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    try {
      setLoading(true);
      setSubmitError(null);

      await createLead({
        ...data,
        budgetRange: Number(data.budgetRange),
      });

      alert("Lead submitted successfully");

      form.reset();
      clearCoupon();
    } catch (err: any) {
      setSubmitError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    submitError,
    discountAmount,
    finalPrice,
    couponError,
    handleApplyCoupon,
    onSubmit,
  };
};

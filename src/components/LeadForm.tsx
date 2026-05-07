import React from "react";
import { useLeadForm } from "../hooks/useLeadForm";
import { CITIES, REQUIREMENT_TYPES, BUDGET_OPTIONS } from "../constants";

export const LeadForm: React.FC = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },

    loading,
    isSubmitted,
    submitError,

    discountAmount,
    finalPrice,
    couponError,

    handleApplyCoupon,
    onSubmit,
    resetStatus,
  } = useLeadForm();

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-md text-center w-full max-w-md">
          <div className="text-green-600 text-5xl mb-4">✓</div>

          <h2 className="text-2xl font-bold text-gray-800">Form Submitted</h2>

          <p className="text-gray-500 mt-3">
            Your request has been submitted successfully.
          </p>

          <button
            onClick={resetStatus}
            className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Coupon-Based-Lead-Form
          </h1>

          <p className="text-gray-500 mt-2">Fill your details below</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter your phone number"
              {...register("phone")}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium text-gray-700">City</label>

            <select
              {...register("city")}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Requirement Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Requirement Type
            </label>

            <select
              {...register("requirementType")}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {REQUIREMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Budget Range
            </label>

            <select
              {...register("budgetRange")}
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {BUDGET_OPTIONS.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Message</label>

          <textarea
            rows={4}
            placeholder="Enter your message"
            {...register("message")}
            className="w-full mt-2 border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Coupon */}
        <div className="mt-6 bg-gray-50 border rounded-2xl p-5">
          <label className="text-sm font-medium text-gray-700">
            Coupon Code
          </label>

          <div className="flex flex-col md:flex-row gap-3 mt-3">
            <input
              type="text"
              placeholder="Enter coupon code"
              {...register("couponCode")}
              className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="button"
              onClick={handleApplyCoupon}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
            >
              Apply Coupon
            </button>
          </div>

          {couponError && (
            <p className="text-red-500 text-sm mt-3">{couponError}</p>
          )}

          {discountAmount > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Discount</span>

                <span className="text-green-600 font-semibold">
                  ₹{discountAmount}
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Final Price</span>

                <span>₹{finalPrice}</span>
              </div>
            </div>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <p className="text-red-500 text-sm mt-4 text-center">{submitError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition"
        >
          {loading ? "Submitting..." : "Submit Form"}
        </button>
      </form>
    </div>
  );
};

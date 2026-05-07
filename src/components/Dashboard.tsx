import React, { useEffect, useState } from "react";
import { getLeads } from "../services/lead.api";

export const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await getLeads();
        setLeads(response.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lead Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">View all submitted leads</p>
        </div>

        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg font-semibold">
          Total: {leads.length}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* No Data */}
      {leads.length === 0 && !error && (
        <div className="bg-white rounded-xl p-10 text-center text-gray-500">
          No Leads Found
        </div>
      )}

      {/* Lead Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white rounded-xl shadow-sm p-5 border"
          >
            {/* Top */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">{lead.name}</h2>

              <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                {lead.requirementType}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Email:</span> {lead.email}
              </p>

              <p>
                <span className="font-medium">Phone:</span> {lead.phone}
              </p>

              <p>
                <span className="font-medium">City:</span> {lead.city}
              </p>

              <p>
                <span className="font-medium">Budget:</span> {lead.budgetRange}
              </p>

              <p>
                <span className="font-medium">Final Price:</span> ₹
                {lead.finalPrice || 0}
              </p>

              {lead.couponCode && (
                <p>
                  <span className="font-medium">Coupon:</span> {lead.couponCode}
                </p>
              )}

              {lead.discountAmount > 0 && (
                <p className="text-green-600 font-medium">
                  Saved ₹{lead.discountAmount}
                </p>
              )}
            </div>

            {/* Message */}
            {lead.message && (
              <div className="mt-4 bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
                {lead.message}
              </div>
            )}

            {/* Date */}
            <div className="mt-4 text-xs text-gray-400">
              {lead.createdAt
                ? new Date(lead.createdAt).toLocaleDateString()
                : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

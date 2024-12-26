import React from "react";

const CustomerInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <img
        src="/src/assets/invoice.png" // Replace with the actual image URL or import
        alt="Keep customers informed"
        className="w-40 h-auto mb-6 "
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Keep customers informed
      </h2>
      <p className="text-gray-600 text-base max-w-xl">
        Remind your customers about outstanding invoices or send details of
        their account activity. Create a statement by selecting a customer and
        statement type from the form above.
      </p>
    </div>
  );
};

export default CustomerInfo;

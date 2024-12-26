import React from "react";
import ReusableFunctions from "../ReusableFunctions";

const CustomerStatementTemplate = ({
  userData,
  customerDetails,
  statementData,
}) => {
  console.log("userData", userData);
  console.log("customerDetails", customerDetails);
  console.log("statementData", statementData);

  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white border border-gray-300 shadow-lg rounded-lg p-8 m-5">
      
      {/* Header Section */}
      <div className="border-b-2 border-blue-500 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {userData.companyName}
            </h2>
            <p className="text-gray-600">{userData.companyFullAddress}</p>
            <p className="text-gray-600">
              {userData.city}, {userData.pincode}, {userData.country}
            </p>
            <p className="text-gray-600 font-semibold">
              GST: <span>{userData.GST}</span>{" "}
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-gray-800">
              Statement of Account
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              A detailed summary of all transactions, including
              <br />
              invoices, payments, and balances for your account.
            </p>
            {/* <p className="text-gray-500">Outstanding invoices</p> */}
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-2 gap-6">
      <div>
  <p className="text-gray-400">Bill to</p>
  <p className="font-bold text-gray-900">
    {customerDetails?.firstName?.toUpperCase() || ""}{" "}
    {customerDetails?.lastName?.toUpperCase() || ""}
    <span className="text-[12px]">
      ({customerDetails?.companyName || "N/A"})
    </span>
  </p>
  <p className="text-gray-600 text-sm">
    {customerDetails?.billingAddress?.address1 || "N/A"}
  </p>
  <p className="text-gray-600 text-sm">
    {customerDetails?.billingAddress?.city || "N/A"},{" "}
    {customerDetails?.billingAddress?.pincode || "N/A"},{" "}
    {customerDetails?.billingAddress?.country || "N/A"}
  </p>
  <p className="text-gray-600 text-sm">PH: {customerDetails?.phone || "N/A"}</p>
  <p className="text-gray-600 text-sm">
    GST: {customerDetails?.gstNumber || "N/A"}
  </p>
</div>

        <div className="text-right">
          {/* <p className="text-gray-500 text-sm">As of {statementData.date}</p> */}
          <div className="mt-16 ">
            {/* <div className="flex justify-between text-gray-600">
              <span>Overdue</span>
              <span>₹{summary.overdue}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Not yet due</span>
              <span>₹{summary.notDue}</span>
            </div> */}
            <p className="text-gray-500 text-sm">Indian rupee (INR)</p>
            <div className="flex justify-between mt-2 bg-gray-200 p-2 rounded">
              <span className="font-bold">Balance:</span>
              {statementData && statementData.length > 0 ? (
                <span className="font-bold">
                  ₹{statementData[0]?.balance || "0"}
                </span>
              ) : (
                <span className="font-bold">₹0</span>
              )}

              {/* <span className="font-bold">₹{statementData[0].balance || "0"}</span> */}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6">
        <table className="w-full border-collapse border-gray-200">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="py-2 px-4 text-left">Statement Details</th>
              <th className="py-2 px-4 text-left">Date</th>

              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Paid</th>
              <th className="py-2 px-4 text-left">Due</th>
            </tr>
          </thead>
          <tbody>
            {statementData && statementData.length > 0 ? (
              statementData.map((statement, index) => (
                <tr
                  key={index}
                  className={`border-t hover:bg-gray-50 text-gray-700 text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2 px-4 text-blue-600 font-semibold">
                    {statement.details}
                  </td>
                  <td className="py-2 px-4">
                    {ReusableFunctions.formatDate(statement.date)}
                  </td>
                  <td className="py-2 px-4">₹{statement.amount}</td>
                  <td className="py-2 px-4">₹{statement.paymentReceived}</td>
                  <td className="py-2 px-4">₹{statement.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 px-4 text-center text-gray-500 font-medium"
                >
                  No statement available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Outstanding Section */}
      <div className="flex justify-end mt-4">
        <div className="bg-gray-200 px-4 py-2 rounded w-full md:w-1/3">
          <div className="flex justify-between font-bold text-gray-800">
            <span>Outstanding balance (INR)</span>
            {statementData && statementData.length > 0 ? (
              <span className="font-bold">
                ₹{statementData[0]?.balance || "0"}
              </span>
            ) : (
              <span className="font-bold">₹0</span>
            )}

            {/* <span>₹{statementData[0].balance || "0"}</span> */}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t border-gray-300 pt-6 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
          {/* Left Footer - Thank You Message */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h4 className="font-bold text-lg text-gray-800">
              Thank you for your business!
            </h4>
            <p className="mt-1">
              If you have any questions regarding this statement, please feel
              free to contact us at:
            </p>
            <p className="mt-1">
              <span className="font-semibold">Email:</span>{" "}
              {userData.email || "N/A"} |
              <span className="font-semibold"> Phone:</span>{" "}
              {userData.phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Bottom Footer - Disclaimer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            This is a system-generated document and does not require a
            signature.
          </p>
          <p>
            © {new Date().getFullYear()}{" "}
            {userData.companyName || "Your Company"}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatementTemplate;

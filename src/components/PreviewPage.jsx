import React, { useEffect, useState, useRef } from "react";
import Invoice from "../components/InvoiceTemplates/InvoiceTemplate1";
import Invoice2 from "../components/InvoiceTemplates/InvoiceTemplate2";
import Invoice3 from "../components/InvoiceTemplates/InvoiceTemplate3";
import { useNavigate, useLocation } from "react-router-dom";
import ReusableFunctions from "./ReusableFunctions";

const PreviewPage = ({ setActiveTab }) => {
  const handlePreviewChange = (newValue) => {
    createInvoiceBack(newValue); // Update the activeTab in the Dashboard
  };
  const location = useLocation();
  const navigate = useNavigate();
  let { invoiceData, userData } = location.state || {};
  const queryParams = new URLSearchParams(location.search);

  
  // if (!invoiceData || !userData) {
  //   // Redirect back to CreateInvoicePage if no data is passed
  //   invoiceData = JSON.parse(decodeURIComponent(queryParams.get("invoiceData") || "{}"));
  //   userData = JSON.parse(decodeURIComponent(queryParams.get("userData") || "{}"));
  //   navigate("/dashboard/invoices");
  //   return null;
  // } else {
  //   // console.log("invoiceData:", invoiceData);
  //   // console.log("userData:", userData);
  // }


  // Redirect if no data is found (useEffect prevents infinite re-renders)
  useEffect(() => {
    if (!invoiceData || !userData) {
      const parsedInvoiceData = JSON.parse(decodeURIComponent(queryParams.get("invoiceData") || "{}"));
      const parsedUserData = JSON.parse(decodeURIComponent(queryParams.get("userData") || "{}"));

      if (!parsedInvoiceData || !parsedUserData) {
        navigate("/dashboard/invoices", { replace: true }); // ✅ Fix: Runs only once inside useEffect
      }
    }
  }, [invoiceData, userData, navigate, queryParams]); // ✅ Only runs when dependencies change

    // If data is missing, return null to prevent rendering
    if (!invoiceData || !userData) {
      return null;
    }

  const handleTabChange = (newTab) => {
    setActiveTab(newTab); // Update the activeTab in the Dashboard
    navigate(`/dashboard/${newTab}`, { replace: true }); 
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className=" mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold">
              Invoice #{userData.invoice_Prefix}
              {invoiceData.invoiceNumber}
            </h1>
            <p className="text-gray-600">
              Customer:{" "}
              <span className="text-blue-600 font-medium">
                {invoiceData.billTo.customerName.toUpperCase()}
              </span>
            </p>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => {handleTabChange("createinvoices");}} // Wrap the call in a function
              className="px-4 py-2 border rounded-lg text-lg text-gray-600 hover:bg-gray-100"
            >
              Create another invoice
            </button>
            <button className="px-4 py-2 border rounded-lg text-lg text-blue-600 hover:bg-blue-50">
              Send Invoice
            </button>
          </div>
        </div>

        {/* Status & Details Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* <span className="px-3 py-1 text-sm font-medium bg-gray-100 rounded-lg">{invoiceData.status}</span> */}
            <span className="text-gray-600">
              Total Amount :{" "}
              <span className="font-medium">
                ₹ {invoiceData.payment.grandTotal}
              </span>
            </span>
            <span className="text-gray-600">
              Paid:{" "}
              <span className="font-medium">
                ₹ {invoiceData.payment.paymentMade}
              </span>
            </span>
            <span className="text-gray-600">
              Balance:{" "}
              <span className="font-medium">
                ₹ {invoiceData.payment.balanceDue}
              </span>
            </span>
            <span className="text-gray-600">
              Due Date:{" "}
              <span className="font-medium">
                {ReusableFunctions.formatDate(invoiceData.invoiceDueDate)}
              </span>
            </span>
          </div>
          <div className="mt-4 text-yellow-600 bg-yellow-100 p-3 rounded-lg">
            This is a draft invoice. You can take further actions by sending it
            to the customer.
            {/* <span className="font-semibold">{invoiceData.status}</span> */}
          </div>
        </div>

        {/* Invoice Body */}
        <Invoice2 invoiceData={invoiceData} userData={userData} />
       
        <div className="flex justify-end mx-5 my-10">
          <button
            className="px-4 py-2 border rounded-lg text-lg text-blue-600 hover:bg-blue-50"
            onClick={() => {
              handleTabChange("invoices");
            }}
          >
            Skip and continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;

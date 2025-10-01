import React, { useEffect, useState } from "react";
// import Estimate1 from "../components/InvoiceTemplates/InvoiceTemplate1";
// import Estimate2 from "../components/InvoiceTemplates/InvoiceTemplate2";
// import Estimate3 from "../components/InvoiceTemplates/InvoiceTemplate3";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Download, Share2, Send } from "lucide-react";
import ReusableFunctions from "./ReusableFunctions";

const EstimatePreview = ({
  setActiveTab,
  estimateData: propEstimateData,
  userData: propUserData,
  onClose,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  let { estimateData, userData } = location.state || {};
  estimateData = propEstimateData || estimateData;
  userData = propUserData || userData;

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (!estimateData || !userData) {
      const parsedEstimateData = JSON.parse(
        decodeURIComponent(queryParams.get("estimateData") || "{}")
      );
      const parsedUserData = JSON.parse(
        decodeURIComponent(queryParams.get("userData") || "{}")
      );
      if (!parsedEstimateData || !parsedUserData) {
        navigate("/dashboard/estimates", { replace: true });
      }
    }
  }, [estimateData, userData, navigate, queryParams]);

  if (!estimateData || !userData) return null;

  // ---------- Ribbon ----------
  const getRibbonStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-600";
      case "partially paid":
        return "bg-yellow-500";
      case "unpaid":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  // ---------- Template Switch ----------
//   const templates = [Estimate2, Estimate1, Estimate3];
//   const [currentTemplate, setCurrentTemplate] = useState(0);
//   const ActiveTemplate = templates[currentTemplate];
//   const switchTemplate = () =>
//     setCurrentTemplate((prev) => (prev + 1) % templates.length);

  // ---------- Close Button ----------
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose(); // Split view
    } else {
      navigate("/dashboard/estimates"); // Full page
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* ---------- Toolbar ---------- */}
      <div className="sticky top-0 z-20 flex flex-col md:flex-row md:justify-between md:items-center gap-3 px-4 md:px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div>
          <h1 className="text-lg font-semibold">
            Estimate #{userData.estimate_Prefix}
            {estimateData.estimateNumber}
          </h1>
          <p className="text-sm text-gray-500">
            Customer:{" "}
            <span className="font-medium text-blue-600">
              {estimateData.billTo.customerName}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => (window.location.href = "mailto:?subject=Estimate")}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center text-sm"
          >
            <Send className="w-4 h-4 mr-1" /> Send
          </button>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=Estimate%20${userData.estimate_Prefix}${estimateData.estimateNumber}`,
                "_blank"
              )
            }
            className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center text-sm"
          >
            <Share2 className="w-4 h-4 mr-1" /> Share
          </button>
          <button
            className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center text-sm"
            onClick={() =>
              ReusableFunctions.handlePrintEstimate(estimateData, userData)
            }
          >
            <Printer className="w-4 h-4 mr-1" /> Print
          </button>
          <button
            className="px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center text-sm"
            onClick={() =>
              ReusableFunctions.downloadEstimate(estimateData, userData)
            }
          >
            <Download className="w-4 h-4 mr-1" /> Download
          </button>
          {/* Close */}
          <button
            onClick={handleClose}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* ---------- Meta Info ---------- */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4 flex-wrap">
          <span className="text-gray-600">
            Total Amount :{" "}
            <span className="font-medium">
              ₹ {estimateData.payment.grandTotal}
            </span>
          </span>
          <span className="text-gray-600">
            Paid: <span className="font-medium">₹ {estimateData.payment.paymentMade}</span>
          </span>
          <span className="text-gray-600">
            Balance:{" "}
            <span className="font-medium">₹ {estimateData.payment.balanceDue}</span>
          </span>
          <span className="text-gray-600">
            Due Date:{" "}
            <span className="font-medium">
              {ReusableFunctions.formatDate(estimateData.estimateDueDate)}
            </span>
          </span>
        </div>
      </div>

      {/* ---------- Estimate ---------- */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex justify-center">
        <div className="relative w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          {/* Ribbon */}
          <div className="absolute -top-3 -left-3 w-40 h-40 overflow-hidden">
            <div
              className={`absolute top-6 left-[-40px] w-40 h-8 flex items-center justify-center text-white text-xs font-bold transform -rotate-45 shadow-md ${getRibbonStyle(
                estimateData.paymentStatus
              )}`}
            >
              {estimateData.paymentStatus?.charAt(0).toUpperCase() +
                estimateData.paymentStatus?.slice(1)}
            </div>
          </div>

          {/* <AnimatePresence mode="wait">
            <motion.div
              key={currentTemplate}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ActiveTemplate estimateData={estimateData} userData={userData} />
            </motion.div>
          </AnimatePresence> */}
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      {/* <div className="text-center py-4 border-t bg-white">
        <p className="text-gray-600 text-sm italic">
          Want a different look?{" "}
          <span
            className="font-medium text-blue-600 cursor-pointer hover:underline"
            onClick={switchTemplate}
          >
            Switch template
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default EstimatePreview;

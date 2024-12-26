import React, { useEffect, useState, useRef } from "react";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { Download, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReusableFunctions from "./ReusableFunctions";
import Swal from "sweetalert2";


const InvoiceList = ({ setActiveTab }) => {
  const [allInvoiceData, setAllInvoiceData] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerFilter, setCustomerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRefs = useRef([]);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle Dropdown
  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index); // Toggle the dropdown for the specific index
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/invoice/fetchAllInvoice",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("data.invoices",data.invoices);
        setAllInvoiceData(data.invoices);
        setFilteredData(data.invoices); // Initialize filtered data
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:3000/api/customers/fetchAllCustomer",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAllCustomers(data.customer);
        // console.log("data.customer", data.customer);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No auth token found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/auth/user-profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User data fetched:--", data.user);

        setAllUserInfo(data.user);
        // Uncomment if needed
        // fetchCustomers();
        // console.log("allUserInfo.first_name:", allUserInfo.first_name);
      } else {
        console.error(
          `Failed to fetch user info: ${response.status} - ${response.statusText}`
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    } finally {
      setLoading(false); // Ensure the loading state is cleared
    }
  };

  const handleDelete = async (invoiceId) => {
    // SweetAlert2 confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (!result.isConfirmed) {
      // User clicked "Cancel"
      return;
    }
  
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        Swal.fire("Unauthorized!", "Token is missing", "error");
        return;
      }
  
      const response = await fetch(
        `http://localhost:3000/api/invoice/deleteInvoice/${invoiceId}`, // Removed unnecessary colon
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        Swal.fire("Deleted!", "Invoice has been deleted.", "success"); // Success popup
        fetchInvoices(); // Refresh product list or invoices
        setDropdownIndex(null);
      } else {
        Swal.fire("Failed!", data.message || "Failed to delete the invoice.", "error"); // Error popup
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      Swal.fire("Error!", "An unexpected error occurred. Please try again later.", "error");
    }
  };
  

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchUserInfo();
  }, []);

  // Filter Logic
  const applyFilters = () => {
    let filtered = allInvoiceData;

    if (customerFilter) {
      filtered = filtered.filter((invoice) =>
        invoice.billTo.customerName
          .toLowerCase()
          .includes(customerFilter.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.paymentStatus.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (fromDate) {
      filtered = filtered.filter(
        (invoice) => new Date(invoice.invoiceDate) >= new Date(fromDate)
      );
    }
    if (toDate) {
      filtered = filtered.filter(
        (invoice) => new Date(invoice.invoiceDate) <= new Date(toDate)
      );
    }

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setCustomerFilter("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setFilteredData(allInvoiceData); // Reset table data
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilter, customerFilter, fromDate, toDate]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Invoices</h1>
          <button
            onClick={() => handleTabChange("createinvoices")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Create an Invoice
          </button>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg">
          <div>
            <h2 className="text-gray-600 text-sm">Total due</h2>
            <p className="text-xl font-bold text-red-600">
              ₹{allUserInfo.total_invoice_balance ||0}
            </p>
            <p className="text-gray-500 text-sm">
              Last updated just a moment ago.
            </p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Paid</h2>
            <p className="text-xl font-bold text-gray-800">
              ₹{allUserInfo.total_invoice_paid_amount||0}
            </p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Invoice Generated</h2>
            <p className="text-xl font-bold text-gray-800">
              ₹{allUserInfo.total_invoice_amount||0}
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mt-10">
          <input
            type="text"
            placeholder="Search customer name"
            className="p-2 border rounded-lg text-gray-700 bg-white"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
          />
          <select
            className="p-2 border rounded-lg text-gray-700 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="partially paid">Partially Paid</option>
          </select>
          <input
            type="date"
            className="p-2 border rounded-lg text-gray-700 bg-white"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border rounded-lg text-gray-700 bg-white"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <button
            onClick={resetFilters}
            className="p-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Reset
          </button>
        </div>

        {/* Tab Section */}
        <div className="flex flex-wrap mt-6 space-x-2 sm:space-x-4">
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
            All invoices{" "}
            <span className="font-bold">{allInvoiceData.length}</span>
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg">
            Paid{" "}
            <span className="font-bold">
              {
                allInvoiceData.filter(
                  (invoice) => invoice.paymentStatus === "paid"
                ).length
              }
            </span>
          </button>

          <button className="px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg">
            Partially Paid{" "}
            <span className="font-bold">
              {
                allInvoiceData.filter(
                  (invoice) => invoice.paymentStatus === "partially paid"
                ).length
              }
            </span>
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg">
            Unpaid{" "}
            <span className="font-bold">
              {
                allInvoiceData.filter(
                  (invoice) => invoice.paymentStatus === "unpaid"
                ).length
              }
            </span>
          </button>
        </div>

        {/* Table Section */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-center">
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Invoice ID</th>
                <th className="px-4 py-2">Biller Name</th>
                <th className="px-4 py-2">Bill Date</th>

                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredData].reverse().map((invoice, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } text-center`}
                >
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs ${
                        invoice.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : invoice.paymentStatus === "partially paid"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-blue-500 hover:underline">
                  {allUserInfo.invoice_Prefix}{invoice.invoiceNumber}
                  </td>
                  <td className="px-4 py-2">{invoice.billTo.customerName}</td>
                  <td className="px-4 py-2">
                    {new Date(invoice.invoiceDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{invoice.products.length}</td>
                  <td className="px-4 py-2">₹{invoice.payment.grandTotal}</td>

                  <td className="px-4 py-2 relative">
                    {/* Toggle Dropdown */}
                    <div
                      className="relative inline-block text-left"
                      ref={(el) => (dropdownRefs.current[index] = el)}
                    >
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-full focus:outline-none"
                      >
                        <MoreHorizontal className="w-6 h-6 text-gray-700" />
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownIndex === index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                          <ul className="py-1">
                            {[
                              {
                                label: "View Details",
                                icon: <Eye className="w-5 h-5 text-blue-500" />,
                                onClick: () => {
                                  setActiveTab("preview-page");
                                  navigate(`/dashboard/${"preview-page"}`, 
                                    {state: { invoiceData: invoice, userData :allUserInfo}});
                                },
                              },
                              {
                                label: "Download",
                                icon: <Download className="h-5 w-5" />,
                                onClick: () => {
                                  ReusableFunctions.downloadInvoice(
                                    invoice,
                                    allUserInfo
                                  );
                                  setTimeout(() => setDropdownIndex(null), 500); // Close the dropdown
                                },
                              },
                              {
                                label: "Send Invoice",
                                icon: <Mail className="h-5 w-5 text-red-500" />,
                                onClick: () => alert("Sending Invoice..."),
                              },
                              {
                                label: "Print",
                                icon: (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-500"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5h2a2 2 0 012 2v6a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2H4a2 2 0 01-2-2v-6a2 2 0 012-2h2zm2 0h8V5H8v4zm8 2H8v6h8v-6zm-8 8h8v-1H8v1zm10-2h2v-6h-2v6zm-12-6H4v6h2v-6z" />
                                  </svg>
                                ),
                                onClick: () => {
                                  ReusableFunctions.handlePrintInvoice(
                                    invoice,
                                    allUserInfo
                                  );
                                  setTimeout(() => setDropdownIndex(null), 500);
                                },
                              },
                              {
                                label: "Delete",
                                icon: (
                                  <Trash className="w-5 h-5 text-red-500" />
                                ),
                                onClick: () => handleDelete(invoice._id),
                              },
                            ].map((action, actionIndex) => (
                              <li
                                key={actionIndex}
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={action.onClick}
                              >
                                {action.icon}
                                <span className="ml-2">{action.label}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredData.length && (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;

//-------------------------------------------------------
// import React from 'react';
// import { useEffect, useState } from "react";
// import {

//     Download,
//     Mail,

//   } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const InvoiceList = ({setActiveTab}) => {

//     const [allInvoiceData, setallInvoiceData] = useState([]);
//     const [allCustomers, setAllCustomers] = useState([]);
//     const [allUserInfo, setAllUserInfo] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     const fetchInvoices = async () => {
//         try {
//           const token = localStorage.getItem("authToken");

//           const response = await fetch(
//             "http://localhost:3000/api/invoice/fetchAllInvoice",

//             {
//               method: "GET",

//               headers: {
//                 "Content-Type": "application/json",

//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (response.ok) {
//             const data = await response.json();

//             console.log("Raw data :", data)

//             setallInvoiceData(data.invoices);

//             // console.log('allInvoiceData',allInvoiceData);

//             // fetchCustomers();
//           } else {
//             console.error("Failed to fetch products:", response.statusText);
//           }
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       const fetchCustomers = async () => {
//         try {
//           const token = localStorage.getItem("authToken");
//           const response = await fetch(
//             "http://localhost:3000/api/customers/fetchAllCustomer",
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (response.ok) {
//             const data = await response.json();
//             // console.log("data.customers:", data);
//             setAllCustomers(data.customer);
//             // fetchCustomers();
//           } else {
//             console.error("Failed to fetch products:", response.statusText);
//           }
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       const fetchUserInfo = async () => {
//         try {
//           const token = localStorage.getItem("authToken");

//           if (!token) {
//             console.error("No auth token found in localStorage.");
//             setLoading(false);
//             return;
//           }

//           const response = await fetch(
//             "http://localhost:3000/api/auth/user-profile",
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );

//           if (response.ok) {
//             const data = await response.json();
//             // console.log("User data fetched:--", data.user);

//             setAllUserInfo(data.user);
//             setLoading(false);
//             // Uncomment if needed
//             // fetchCustomers();
//             // console.log("allUserInfo.first_name:", allUserInfo.first_name);
//           } else {
//             console.error(
//               `Failed to fetch user info: ${response.status} - ${response.statusText}`
//             );
//             setLoading(false);
//           }
//         } catch (error) {
//           console.error("Error fetching user info:", error.message);
//         } finally {
//           setLoading(false); // Ensure the loading state is cleared
//         }
//       };

//       useEffect(() => {
//         try {
//               fetchInvoices(); // Ensure invoice data is fetched before proceeding
//               fetchCustomers(); // Ensure customer data is fetched before proceeding
//               fetchUserInfo(); // Ensure user data is fetched before proceeding

//           } catch (error) {
//             console.error("Error in handleTabChange:", error);
//           }

//       },[setActiveTab]); // Dependency array

//     const handleTabChange = (newTab) => {
//         setActiveTab(newTab); // Update the activeTab in the Dashboard
//         navigate(`/dashboard/${newTab}`);
//         window.scrollTo(0, 0);
//       };

//   return (
//     <div className="bg-gray-50 min-h-screen ">
//       <div className=" bg-white rounded-lg shadow-md p-6">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-gray-800">Invoices</h1>
//           <button
//           onClick={() => handleTabChange("createinvoices")}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
//             Create an Invoice
//           </button>
//         </div>

//         {/* Summary Section */}
//         <div className="grid grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg">
//           <div>
//             <h2 className="text-gray-600 text-sm">Overdue</h2>
//             <p className="text-xl font-bold text-red-600">₹468,854.10 INR</p>
//             <p className="text-gray-500 text-sm">Last updated just a moment ago.</p>
//           </div>
//           <div>
//             <h2 className="text-gray-600 text-sm">Due within next 30 days</h2>
//             <p className="text-xl font-bold text-gray-800">₹0.00 INR</p>
//           </div>
//           <div>
//             <h2 className="text-gray-600 text-sm">Average time to get paid</h2>
//             <p className="text-xl font-bold text-gray-800">23 days</p>
//           </div>
//         </div>

//         {/* Filters Section */}
// <div className="mt-8">
//   <div className="flex flex-wrap items-center gap-4 justify-between">
//     {/* Filters Container */}
//     <div className="flex flex-wrap gap-4">
//       <select className="p-2 border rounded-lg text-gray-700 bg-white w-full sm:w-auto">
//         <option>All customers</option>
//       </select>
//       <select className="p-2 border rounded-lg text-gray-700 bg-white w-full sm:w-auto">
//         <option>All statuses</option>
//       </select>
//       <input
//         type="date"
//         className="p-2 border rounded-lg text-gray-700 bg-white w-full sm:w-auto"
//       />
//       <input
//         type="date"
//         className="p-2 border rounded-lg text-gray-700 bg-white w-full sm:w-auto"
//       />
//       <input
//         type="text"
//         placeholder="Enter invoice #"
//         className="p-2 border rounded-lg text-gray-700 bg-white w-full sm:w-auto"
//       />
//       <button className="p-2 w-full sm:w-auto border rounded-lg bg-blue-600 text-white hover:bg-blue-700">
//         Search
//       </button>
//     </div>
//     {/* Reset Button */}
//     <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-end">
//       <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 w-full sm:w-auto">
//         Reset Filters
//       </button>
//     </div>
//   </div>
// </div>

//        {/* Tab Section */}
// <div className="flex flex-wrap mt-6 space-x-2 sm:space-x-4">
//   <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
//     Unpaid <span className="font-bold">23</span>
//   </button>
//   <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
//     Draft <span className="font-bold">0</span>
//   </button>
//   <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
//     All invoices
//   </button>
// </div>

// {/* Table Section */}
// <div className="mt-6 overflow-x-auto">
//   <table className="w-full text-left border-collapse min-w-[700px]">
//     <thead>
//       <tr className="bg-gray-50 text-gray-600 text-center">
//         <th className="px-4 py-2">Invoice ID</th>
//         <th className="px-4 py-2">Biller Name</th>
//         <th className="px-4 py-2">Bill Date</th>
//         <th className="px-4 py-2">Status</th>
//         <th className="px-4 py-2">Qty</th>
//         <th className="px-4 py-2">Total</th>
//         <th className="px-4 py-2">Actions</th>
//         <th className="px-4 py-2">Send To User</th>
//       </tr>
//     </thead>
//     <tbody>
//       {allInvoiceData.map((invoice, index) => (
//         <tr
//           key={index}
//           className={`hover:bg-gray-100 ${
//             index % 2 === 0 ? "bg-white" : "bg-gray-50"
//           } text-center`}
//         >
//           <td className="px-4 py-2 text-blue-500 hover:underline">
//             {invoice.invoiceNumber}
//           </td>

//           <td className="px-4 py-2">{invoice.billTo.customerName}</td>

//           <td className="px-4 py-2">
//             {new Date(invoice.invoiceDate).toLocaleDateString()}
//           </td>

//           <td className="px-4 py-2">
//             <span
//               className={`inline-block rounded-full px-2 py-1 text-xs ${
//                 invoice.paymentStatus === "paid"
//                   ? "bg-green-100 text-green-600"
//                   : invoice.paymentStatus === "partially paid"
//                   ? "bg-yellow-100 text-yellow-600"
//                   : "bg-red-100 text-red-600"
//               }`}
//             >
//               {invoice.paymentStatus}
//             </span>
//           </td>

//           <td className="px-4 py-2">{invoice.products.length}</td>

//           <td className="px-4 py-2">₹{invoice.payment.grandTotal}</td>

//           <td className="px-4 py-2">
//             <div className="flex justify-center space-x-2">
//               <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
//                 <Download className="h-5 w-5" />
//               </button>
//               <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
//                 <Mail className="h-5 w-5" />
//               </button>
//               <button
//                 className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
//                 onClick={() => window.print()}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M6 9V4a1 1 0 011-1h10a1 1 0 011 1v5h2a2 2 0 012 2v6a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2H4a2 2 0 01-2-2v-6a2 2 0 012-2h2zm2 0h8V5H8v4zm8 2H8v6h8v-6zm-8 8h8v-1H8v1zm10-2h2v-6h-2v6zm-12-6H4v6h2v-6z" />
//                 </svg>
//               </button>
//             </div>
//           </td>

//           <td className="px-4 py-2">
//             <span className="inline-block rounded-full px-3 py-1 text-xs bg-green-100 text-green-600">
//               Sent
//             </span>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//       </div>
//     </div>
//   );
// };

// export default InvoiceList;

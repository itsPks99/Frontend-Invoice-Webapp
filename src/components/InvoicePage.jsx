import React, { useEffect, useState, useRef } from "react";
import {
  MoreHorizontal,
  Trash,
  Eye,
  X,
} from "lucide-react";
import { Download } from "lucide-react";
import { redirect, useNavigate } from "react-router-dom";
import ReusableFunctions from "./ReusableFunctions";
import Swal from "sweetalert2";
import PreviewPage from "./PreviewPage";
import { useLocation } from "react-router-dom";
import { use } from "react";
import { i } from "framer-motion/client";
// import { Button } from 'storybook';

const InvoicePage = ({ setActiveTab }) => {
  const location = useLocation();
  const { invoiceId, customerId, userId } = location.state || {};
  console.log("invoiceId, customerId, userId", invoiceId, customerId, userId)
  const [allInvoiceData, setAllInvoiceData] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [redirectInvoiveData, setRedirectInvoiceData] = useState(
    { invoiceId: invoiceId, customerId: customerId, userId: userId, redirected: false });

  const dropdownRefs = useRef([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ===== Fetch =====
  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/invoice/fetchAllInvoice", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAllInvoiceData(data.invoices);
        setFilteredData(data.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };


  useEffect(() => {
    // if (redirectInvoiveData.redirected) return;
    if (redirectInvoiveData.invoiceId && redirectInvoiveData.customerId && redirectInvoiveData.userId) {
      if (allInvoiceData.length > 0) {
        setSelectedInvoice(allInvoiceData.find((invoice) => invoice._id === redirectInvoiveData.invoiceId));
      }
    }
  }, [redirectInvoiveData.redirected, allInvoiceData]); 

  useEffect(() => {
    console.log("tsdrfgh", allInvoiceData.find((invoice) => invoice._id === redirectInvoiveData.invoiceId))
    if (selectedInvoice === null) {
      console.log("No invoice selected yet");
    } else {
      console.log("Selected invoice:", selectedInvoice);
    }
  }, [selectedInvoice]);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/auth/user-profile", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAllUserInfo(data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchUserInfo();
  }, []);

  // ===== Filter Logic =====
  useEffect(() => {
    const filtered = allInvoiceData.filter((invoice) => {
      const invoiceId = `${allUserInfo.invoice_Prefix}${invoice.invoiceNumber}`.toLowerCase();
      const total = invoice.payment.grandTotal.toString();
      const customerName = invoice.billTo.customerName?.toLowerCase() || "";
      const paymentStatus = invoice.paymentStatus?.toLowerCase() || "";
      const invoiceDate = new Date(invoice.invoiceDate);

      return (
        (searchTerm === "" ||
          invoiceId.includes(searchTerm.toLowerCase()) ||
          total.includes(searchTerm) ||
          customerName.includes(searchTerm)) &&
        (statusFilter === "" || paymentStatus === statusFilter.toLowerCase()) &&
        (fromDate === "" || invoiceDate >= new Date(fromDate)) &&
        (toDate === "" || invoiceDate <= new Date(toDate))
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, statusFilter, fromDate, toDate, allInvoiceData]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setFilteredData(allInvoiceData);
  };

  const handleDelete = async (invoice) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3000/api/invoice/deleteInvoice/${invoice._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        Swal.fire("Deleted!", "Invoice deleted.", "success");

        // ✅ Use updated user returned from backend
        setAllUserInfo(data.user);

        // ✅ Refresh invoices list
        await fetchInvoices();

        setDropdownIndex(null);
        setSelectedInvoice(null);
      } else {
        console.error("Failed to delete invoice");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };



  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  // ===== Table Renderer =====
  const renderTable = () => (
    <table className="w-full text-left border-collapse min-w-[700px]">
      <thead>
        <tr className="bg-blue-100 text-center">
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Invoice ID</th>
          <th className="px-4 py-2">Customer Name</th>
          <th className="px-4 py-2">Invoice Date</th>
          <th className="px-4 py-2">Qty</th>
          <th className="px-4 py-2">Total</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[...filteredData].reverse().map((invoice, index) => (
          <tr
            key={index}
            onClick={() => setSelectedInvoice(invoice)}
            className={`hover:bg-gray-100 cursor-pointer ${selectedInvoice?._id === invoice._id ? "bg-blue-50" : ""
              } text-center`}
          >
            <td className="px-4 py-2">
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs ${invoice.paymentStatus === "paid"
                  ? "bg-green-100 text-green-600"
                  : invoice.paymentStatus === "partially paid"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {invoice.paymentStatus}
              </span>
            </td>
            <td className="px-4 py-2">
              {allUserInfo.invoice_Prefix}
              {invoice.invoiceNumber}
            </td>
            <td className="px-4 py-2">{invoice.billTo.customerName}</td>
            <td className="px-4 py-2">
              {new Date(invoice.invoiceDate).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">{invoice.products.length}</td>
            <td className="px-4 py-2">₹{invoice.payment.grandTotal}</td>
            <td className="px-4 py-2 relative" onClick={(e) => e.stopPropagation()}>
              <div
                className="relative inline-block text-left"
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownIndex(dropdownIndex === index ? null : index);
                  }}
                  className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                >
                  <MoreHorizontal className="w-6 h-6 text-gray-700" />
                </button>

                {dropdownIndex === index && (
                  <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-lg z-[1000]">
                    <ul className="py-1">
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        <Eye className="w-5 h-5 text-blue-500" />
                        <span className="ml-2">View</span>
                      </li>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          ReusableFunctions.downloadInvoice(invoice, allUserInfo)
                        }
                      >
                        <Download className="h-5 w-5" />
                        <span className="ml-2">Download</span>
                      </li>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDelete(invoice)}
                      >
                        <Trash className="w-5 h-5 text-red-500" />
                        <span className="ml-2">Delete</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // ===== Render =====
  return (
    <div className="bg-gray-50 min-h-screen">
      {selectedInvoice ? (
        <div className="flex w-full">
          {/* LEFT Panel */}
          <div className="w-1/3 flex flex-col  bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-800">Invoices</h1>
              {/* <button
                onClick={() => handleTabChange("createinvoices")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                Create an Invoice
              </button> */}
            </div>
            {/* Summary Section */}
            {/* <div className="grid grid-cols-3 gap-6 bg-gray-100 p-4 mb-4 rounded-lg">
              <div>
                <h2 className="text-gray-600 text-sm">Total due</h2>
                <p className="text-xl font-bold text-red-600">₹{allUserInfo.total_invoice_balance || 0}</p>
                <p className="text-gray-500 text-sm">Last updated just a moment ago.</p>
              </div>
              <div>
                <h2 className="text-gray-600 text-sm">Total Paid</h2>
                <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_invoice_paid_amount || 0}</p>
              </div>
              <div>
                <h2 className="text-gray-600 text-sm">Total Invoice Generated</h2>
                <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_invoice_amount || 0}</p>
              </div>
            </div> */}
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                // style={{fontSize:'13px'}}
                type="text"
                placeholder="Search by ID, Total or Customer Name"
                className="p-2 border rounded-lg text-gray-700 bg-white w-full "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <input
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
              /> */}
              {/* <button
                onClick={resetFilters}
                className="p-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Reset
              </button> */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All ({allInvoiceData.length})</option>
                <option value="paid">Paid ({allInvoiceData.filter((invoice) => invoice.paymentStatus === "paid").length})</option>
                <option value="partially paid">Partially Paid ({allInvoiceData.filter((invoice) => invoice.paymentStatus === "partially paid").length})</option>
                <option value="unpaid">Unpaid ({allInvoiceData.filter((invoice) => invoice.paymentStatus === "unpaid").length})</option>
              </select>

            </div>

            {/* Status Tabs */}
            {/* <div className="flex flex-wrap mb-6 space-x-2 sm:space-x-4">
              <button
                className={`px-4 py-2 bg-gray-100 text-gray-600 rounded-lg ${statusFilter === "" ? "border-2 border-gray-300" : ""
                  }`}
                onClick={() => setStatusFilter("")}
              >
                All <span className="font-bold">{allInvoiceData.length}</span>
              </button>
              <button
                className={`px-4 py-2 bg-green-100 text-green-600 rounded-lg ${statusFilter === "paid" ? "border-2 border-green-300" : ""
                  }`}
                onClick={() => setStatusFilter("paid")}
              >
                Paid
              </button>
              <button
                className={`px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg ${statusFilter === "partially paid" ? "border-2 border-yellow-300" : ""
                  }`}
                onClick={() => setStatusFilter("partially paid")}
              >
                Partially Paid
              </button>
              <button
                className={`px-4 py-2 bg-red-100 text-red-600 rounded-lg ${statusFilter === "unpaid" ? "border-2 border-red-300" : ""
                  }`}
                onClick={() => setStatusFilter("unpaid")}
              >
                Unpaid
              </button>
            </div> */}

            {/* Table */}
            <table className="w-full text-left border-collapse border-y border-gray-400"
              style={{ padding: '1px' }}>

              <thead>
                <tr className="bg-blue-100 text-center">
                  {/* <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Invoice ID</th> */}
                  {/* <th className="px-4 py-2">Customer Name</th>
          <th className="px-4 py-2">Bill Date</th> */}
                  {/* <th className="px-4 py-2">Qty</th> */}
                  {/* <th className="px-4 py-2">Total</th> */}
                  {/* <th className="px-4 py-2">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {[...filteredData].reverse().map((invoice, index) => (
                  <tr
                    key={index}
                    tabIndex={-1}
                    className={`hover:bg-gray-50 cursor-pointer border-b ${selectedInvoice?._id === invoice._id ? "bg-blue-50" : ""
                      }`}
                    onClick={() => setSelectedInvoice(invoice)}
                  >

                    {/* ✅ Main invoice cell */}
                    <td className="px-3 py-3">
                      {/* Primary line */}
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-gray-900" style={{ textTransform: 'capitalize' }}>
                          {invoice.billTo.customerName}
                        </div>
                        <span className="text-gray-800 font-semibold">
                          ₹{invoice.payment.grandTotal}
                        </span>
                      </div>

                      {/* Secondary line */}
                      <div className="mt-1 text-sm text-gray-600 flex flex-wrap items-center">
                        <span className="text-blue-700 font-medium">
                          {allUserInfo.invoice_Prefix}
                          {invoice.invoiceNumber}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span
                          style={{ textTransform: 'uppercase' }}
                          className={`font-medium ${invoice.paymentStatus === "paid"
                            ? "text-green-600"
                            : invoice.paymentStatus === "partially paid"
                              ? "text-yellow-600"
                              : "text-red-600"
                            }`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* RIGHT Panel */}
          <div className="w-2/3 border-l bg-white relative z-index[1000]">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-2 right-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <PreviewPage invoiceData={selectedInvoice} userData={allUserInfo} onClose={() => setSelectedInvoice(null)} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Invoices</h1>
            <button
              onClick={() => handleTabChange("createinvoices")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              {/* <Button variant="filled" size="md" onClick={() => handleTabChange("createinvoices")}>
                Create an Invoice
              </Button> */}
              Create an Invoice
            </button>
          </div>

          {/* ✅ Summary Section */}
          <div className="grid grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg mb-6">
            <div>
              <h2 className="text-gray-600 text-sm">Total due</h2>
              <p className="text-xl font-bold text-red-600">₹{allUserInfo.total_invoice_balance || 0}</p>
              <p className="text-gray-500 text-sm">Last updated just a moment ago.</p>
            </div>
            <div>
              <h2 className="text-gray-600 text-sm">Total Paid</h2>
              <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_invoice_paid_amount || 0}</p>
            </div>
            <div>
              <h2 className="text-gray-600 text-sm">Total Invoice Generated</h2>
              <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_invoice_amount || 0}</p>
            </div>
          </div>


          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by ID, Total, or Customer Name"
              className="p-2 border rounded-lg text-gray-700 bg-white w-full md:w-1/2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

          {/* Status Tabs */}
          <div className="flex flex-wrap mb-6 space-x-2 sm:space-x-4">
            <button
              className={`px-4 py-2 bg-gray-100 text-gray-600 rounded-lg ${statusFilter === "" ? "border-2 border-gray-300" : ""
                }`}
              onClick={() => setStatusFilter("")}
            >
              All <span className="font-bold">{allInvoiceData.length}</span>
            </button>
            <button
              className={`px-4 py-2 bg-green-100 text-green-600 rounded-lg ${statusFilter === "paid" ? "border-2 border-green-300" : ""
                }`}
              onClick={() => setStatusFilter("paid")}
            >
              Paid{" "}
              <span className="font-bold">
                {allInvoiceData.filter((invoice) => invoice.paymentStatus === "paid").length}
              </span>
            </button>
            <button
              className={`px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg ${statusFilter === "partially paid" ? "border-2 border-yellow-300" : ""
                }`}
              onClick={() => setStatusFilter("partially paid")}
            >
              Partially Paid{" "}
              <span className="font-bold">
                {allInvoiceData.filter((invoice) => invoice.paymentStatus === "partially paid").length}
              </span>
            </button>
            <button
              className={`px-4 py-2 bg-red-100 text-red-600 rounded-lg ${statusFilter === "unpaid" ? "border-2 border-red-300" : ""
                }`}
              onClick={() => setStatusFilter("unpaid")}
            >
              Unpaid {" "}
              <span className="font-bold">
                {allInvoiceData.filter((invoice) => invoice.paymentStatus === "unpaid").length}
              </span>
            </button>
          </div>

          {/* Table */}
          {renderTable()}
        </div>
      )}
    </div>
  );
};

export default InvoicePage;

import React, { useEffect, useState, useRef } from "react";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { Download, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReusableFunctions from "./ReusableFunctions";
import Swal from "sweetalert2";

const EstimateList = ({ setActiveTab }) => {
  const [allEstimateData, setAllEstimateData] = useState([]);
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
  const [estimateIdFilter, setEstimateIdFilter] = useState("");
  const [totalFilter, setTotalFilter] = useState("");
  const [quantityFilter, setQuantityFilter] = useState("");

  const [searchTerm, setSearchTerm] = useState(""); // For global search

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

  const fetchEstimates = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/estimates/getAllEstimates", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("data.estimates",data.estimates);
        // setAllEstimateData(data.estimates);
        // setFilteredData(data.estimates); // Initialize filtered data
      }
    } catch (error) {
      console.error("Error fetching estimates:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/customers/fetchAllCustomer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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

      const response = await fetch("http://localhost:3000/api/auth/user-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data fetched:--", data.user);

        setAllUserInfo(data.user);
        // Uncomment if needed
        // fetchCustomers();
        // console.log("allUserInfo.first_name:", allUserInfo.first_name);
      } else {
        console.error(`Failed to fetch user info: ${response.status} - ${response.statusText}`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    } finally {
      setLoading(false); // Ensure the loading state is cleared
    }
  };

  const handleDelete = async (estimateId) => {
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
        `http://localhost:3000/api/estimate/deleteEstimate/${estimateId}`, // Removed unnecessary colon
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
        Swal.fire("Deleted!", "Estimate has been deleted.", "success"); // Success popup
        fetchEstimates(); // Refresh product list or estimates
        setDropdownIndex(null);
      } else {
        Swal.fire("Failed!", data.message || "Failed to delete the estimate.", "error"); // Error popup
      }
    } catch (error) {
      console.error("Error deleting estimate:", error);
      Swal.fire("Error!", "An unexpected error occurred. Please try again later.", "error");
    }
  };

  useEffect(() => {
    fetchEstimates();
    fetchCustomers();
    fetchUserInfo();
  }, []);

 

  useEffect(() => {
    const filtered = allEstimateData.filter((estimate) => {
      const estimateId = `${allUserInfo.estimate_Prefix}${estimate.estimateNumber}`.toLowerCase();
      const total = estimate.payment.grandTotal.toString();
      // const qty = estimate.products.length.toString();
      const customerName = estimate.billTo.customerName?.toLowerCase() || "";
      const paymentStatus = estimate.paymentStatus?.toLowerCase() || "";
      const estimateDate = new Date(estimate.estimateDate);

      return (
        (searchTerm === "" ||
          estimateId.includes(searchTerm.toLowerCase()) ||
          total.includes(searchTerm) ||
          // qty.includes(searchTerm) ||
          customerName.includes(searchTerm)) &&
        (customerFilter === "" || customerName.includes(customerFilter.toLowerCase())) &&
        (statusFilter === "" || paymentStatus === statusFilter.toLowerCase()) &&
        (fromDate === "" || estimateDate >= new Date(fromDate)) &&
        (toDate === "" || estimateDate <= new Date(toDate))
      );
    });

    setFilteredData(filtered);
  }, [searchTerm, customerFilter, statusFilter, fromDate, toDate, allEstimateData]);

  // const resetFilters = () => {
  //   setCustomerFilter("");
  //   setStatusFilter("");
  //   setFromDate("");
  //   setToDate("");
  //   setEstimateIdFilter("");
  //   setTotalFilter("");
  //   setQuantityFilter("");
  //   setFilteredData(allEstimateData); // Reset table data
  // };
  const resetFilters = () => {
    setSearchTerm("");
    setCustomerFilter("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
    setFilteredData(allEstimateData); // Reset table data
  };

  // useEffect(() => {
  //   applyFilters();
  // }, [statusFilter, customerFilter, fromDate, toDate]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Estimates</h1>
          <button
            onClick={() => handleTabChange("createestimates")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Create an Estimate
          </button>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-6 bg-gray-100 p-4 rounded-lg">
          <div>
            <h2 className="text-gray-600 text-sm">Total due</h2>
            <p className="text-xl font-bold text-red-600">₹{allUserInfo.total_estimate_balance || 0}</p>
            <p className="text-gray-500 text-sm">Last updated just a moment ago.</p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Paid</h2>
            <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_estimate_paid_amount || 0}</p>
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Estimate Generated</h2>
            <p className="text-xl font-bold text-gray-800">₹{allUserInfo.total_estimate_amount || 0}</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mt-10">
          {/* <input
            type="text"
            placeholder="Search customer name"
            className="p-2 border rounded-lg text-gray-700 bg-white"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
          /> */}

          <input
            type="text"
            placeholder="Search by ID, Total, or Customer Name"
            className="p-2 border rounded-lg text-gray-700 bg-white w-full md:w-1/2 "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <select
            className="p-2 border rounded-lg text-gray-700 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="partially paid">Partially Paid</option>
          </select> */}
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

          <button onClick={resetFilters} className="p-2 border rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Reset
          </button>
        </div>

        {/* Tab Section */}
        <div className="flex flex-wrap mt-6 space-x-2 sm:space-x-4">
          <button className={`px-4 py-2 bg-gray-100 text-gray-600 rounded-lg ${statusFilter === "" ? "border-2 border-gray-300" : ""}`} onClick={() => setStatusFilter("")}>
            All estimates <span className="font-bold">{allEstimateData.length}</span>
          </button>
          <button className={`px-4 py-2 bg-green-100 text-green-600 rounded-lg ${statusFilter === "paid" ? "border-2 border-green-300" : ""}`} onClick={() => setStatusFilter("paid")}>
            Paid{" "}
            <span className="font-bold">
              {allEstimateData.filter((estimate) => estimate.paymentStatus === "paid").length}
            </span>
          </button>

          <button
            className={`px-4 py-2 bg-yellow-100 text-yellow-600 rounded-lg ${statusFilter === "partially paid" ? "border-2 border-yellow-300" : ""}`}
            onClick={() => setStatusFilter("partially paid")}
          >
            Partially Paid{" "}
            <span className="font-bold">
              {allEstimateData.filter((estimate) => estimate.paymentStatus === "partially paid").length}
            </span>
          </button>
          <button className={`px-4 py-2 bg-red-100 text-red-600 rounded-lg ${statusFilter === "unpaid" ? "border-2 border-red-300" : ""}`} onClick={() => setStatusFilter("unpaid")}>
            Unpaid{" "}
            <span className="font-bold">
              {allEstimateData.filter((estimate) => estimate.paymentStatus === "unpaid").length}
            </span>
          </button>
        </div>

        {/* Table Section */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-center">
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Estimate ID</th>
                <th className="px-4 py-2">Biller Name</th>
                <th className="px-4 py-2">Bill Date</th>

                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredData].reverse().map((estimate, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} text-center`}
                >
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs ${
                        estimate.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : estimate.paymentStatus === "partially paid"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {estimate.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-blue-500 hover:underline">
                    {allUserInfo.estimate_Prefix}
                    {estimate.estimateNumber}
                  </td>
                  <td className="px-4 py-2">{estimate.billTo.customerName}</td>
                  <td className="px-4 py-2">{new Date(estimate.estimateDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{estimate.products.length}</td>
                  <td className="px-4 py-2">₹{estimate.payment.grandTotal}</td>

                  <td className="px-4 py-2 relative">
                    {/* Toggle Dropdown */}
                    <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[index] = el)}>
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
            navigate(`/dashboard/${"preview-page"}`, {
              state: { estimateData: estimate, userData: allUserInfo },
            });
          },
        },
        {
          label: "Download",
          icon: <Download className="h-5 w-5" />,
          onClick: () => {
            ReusableFunctions.downloadEstimate(estimate, allUserInfo);
            setTimeout(() => setDropdownIndex(null), 500); // Close the dropdown
          },
        },
        {
          label: "Send Estimate",
          icon: <Mail className="h-5 w-5 text-red-500" />,
          onClick: () => alert("Sending Estimate..."),
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
            ReusableFunctions.handlePrintEstimate(estimate, allUserInfo);
            setTimeout(() => setDropdownIndex(null), 500);
          },
        },
        {
          label: "Delete",
          icon: <Trash className="w-5 h-5 text-red-500" />,
          onClick: () => handleDelete(estimate._id),
        },
        {
          label: "Share on WhatsApp",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382a8.89 8.89 0 01-3.785-.906l-.27-.132-1.686.892a.488.488 0 01-.658-.187l-.497-1.049a.505.505 0 01.047-.516c.03-.035 3.207-3.608 3.207-4.263 0-.186-.049-.321-.129-.412-.08-.091-.191-.136-.311-.136-.187 0-4.154 2.16-5.224 2.83-.143.086-.265.086-.359.014-.093-.073-1.22-.894-1.42-1.058-.201-.163-.363-.156-.513-.052-.137.094-1.19.72-1.412.86-.213.14-.294.23-.258.334.137.407.736 1.75 1.287 2.342.418.46 1.426 1.153 2.23 1.427.814.281 1.79.468 2.664.486.774.016 1.727-.188 2.046-.243.377-.065.633-.192.863-.322l.21-.117c.232-.13.545-.305.857-.525.167-.12.342-.261.518-.414a9.035 9.035 0 003.624-7.35 8.924 8.924 0 00-2.61-6.398 8.924 8.924 0 00-6.397-2.61 8.923 8.923 0 00-6.398 2.61 8.923 8.923 0 00-2.61 6.398c0 2.384.934 4.682 2.61 6.398a8.922 8.922 0 006.398 2.61c2.383 0 4.681-.934 6.398-2.61.048-.048.097-.096.145-.145z" />
            </svg>
          ),
          onClick: () => {
            ReusableFunctions.shareOnWhatsApp(estimate, allUserInfo);
            setTimeout(() => setDropdownIndex(null), 500); // Close the dropdown
          },
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
                    No estimates found.
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

export default EstimateList;

import React, { useEffect, useState } from "react";
import VendorInfo from "./VendorInfoDemi";
import VendorStatementTemplate from "./InvoiceTemplates/VendorStatementTemplate";
import ReusableFunctions from "./ReusableFunctions";


const VendorStatements = () => {
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedVendorDetails, setSelectedVendorDetails] = useState([]);
  // const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allStatementData, setallStatementData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchVendors = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/vendor/fetchAllVendor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('data', data.vendor);
        setAllVendors(data.vendor);
        // setFilteredVendors(data.vendor); // Initialize filtered data
        setIsLoading(false);
      } else {
        console.error("Failed to fetch vendors:", response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

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
        setAllUserInfo(data.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    } finally {
        setIsLoading(false);
    }
  };

  

  const fetchVendorStatement = async (vendorId) => {
    try {
        setIsLoading(true); // Set loading state before making the API call

      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Authorization token is missing.");
        setallStatementData([]); // Clear the statement data
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/vendorStatement/get-particular-Vendor-Statements?vendorId=${vendorId}`,
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
        if (data && data.statements) {
          setallStatementData(data.statements);
          console.log("VendorStatement", data.statements);
          setIsLoading(false);
        } else {
          console.warn("No statements found for the vendor.");
          setallStatementData([]);
          setIsLoading(false);
        }
      } else {
        console.error(
          "Error fetching vendor statement:",
          response.status,
          response.statusText
        );
        setIsLoading(false);
        setallStatementData([]); // Clear the statement data on error
      }
    } catch (error) {
      setallStatementData([]); // Clear the statement data on error
      console.error("Error fetching vendor statement:", error.message);
    } finally {
        setIsLoading(false); // Reset loading state after the API call
    }
  };

  const handleRefresh = () => {
    setSelectedVendor(""); // Clear vendor dropdown
    // setSelectedType(""); // Clear type dropdown
    setSelectedVendorDetails([]);
    setallStatementData([]);
  };

  const handleVendorChange = (vendorId) => {
    setSelectedVendor(vendorId);

    // Find and store the selected vendor's details
    const vendorDetails = allVendors.find(
      (vendor) => vendor._id === vendorId
    );
    setSelectedVendorDetails(vendorDetails);

    if (vendorId) {
        setIsLoading(true);
    //   fetchVendorStatement(vendorId);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchUserInfo();
  }, []);

  const handleAction = (action) => {
    setIsOpen(false); // Close the dropdown after selecting an action
    ReusableFunctions.downloadStatement("vendor",allUserInfo, selectedVendorDetails, allStatementData);
    // console.log(`Action selected: ${action}`);
    // Implement specific action logic here (e.g., download, print, or send statement)
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Vendor Statements
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between">
          {/* Vendor Select */}
          <div>
            <label
              htmlFor="vendor"
              className="block text-sm font-medium text-gray-700"
            >
              Vendor
            </label>
            <select
              id="vendor"
              value={selectedVendor}
              onChange={(e) => handleVendorChange(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-gray-600"
            >
              <option value="">Select Vendor</option>
              {allVendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {`${vendor.firstName} ${vendor.lastName}`}
                </option>
              ))}
            </select>
          </div>

          {/* Type Select */}
          {/* <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-gray-600"
            >
              <option value="">Select Type</option>
              <option value="outstanding">Outstanding invoices</option>
              <option value="paid">Paid invoices</option>
            </select>
          </div> */}

          {/* Refresh Button */}
          <div className="flex justify-end">
            <button
              onClick={handleRefresh}
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {selectedVendorDetails && ( 
        <div className="flex justify-end">
  <div className="relative inline-block text-left mb-5">
    {/* More Actions Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
    >
      More Actions
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {/* Dropdown */}
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        <ul className="py-2 text-gray-700">
          <li
            onClick={() => handleAction("Download")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Download
          </li>
          <li
            onClick={() => handleAction("Print")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Print
          </li>
          <li
            onClick={() => handleAction("Send Statement")}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Send Statement
          </li>
        </ul>
      </div>
    )}
  </div>
</div>)}



   {/* Statement Section */}
{Array.isArray(selectedVendorDetails) && selectedVendorDetails.length === 0 ? (
  <VendorInfo text={"vendors"} />
) : (
  <VendorStatementTemplate
    userData={allUserInfo}
    vendorDetails={selectedVendorDetails}
    statementData={allStatementData}
  />
)}


    </div>
  );
};

export default VendorStatements;

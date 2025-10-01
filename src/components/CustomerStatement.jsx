import React, { useEffect, useState } from "react";
import CustomerStatementTemplate from "./InvoiceTemplates/CustomerStatementTemplate";
import CustomerInfo from "./CustomerInfoDemi";
import ReusableFunctions from "./ReusableFunctions";

const CustomerStatements = () => {
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState([]);
  // const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [allStatementData, setallStatementData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchUserInfo = async () => {
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
      }
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // const fetchCustomerStatement = async () => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     if (!token) return;

  //     const response = await fetch(
  //       "http://localhost:3000/api/customerStatement/get-particular-Customer-Statements",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body:{
  //           customerId:""
  //         }
  //       }
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setAllUserInfo(data.user);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user info:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchCustomerStatement = async (customerId) => {
    try {
      setLoading(true); // Set loading state before making the API call
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Authorization token is missing.");
        setallStatementData([]); // Clear the statement data
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/customerStatement/get-particular-Customer-Statements?customerId=${customerId}`,
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
          console.log("CustomerStatement", data.statements);
        } else {
          console.warn("No statements found for the customer.");
          setallStatementData([]);
        }
      } else {
        console.error(
          "Error fetching customer statement:",
          response.status,
          response.statusText
        );
        setallStatementData([]); // Clear the statement data on error
      }
    } catch (error) {
      setallStatementData([]); // Clear the statement data on error
      console.error("Error fetching customer statement:", error.message);
    } finally {
      setLoading(false); // Reset loading state after the API call
    }
  };

  const handleRefresh = () => {
    setSelectedCustomer(""); // Clear customer dropdown
    // setSelectedType(""); // Clear type dropdown
    setSelectedCustomerDetails([]);
    setallStatementData([]);
  };

  const handleCustomerChange = (customerId) => {
    setSelectedCustomer(customerId);

    // Find and store the selected customer's details
    const customerDetails = allCustomers.find(
      (customer) => customer._id === customerId
    );
    setSelectedCustomerDetails(customerDetails);

    if (customerId) {
      setLoading(true);
      fetchCustomerStatement(customerId);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchUserInfo();
  }, []);

  const handleAction = (action) => {
    setIsOpen(false); // Close the dropdown after selecting an action
    // console.log(`Action selected: ${action}`);
    ReusableFunctions.downloadStatement("customer",allUserInfo, selectedCustomerDetails, allStatementData);
      
    
    // Implement specific action logic here (e.g., download, print, or send statement)
  };

  return (
    <div className="bg-gray-50 min-h-screen ">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Customer Statements
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between">
          {/* Customer Select */}
          <div>
            <label
              htmlFor="customer"
              className="block text-sm font-medium text-gray-700"
            >
              Customer
            </label>
            <select
              id="customer"
              value={selectedCustomer}
              onChange={(e) => handleCustomerChange(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md text-gray-600"
            >
              <option value="">Select Customer</option>
              {allCustomers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {`${customer.firstName} ${customer.lastName}`}
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

      {selectedCustomerDetails && ( 
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
{Array.isArray(selectedCustomerDetails) && selectedCustomerDetails.length === 0 ? (
  <CustomerInfo />
) : (
  <CustomerStatementTemplate
    userData={allUserInfo}
    customerDetails={selectedCustomerDetails}
    statementData={allStatementData}
  />
)}


    </div>
  );
};

export default CustomerStatements;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PlusCircle, Edit, Trash } from "lucide-react";
import Swal from "sweetalert2";



const CustomerPage = ({setActiveTab}) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]); // For filtered results
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const navigate = useNavigate();


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
        setFilteredCustomers(data.customer); // Initialize filtered data
      } else {
        console.error("Failed to fetch customers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    const filtered = allCustomers.filter((customer) => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const companyName = customer.companyName?.toLowerCase() || "";
      const email = customer.email?.toLowerCase() || "";
      const phone = customer.phone?.toString() || "";
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm)
      );
    });
    setFilteredCustomers(filtered);
  }, [searchTerm, allCustomers]);


  const handleTabChange = (newTab) => {
    setActiveTab(newTab); // Update the activeTab in the Dashboard
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Customers</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            <Upload className="w-5 h-5 mr-2" /> Import CSV
          </button>
          <button
          
          onClick={()=>handleTabChange("add-customer")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <PlusCircle className="w-5 h-5 mr-2" /> Add Customer
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name, phone, email, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg pl-10 text-gray-600 shadow-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.32-3.68a6 6 0 118.48 0 1 1 0 001.42 1.42 8 8 0 10-11.32 0 1 1 0 001.42-1.42z"
              />
            </svg>
          </div>
        </div>
        <span className="text-gray-600 mt-4 md:mt-0">
          <strong>{filteredCustomers.length}</strong> customers found
        </span>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden border rounded-lg shadow-lg">
        <table className="w-full text-sm text-center">
          <thead className="bg-blue-50 text-gray-600 font-semibold">
            <tr>
              <th className="p-3 w-1/4">Name</th>
              <th className="p-3 w-1/4">Company</th>
              <th className="p-3 w-1/4">Email</th>
              <th className="p-3 w-1/4">Phone</th>
              <th className="p-3 w-12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, index) => (
                <tr
                  key={index}
                  className={`text-[16px] ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-all hover:cursor-pointer`}
                >
                  <td className="px-4 py-5 font-semibold">
                    {customer.firstName + " " + customer.lastName}
                  </td>
                  <td className="px-4 py-5">
                    {customer.companyName || "N/A"}
                  </td>
                  <td className="px-4 py-5">{customer.email || "N/A"}</td>
                  <td className="px-4 py-5">{customer.phone || "N/A"}</td>
                  <td className="px-4 py-5">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        onClick={() => alert("Edit customer")}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        onClick={() => alert("Delete customer")}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PlusCircle, Edit, Trash } from "lucide-react";
import Swal from "sweetalert2";
import CustomerPreview from "./CustomerPreview.jsx";

const CustomerPage = ({ setActiveTab }) => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/customers/fetchAllCustomer", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAllCustomers(data.customer);
        setFilteredCustomers(data.customer);
     
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Search filter
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

  const downloadCSV = () => {
    if (filteredCustomers.length === 0) {
      alert("No data available to export!");
      return;
    }
    const csvHeaders = ["Name", "Company", "Email", "Phone"];
    const csvRows = [
      csvHeaders.join(","),
      ...filteredCustomers.map((customer) =>
        [
          `${customer.firstName} ${customer.lastName}`,
          customer.companyName || "N/A",
          customer.email || "N/A",
          customer.phone || "N/A",
        ].join(",")
      ),
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CustomersInfo.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/dashboard/${newTab}`);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (customerId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This customer will be permanently deleted.",
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
        `http://localhost:3000/api/customers/deleteCustomer/${customerId}`,
        { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      if (response.ok) {
        Swal.fire("Deleted!", "Customer removed.", "success");
        fetchCustomers();
        setSelectedCustomer(null);
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {selectedCustomer ? (
        <div className="flex w-full">
          {/* LEFT Panel */}
          <div className="w-1/3 flex flex-col bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-800">Customers</h1>
              <div className="flex gap-2">
                <button
                  onClick={downloadCSV}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
                >
                  <Upload className="w-4 h-4 mr-1" /> Export
                </button>
                <button
                  onClick={() => handleTabChange("add-customer")}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                >
                  <PlusCircle className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, phone, email, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 p-2 border rounded-lg text-gray-700 bg-white"
            />

            {/* Table */}
            <table className="w-full text-left border-collapse border-y border-gray-400">
              <tbody>
                {[...filteredCustomers].reverse().map((customer) => (
                  <tr
                    key={customer._id}
                    className={`hover:bg-gray-50 cursor-pointer border-b ${
                      selectedCustomer?._id === customer._id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {customer.companyName || "N/A"} • {customer.email}
                      </div>
                      <div className="text-sm text-gray-500">{customer.phone || "N/A"}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* RIGHT Panel */}
          <div className="w-2/3 border-l bg-white relative">
            <CustomerPreview
              customerData={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
            <div className="flex gap-3">
              <button
                onClick={downloadCSV}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <Upload className="w-5 h-5 mr-2" /> Export CSV
              </button>
              <button
                onClick={() => handleTabChange("add-customer")}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Add Customer
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name, phone, email, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg text-gray-700 bg-white w-full md:w-1/2"
            />
          </div>

          {/* Table */}
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-blue-100 text-center">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredCustomers].reverse().map((customer) => (
                <tr
                  key={customer._id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`hover:bg-gray-100 cursor-pointer ${
                    selectedCustomer?._id === customer._id ? "bg-blue-50" : ""
                  } text-center`}
                >
                  <td className="px-4 py-2 font-semibold">
                    {customer.firstName} {customer.lastName}
                  </td>
                  <td className="px-4 py-2">{customer.companyName || "N/A"}</td>
                  <td className="px-4 py-2">{customer.email || "N/A"}</td>
                  <td className="px-4 py-2">{customer.phone || "N/A"}</td>
                  <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center space-x-2">
                      <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        onClick={() => handleDelete(customer._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;

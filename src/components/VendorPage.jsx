import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, PlusCircle, Edit, Trash } from "lucide-react";
import Swal from "sweetalert2";

const VendorPage = ({ setActiveTab }) => {
  const [allVendors, setAllVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]); // For filtered results
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
        setFilteredVendors(data.vendor); // Initialize filtered data
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

  useEffect(() => {
    fetchVendors();
  }, []);

  // Filter vendors based on search term
  useEffect(() => {
    const filtered = allVendors.filter((vendor) => {
      const fullName = `${vendor.firstName} ${vendor.lastName}`.toLowerCase();
      const companyName = vendor.companyName?.toLowerCase() || "";
      const email = vendor.email?.toLowerCase() || "";
      const phone = vendor.phone?.toString() || "";
      return (
        fullName.includes(searchTerm.toLowerCase()) ||
        companyName.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        phone.includes(searchTerm)
      );
    });
    setFilteredVendors(filtered);
  }, [searchTerm, allVendors]);

  const handleDelete = async (vendorId) => {
    const userConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this Vendor? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (!userConfirmed.isConfirmed) {
      return; // Exit if user cancels
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Token is missing. Please log in again.",
        });
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/vendor/deleteVendor/${vendorId}`,
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
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted successfully.",
          confirmButtonColor: "#3085d6",
        });
        
        fetchVendors(); // Refresh list
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text:
            data.message || "Failed to delete the product. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  const downloadCSV = () => {
    if (filteredVendors.length === 0) {
      alert("No data available to export!");
      return;
    }

    const csvHeaders = ["Name", "Company", "Email", "Phone"];
    const csvRows = [
      csvHeaders.join(","), // Add header row
      ...filteredVendors.map((vendor) =>
        [
          `${vendor.firstName} ${vendor.lastName}`,
          vendor.companyName || "N/A",
          vendor.email || "N/A",
          vendor.phone || "N/A",
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "VendorsInfo.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (newTab, vendorDetails, clickType) => {
    setActiveTab(newTab); // Update the activeTab in the Dashboard
    navigate(`/dashboard/${newTab}`, {
      state: { vendorDetails , clickType }, // Pass additional data to the route
    });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Vendors</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            onClick={downloadCSV}
          >
            <Upload className="w-5 h-5 mr-2" /> Export CSV
          </button>
          <button
            onClick={() =>  handleTabChange(
              "add-vendor",
              {}, // Example vendorDetails
              "create" // Example clickType
            ) }
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> Add Vendor
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-2.32-3.68a6 6 0 118.48 0 1 1 0 001.42 1.42 8 8 0 10-11.32 0 1 1 0 001.42-1.42z"
              />
            </svg>
          </div>
        </div>
        <span className="text-gray-600 mt-4 md:mt-0">
          <strong>{filteredVendors.length}</strong> vendors found
        </span>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden border rounded-lg shadow-sm">
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
            {isLoading ? (<>
              <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div></>) : (<>
    {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor, index) => (
                <tr
                  key={index}
                  className={`text-[16px] ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-all hover:cursor-pointer`}
                >
                  <td className="px-4 py-5 font-semibold">{vendor.firstName + " " + vendor.lastName}</td>
                  <td className="px-4 py-5">{vendor.companyName || "N/A"}</td>
                  <td className="px-4 py-5">{vendor.email || "N/A"}</td>
                  <td className="px-4 py-5">{vendor.phone || "N/A"}</td>
                  <td className="px-4 py-5">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        onClick={() => handleTabChange(
                          "add-vendor",
                          vendor, // Example vendorDetails
                          "update" // Example clickType
                        )}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        onClick={() =>handleDelete(vendor._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No vendors found.
                </td>
              </tr>
            )}
  </>)}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorPage;
